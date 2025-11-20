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
    description:
      "Developed a comprehensive e-commerce solution with real-time analytics, inventory management, and seamless payment integration. The platform increased online sales by 150% and improved customer engagement through personalized recommendations.",
    image: ecommerceImage,
    client: "RetailCo",
  },
  {
    title: "Corporate Website Redesign",
    description:
      "Created a modern, responsive corporate website with intuitive navigation and engaging user experience. The redesign resulted in 80% faster load times and a 60% increase in user engagement across all devices.",
    image: corporateImage,
    client: "TechCorp",
  },
  {
    title: "Cloud Infrastructure Migration",
    description:
      "Successfully migrated legacy systems to a scalable cloud infrastructure, ensuring 99.9% uptime and reducing operational costs by 40%. Implemented automated backup systems and disaster recovery protocols.",
    image: cloudImage,
    client: "FinanceHub",
  },
  {
    title: "Digital Marketing Campaign",
    description:
      "Executed a comprehensive digital marketing strategy combining SEO, social media, and content marketing. Achieved 200% increase in organic traffic and 3x ROI on marketing spend within 6 months.",
    image: marketingImage,
    client: "StartupXYZ",
  },
];

export const OurWorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // For repeated fade-appear animations
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            el.classList.add("animate-fade-in-up");
            el.classList.remove("opacity-0");
          } else {
            el.classList.remove("animate-fade-in-up");
            el.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.35 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) handleNext();
    if (touchStartX.current - touchEndX.current < -75) handlePrevious();
  };

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
      <div className="container mx-auto px-4 py-20 lg:pl-40 overflow-hidden">
        {/* Note: overflow-hidden on container helps prevent unexpected scrollbars */}

        {/* Header with fade-in-up (always repeating) */}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className="text-center mb-12 opacity-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Portfolio
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          >
            {works.map((work, index) => (
              // Move padding into the slide wrapper and apply box-border to include padding
              <div
                key={index}
                className="min-w-full snap-center px-4 md:px-12 box-border overflow-hidden"
              >
                <div
                  ref={(el) => (cardRefs.current[index + 1] = el)}
                  className="grid md:grid-cols-2 gap-6 md:gap-8 items-center opacity-0"
                >
                  {/* Content */}
                  <div className="space-y-4 md:space-y-6 px-0">
                    <div className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wider">
                      Client: {work.client}
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                      {work.title}
                    </h3>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {work.description}
                    </p>

                    <Button
                      size="lg"
                      className="hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
                    >
                      View Case Study
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="relative mt-6 md:mt-0">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full max-w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
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
