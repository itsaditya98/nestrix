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
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={`absolute inset-0 ${reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-background via-background/95 to-background/80`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
          <div className={`${reverse ? 'md:col-start-2' : ''} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {description}
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
          <div className={`${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}></div>
        </div>
      </div>
    </section>
  );
};
