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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div
        className="
          flex flex-col gap-3.5 
          bg-background/95 
          backdrop-blur-xl 
          p-8 
          rounded-xl 
          shadow-[0_4px_20px_rgba(0,0,0,0.12)]
          border border-border/40
          w-22        "
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="
                group flex items-center gap-2 py-1.5 px-2 rounded-lg 
                transition-all duration-300 w-full
                hover:bg-muted/40
              "
            >
              {/* Dot indicator */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary scale-125 shadow-[0_0_10px_hsl(var(--primary)/0.7)]"
                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                }`}
              />

              {/* Label */}
              <span
                className={`
                  text-xs font-medium tracking-wide transition-all duration-300
                  ${isActive ? "text-primary" : "text-muted-foreground/80 group-hover:text-foreground"}
                `}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
