import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-bg.png";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [bgVisible, setBgVisible] = useState(false);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      ([entry]) => setBgVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative h-screen flex items-center justify-center
        overflow-hidden bg-fixed bg-cover bg-center
      "
      style={{ backgroundImage: `url(${heroImage})` }}
    >

      {/* Content  */}
      <div className="relative z-10 text-center px-4 lg:pl-45 animate-fade-in-up">
  
        <p className="text-xl md:text-4xl mb-8 text-white max-w-3xl mx-auto">
          Transforming businesses through innovative technology solutions
        </p>*

        <Button
          onClick={scrollToServices}
          size="lg"
          className="group hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
        >
          Explore Our Services
          <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
};
