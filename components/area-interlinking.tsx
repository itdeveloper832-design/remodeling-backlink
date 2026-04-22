import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bathroomServices } from "@/lib/bathroom-services";

export default function AreaInterlinking() {
  // Show 6 main services for interlinking
  const mainServices = bathroomServices.slice(0, 6);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              Our Core Services in Chandler
            </h2>
            <p className="text-muted-foreground text-lg">
              Expert bathroom remodeling solutions for every home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/services" 
              className="text-primary hover:underline font-medium"
            >
              View All Bathroom Services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
