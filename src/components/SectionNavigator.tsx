import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { 
    id: "services", 
    label: "Services",
    subsections: [
      { id: "service-web-development", label: "Web Development" },
      { id: "service-online-marketing", label: "Online Marketing" },
      { id: "service-cloud-solutions", label: "Cloud Solutions" },
      { id: "service-data-analytics", label: "Data Analytics" },
    ]
  },
  { id: "our-work", label: "Our Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedSections, setExpandedSections] = useState<string[]>(["services"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Check all sections including subsections
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
        
        // Check subsections
        if ('subsections' in section && section.subsections) {
          for (const subsection of section.subsections) {
            const subElement = document.getElementById(subsection.id);
            if (subElement) {
              const { offsetTop, offsetHeight } = subElement;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(subsection.id);
                break;
              }
            }
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

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-2 py-4">
        {sections.map((section) => {
          const hasSubsections = 'subsections' in section && section.subsections;
          const isExpanded = expandedSections.includes(section.id);
          const isActive = activeSection === section.id || 
            (hasSubsections && section.subsections?.some(sub => sub.id === activeSection));

          return (
            <div key={section.id} className="relative">
              <button
                onClick={() => {
                  if (hasSubsections) {
                    toggleSection(section.id);
                  } else {
                    scrollToSection(section.id);
                  }
                }}
                className="group relative flex items-center gap-2"
                aria-label={`Go to ${section.label}`}
              >
                {/* Dot indicator */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary scale-125 shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
                
                {/* Label */}
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary opacity-100"
                      : "text-muted-foreground opacity-70 group-hover:opacity-100"
                  }`}
                >
                  {section.label}
                </span>

                {/* Expand icon for sections with subsections */}
                {hasSubsections && (
                  <div className="ml-1">
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                )}
              </button>

              {/* Subsections */}
              {hasSubsections && isExpanded && (
                <div className="ml-5 mt-2 space-y-2 pl-3 border-l border-border/30">
                  {section.subsections?.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => scrollToSection(subsection.id)}
                      className="group relative flex items-center gap-2"
                      aria-label={`Go to ${subsection.label}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeSection === subsection.id
                            ? "bg-primary scale-125 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                            : "bg-muted-foreground/20 hover:bg-muted-foreground/40"
                        }`}
                      />
                      <span
                        className={`text-xs transition-all duration-300 ${
                          activeSection === subsection.id
                            ? "text-primary opacity-100 font-medium"
                            : "text-muted-foreground opacity-60 group-hover:opacity-90"
                        }`}
                      >
                        {subsection.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
