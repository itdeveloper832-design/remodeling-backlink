import { Metadata } from 'next'
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ServiceHero from "@/components/service-hero";
import SubServices from "@/components/sub-services";
import IssuesSolved from "@/components/issues-solved";
import Benefits from "@/components/benefits";
import Tips from "@/components/tips";
import ProcessSection from "@/components/home/process-section";
import Testimonials from "@/components/home/testimonials";
import ServiceAreas from "@/components/home/service-areas";
import ServiceCTA from "@/components/service-cta";
import { ServiceSchema, FAQSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { serviceContent } from "@/lib/service-content-data";

export const metadata: Metadata = {
  title: 'Bathroom Remodeling Services Chandler AZ | Best Contractors',
  description: 'Top-rated bathroom remodeling in Chandler AZ. From master bath renovations to custom showers. Get a free design consultation and estimate today!',
  keywords: ['bathroom remodeling Chandler AZ', 'custom bath renovations', 'master bath upgrades', 'Chandler remodeling contractors', 'bathroom design AZ', 'full bath renovations'],
  openGraph: {
    title: 'Bathroom Remodeling Services in Chandler AZ | Expert Contractors',
    description: 'Transform your space with the best bathroom remodeling team in Chandler. Affordable, custom renovations!',
    url: `${siteConfig.url}/bathroom-remodeling`,
    images: [
      {
        url: `${siteConfig.url}/images/bathroom-remodeling-chandler.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bathroom Remodeling Chandler Arizona - ARZ Home Remodeling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bathroom Remodeling Services Chandler AZ',
    description: 'Expert bathroom renovations in Chandler AZ. Affordable, professional!',
    images: [`${siteConfig.url}/images/bathroom-remodeling-chandler.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/bathroom-remodeling`,
  },
}

const serviceFaqs = serviceContent["bathroom-remodeling"].faqs;

export default function BathroomRemodelingPage() {
  const bathRemodelData = serviceContent["bathroom-remodeling"];
  
  return (
    <>
      <ServiceSchema
        serviceName="Bathroom Remodeling Services in Chandler, Arizona"
        serviceDescription="Comprehensive renovation services including custom showers, bathtub installation, vanity upgrades, tile work, flooring, and complete bathroom makeovers. Serving Chandler, Arizona and surrounding areas."
        serviceUrl={`${siteConfig.url}/bathroom-remodeling`}
      />
      <FAQSchema faqs={serviceFaqs} />
      <Header />
      <main>
        <ServiceHero
          title="Bathroom Remodeling Services in Chandler AZ"
          description="Looking to upgrade your space? We provide comprehensive bathroom remodeling services tailored to your style and budget. Connect with our local Chandler contractors for a free design consultation and estimate today!"
        />
        <SubServices />
        <IssuesSolved
          title="Common Bathroom Issues We Solve"
          subtitle="Solutions for Your Space"
          description="From outdated layouts to water damage, we address the most frequent challenges Chandler homeowners face with their washrooms."
          issues={bathRemodelData.issues}
        />
        <Benefits
          title="Benefits of a Full Renovation"
          subtitle="Why Upgrade Your Space"
          description="Discover how a complete bathroom transformation can dramatically improve your home's value and your daily routine."
          benefits={bathRemodelData.benefits}
        />
        <Tips
          title="Expert Renovation Tips"
          subtitle="Professional Insights"
          description="Smart strategies to make the most of your upcoming home improvement project."
          tips={bathRemodelData.tips}
        />
        <ProcessSection />
        <Testimonials />
        <ServiceAreas />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  );
}
