import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ServiceHero from "@/components/service-hero";
import ServiceCTA from "@/components/service-cta";
import ServiceFAQ from "@/components/service-faq";
import ServiceProcess from "@/components/service-process";
import IssuesSolved from "@/components/issues-solved";
import Benefits from "@/components/benefits";
import Tips from "@/components/tips";
import Testimonials from "@/components/home/testimonials";
import ContactSection from "@/components/home/contact-section";
import { siteConfig } from "@/lib/site-config";
import { ServiceSchema, FAQSchema } from "@/components/seo/json-ld";
import { serviceContent } from "@/lib/service-content-data";
import SubServices from "@/components/sub-services";
import { bathroomServices } from "@/lib/bathroom-services";

export const metadata: Metadata = {
  title: "Shower Remodeling Services in Chandler AZ | Local Contractors",
  description: "Premium shower remodeling services and contractors in Chandler AZ. Walk-in showers, custom tiling, and glass enclosures built to last. Call for a free consultation!",
  keywords: ["shower remodeling services Chandler", "custom tile contractors AZ", "frameless glass enclosures company", "shower upgrades", "bathroom renovation Chandler contractors", "walk-in showers"],
  openGraph: {
    title: "Shower Upgrades in Chandler AZ | Premium Services",
    description: "Expert shower upgrades in Chandler AZ. Affordable luxury, free quotes!",
    url: `${siteConfig.url}/shower-remodeling`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/shower-remodeling-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom Showers - Chandler Bathroom Upgrades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shower Upgrades in Chandler AZ | Premium Services",
    description: "Expert shower upgrades in Chandler AZ. Affordable, professional!",
    images: [`${siteConfig.url}/images/shower-remodeling-hero.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/shower-remodeling`,
  },
};

const faqs = serviceContent["shower-remodeling"].faqs;

const otherServices = bathroomServices
  .filter(s => s.href !== "/shower-remodeling")
  .slice(0, 3);

export default function ShowerRemodelingPage() {
  const showerData = serviceContent["shower-remodeling"];
  
  return (
    <>
      <ServiceSchema
        serviceName="Shower Remodeling in Chandler, Arizona"
        serviceDescription="Professional shower upgrades in Chandler, Arizona. Custom tile, frameless glass enclosures, waterproof installations, and premium fixtures."
        serviceUrl={`${siteConfig.url}/shower-remodeling`}
      />
      <FAQSchema faqs={faqs} />
      <Header />
      <main>
        <ServiceHero
          title="Shower Remodeling Services in Chandler AZ"
          subtitle="Premium Custom Shower Installations & Upgrades"
          description="Transform your daily routine with a stunning new shower. As your trusted local contractors, we provide elegant frameless glass designs, custom tile work, and professional shower remodeling services tailored to your home."
          image="/images/optimized/photo-1552321554-5fefe8c9ef14.webp"
          breadcrumbs={[
            { name: "Home", url: siteConfig.url },
            { name: "Shower Remodeling", url: `${siteConfig.url}/shower-remodeling` },
          ]}
        />

        <ServiceProcess
          title="Our Installation Process"
          subtitle="How We Work"
          description="A streamlined, mess-managed approach built for Chandler homeowners who want a faster, cleaner upgrade."
          steps={[
            {
              number: "01",
              icon: "PhoneCall",
              title: "Consultation & Measurements",
              description: "We review goals, measure your existing footprint, and plan waterproofing details.",
            },
            {
              number: "02",
              icon: "Ruler",
              title: "Design & Selections",
              description: "Tile, glass, fixtures, and drainage layout tailored to your style and daily routine.",
            },
            {
              number: "03",
              icon: "Hammer",
              title: "Demo & Prep",
              description: "Clean demolition, substrate repair, and moisture barrier installation for durability.",
            },
            {
              number: "04",
              icon: "ShowerHead",
              title: "Tile & Fixture Install",
              description: "Precision tile setting, niche detailing, and valve/fixture installation for a spa feel.",
            },
            {
              number: "05",
              icon: "ShieldCheck",
              title: "Inspection & Walkthrough",
              description: "Sealing, testing, and a final walkthrough to confirm drainage, fit, and finish.",
            },
          ]}
        />

        <IssuesSolved
          title="Issues We Solve with Custom Showers"
          subtitle="Common Problems Fixed"
          description="We address the most common bathing area challenges Chandler homeowners face."
          issues={showerData.issues}
        />

        <Benefits
          title="Benefits of Upgrading Your Shower"
          subtitle="Why It Matters"
          description="Discover how professional updates transform your daily routine and add value to your home."
          benefits={showerData.benefits}
        />

        <Tips
          title="Expert Maintenance Tips"
          subtitle="Professional Insights"
          description="Smart strategies to make the most of your newly upgraded bathing space."
          tips={showerData.tips}
        />

        <ServiceCTA 
          title="Ready for a Chandler shower remodel that stays watertight?" 
          description="Get a custom design plan, tile selections, and a clean installation schedule tailored to your home." 
        />

        <SubServices 
          title="Explore Other Bathroom Services"
          subtitle="More Solutions"
          description="We offer a full range of renovation services beyond just showers."
          services={otherServices.map(s => s.name)}
        />

        <ServiceFAQ faqs={faqs} />

        <Testimonials />

        <ContactSection />

        <ServiceCTA 
          title="Need fast shower upgrades in Chandler, AZ?" 
          description="Call now for a same-week consultation and clear pricing on your new enclosure." 
        />
      </main>
      <Footer />
    </>
  );
}
