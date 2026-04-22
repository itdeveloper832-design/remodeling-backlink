const fs = require('fs');
const path = require('path');

const metadataMap = {
  'page.tsx': {
    title: 'Best Bathroom Remodeling Chandler AZ | Free Quote',
    description: 'Top-rated bathroom remodeling Chandler AZ. Licensed experts delivering custom showers, tubs & full renovations. Get a free estimate today!',
  },
  'about/page.tsx': {
    title: 'Trusted Bathroom Remodelers Chandler AZ | ARZ',
    description: 'Local, licensed bathroom remodelers in Chandler AZ. Over 15 years building luxury baths with guaranteed satisfaction. Read our story!',
  },
  'services/page.tsx': {
    title: 'Custom Bathroom Remodeling Services in Chandler',
    description: 'Professional bathroom remodeling services. From tub conversions to full master bath builds in Chandler, AZ. Schedule your free quote!',
  },
  'small-bathroom-remodeling/page.tsx': {
    title: 'Small Bathroom Remodel Chandler AZ | Maximize Space',
    description: 'Expert small bathroom remodel Chandler AZ. We maximize space & aesthetic with modern vanity and tile upgrades. Get your free estimate!',
  },
  'shower-remodeling/page.tsx': {
    title: 'Custom Shower Remodeling Chandler AZ | Fast Install',
    description: 'Premium shower remodeling Chandler AZ. Walk-in showers, custom tiling, and glass enclosures built to last. Call for a free consultation!',
  },
  'bathtub-remodeling/page.tsx': {
    title: 'Bathtub Remodeling Chandler AZ | Soaking Tubs',
    description: 'Professional bathtub remodeling Chandler AZ. Upgrade to a luxury soaking tub or freestanding bath. Browse our portfolio and get a quote!',
  },
  'tub-to-shower-conversion/page.tsx': {
    title: 'Tub to Shower Conversion Chandler AZ | Safe & Fast',
    description: 'Expert tub to shower conversion Chandler AZ. Improve safety and style with a modern walk-in shower. Request your free estimate today!',
  },
  'walk-in-showers/page.tsx': {
    title: 'Custom Walk-In Showers Chandler AZ | Installations',
    description: 'Safe & stylish walk-in showers Chandler AZ. Handicap accessible options available. Get a seamless bathroom installation today!',
  },
  'bathroom-tile-installation/page.tsx': {
    title: 'Bathroom Tile Installation Chandler AZ | Floor & Wall',
    description: 'Premium bathroom tile installation Chandler AZ. Custom ceramic, porcelain, & marble flooring and shower walls. Get a free quote!',
  },
  'bathroom-vanity-installation/page.tsx': {
    title: 'Bathroom Vanity Installation Chandler AZ | Custom',
    description: 'Custom bathroom vanity installation Chandler AZ. Single & double sink setups with luxury countertops. Transform your space today!',
  },
  'bathroom-accessibility-remodeling/page.tsx': {
    title: 'Handicap Accessible Bathroom Chandler AZ | Safety',
    description: 'Safe, ADA-compliant handicap accessible bathroom Chandler AZ. Roll-in showers and grab bar installations. Call us today!',
  },
  'financing/page.tsx': {
    title: 'Bathroom Remodel Financing Chandler AZ | Options',
    description: 'Affordable bathroom remodel financing. Get the custom bathroom you want today with low monthly payments in Chandler, AZ.',
  },
  'gallery/page.tsx': {
    title: 'Bathroom Remodel Portfolio Chandler AZ | Past Work',
    description: 'View our stunning bathroom remodel portfolio in Chandler AZ. See recent master bath and shower transformations. Get inspired!',
  },
  'contact/page.tsx': {
    title: 'Get a Free Bathroom Remodel Quote Chandler AZ',
    description: 'Request your free bathroom remodel quote Chandler AZ. Our licensed contractors are ready to discuss your renovation. Call now!',
  }
};

const appDir = path.join(__dirname, 'app');

function updateMetadata(filePath, title, description) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace title (handling multiline templates safely)
  content = content.replace(/title:\s*["'].*?["']/g, 'title: "' + title + '"');
  
  // Replace description
  content = content.replace(/description:\s*["'].*?["']/g, 'description: "' + description + '"');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(\`Updated metadata in \${filePath}\`);
}

Object.entries(metadataMap).forEach(([relativePath, meta]) => {
  const fullPath = path.join(appDir, relativePath);
  if (fs.existsSync(fullPath)) {
    updateMetadata(fullPath, meta.title, meta.description);
  } else {
    console.warn(\`File not found: \${fullPath}\`);
  }
});
