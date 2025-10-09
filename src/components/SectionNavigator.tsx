import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "our-work", label: "Our Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block backdrop-blur-sm">
      <div className="flex flex-col gap-6 bg-background/30 p-3 rounded-full border border-border/30">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={`Go to ${section.label}`}
          >
            {/* Dot indicator */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-125 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
            />
            
            {/* Label tooltip */}
            <span
              className={`absolute left-8 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                activeSection === section.id
                  ? "opacity-100 translate-x-0 bg-primary/90 text-primary-foreground shadow-lg"
                  : "opacity-0 -translate-x-2 bg-background/80 text-foreground border border-border/50 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
