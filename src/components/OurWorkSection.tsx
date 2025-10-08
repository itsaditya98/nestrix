import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import ecommerceImage from "@/assets/work-ecommerce.jpg";
import corporateImage from "@/assets/work-corporate.jpg";
import cloudImage from "@/assets/work-cloud.jpg";
import marketingImage from "@/assets/work-marketing.jpg";

interface Work {
  title: string;
  description: string;
  image: string;
  client: string;
}

const works: Work[] = [
  {
    title: "E-Commerce Platform Transformation",
    description: "Developed a comprehensive e-commerce solution with real-time analytics, inventory management, and seamless payment integration. The platform increased online sales by 150% and improved customer engagement through personalized recommendations.",
    image: ecommerceImage,
    client: "RetailCo",
  },
  {
    title: "Corporate Website Redesign",
    description: "Created a modern, responsive corporate website with intuitive navigation and engaging user experience. The redesign resulted in 80% faster load times and a 60% increase in user engagement across all devices.",
    image: corporateImage,
    client: "TechCorp",
  },
  {
    title: "Cloud Infrastructure Migration",
    description: "Successfully migrated legacy systems to a scalable cloud infrastructure, ensuring 99.9% uptime and reducing operational costs by 40%. Implemented automated backup systems and disaster recovery protocols.",
    image: cloudImage,
    client: "FinanceHub",
  },
  {
    title: "Digital Marketing Campaign",
    description: "Executed a comprehensive digital marketing strategy combining SEO, social media, and content marketing. Achieved 200% increase in organic traffic and 3x ROI on marketing spend within 6 months.",
    image: marketingImage,
    client: "StartupXYZ",
  },
];

export const OurWorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("our-work");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth / works.length;
      container.scrollTo({
        left: scrollWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : works.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < works.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section
      id="our-work"
      className="min-h-screen flex items-center justify-center relative bg-background"
    >
      <div className="container mx-auto px-4 py-20">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our successful partnerships and the innovative solutions we've delivered
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/95 backdrop-blur-sm"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/95 backdrop-blur-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          >
            {works.map((work, index) => (
              <div
                key={index}
                className="min-w-full snap-center"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center px-12">
                  {/* Left: Content */}
                  <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="text-sm text-primary font-semibold uppercase tracking-wider">
                      Client: {work.client}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      {work.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {work.description}
                    </p>
                    <Button
                      size="lg"
                      className="hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
                    >
                      View Case Study
                    </Button>
                  </div>

                  {/* Right: Image */}
                  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} relative`}>
                    <div className="relative overflow-hidden rounded-lg shadow-2xl">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {works.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to work ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
