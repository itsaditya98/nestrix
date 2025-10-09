import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceSectionProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  reverse?: boolean;
}

export const ServiceSection = ({
  title,
  description,
  image,
  features,
  reverse = false,
}: ServiceSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(`service-${title.toLowerCase().replace(/\s/g, "-")}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      id={`service-${title.toLowerCase().replace(/\s/g, "-")}`}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center md:opacity-50 opacity-30 md:bg-fixed"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`absolute inset-0 ${reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-background/70 via-background/80 to-background/85`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-0 max-w-7xl">
        <div className={`grid md:grid-cols-2 gap-6 md:gap-16 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
          <div 
            className={`${reverse ? 'md:col-start-2' : ''} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              {description}
            </p>
            <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 text-foreground text-sm md:text-base ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className={isVisible ? 'animate-scale-in' : 'opacity-0'} style={{ animationDelay: '0.8s' }}>
              <Button
                size="lg"
                className="hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className={`${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}></div>
        </div>
      </div>
    </section>
  );
};
