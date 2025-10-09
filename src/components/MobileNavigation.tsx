import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "our-work", label: "Our Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
