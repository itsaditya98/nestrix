import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
<button
  onClick={scrollToTop}
  className={`fixed bottom-11 right-6 z-50 bg-primary text-white 
    w-12 h-12 flex items-center justify-center rounded-full shadow-lg
    transition-all duration-500 ease-in-out transform
    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"} 
    hover:bg-primary/80 hover:scale-110`}
>
  <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
</button>

  );
}

export default BackToTop;
