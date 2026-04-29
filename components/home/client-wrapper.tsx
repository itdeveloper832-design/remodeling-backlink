"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/home/testimonials"), { 
  ssr: false,
  loading: () => <div className="h-80 bg-muted animate-pulse" />
});

const GalleryPreview = dynamic(() => import("@/components/home/gallery-preview"), { 
  ssr: false,
  loading: () => <div className="h-80 bg-muted animate-pulse" />
});

const ContactSection = dynamic(() => import("@/components/home/contact-section"), { 
  ssr: false,
  loading: () => <div className="h-80 bg-muted animate-pulse" />
});

export function ClientWrapper() {
  return (
    <>
      <Testimonials />
      <GalleryPreview />
      <ContactSection />
    </>
  );
}
