import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=1200&auto=format&fit=crop&q=60"
];

const dir = path.join(process.cwd(), 'public', 'images', 'optimized');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    let finalUrl = url;
    if (!finalUrl.includes('fm=webp')) {
      finalUrl += '&fm=webp';
    }
    if (!finalUrl.includes('q=')) {
      finalUrl += '&q=60';
    }

    const request = https.get(finalUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${finalUrl}' (${response.statusCode})`));
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });

    request.on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting image optimization download...');
  for (const url of images) {
    const match = url.match(/photo-([a-zA-Z0-9-]+)/);
    if (match) {
      const id = match[1];
      const dest = path.join(dir, `photo-${id}.webp`);
      console.log(`Downloading optimized ${id}...`);
      try {
        await download(url, dest);
        const stats = fs.statSync(dest);
        console.log(`Saved to ${dest} (${(stats.size / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`Error downloading ${id}:`, err);
      }
    }
  }
  console.log('All images optimized and downloaded.');
}

run();

