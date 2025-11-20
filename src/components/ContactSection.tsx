import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const toggleTimer = useRef<number | null>(null);
  const lastVisible = useRef<boolean | null>(null); // remember last state to avoid redundant updates
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    query: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Make sure section starts hidden
    section.classList.add("opacity-0", "translate-y-6");

    // Debounced toggle helper
    const applyVisibility = (visible: boolean) => {
      // don't change if same
      if (lastVisible.current === visible) return;
      lastVisible.current = visible;

      // clear pending
      if (toggleTimer.current) {
        window.clearTimeout(toggleTimer.current);
        toggleTimer.current = null;
      }

      // small debounce — avoid flicker on tiny scrolls
      toggleTimer.current = window.setTimeout(() => {
        if (visible) {
          section.classList.add("animate-fade-in-up", "opacity-100", "translate-y-0");
          section.classList.remove("opacity-0", "translate-y-6");
        } else {
          section.classList.remove("animate-fade-in-up", "opacity-100", "translate-y-0");
          section.classList.add("opacity-0", "translate-y-6");
        }
        toggleTimer.current = null;
      }, 120); // 120ms debounce — adjust if needed
    };

    // Use rootMargin so "enter" is a bit earlier and "exit" a bit later, preventing on-edge flicker
    const observer = new IntersectionObserver(
      ([entry]) => {
        // require reasonable intersection ratio too to avoid tiny tap toggles
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        applyVisibility(visible);
      },
      {
        threshold: [0, 0.2, 0.35, 0.5],
        rootMargin: "0px 0px -18% 0px", // treat the section as still "in view" while near bottom
      }
    );

    observer.observe(section);

    return () => {
      if (toggleTimer.current) window.clearTimeout(toggleTimer.current);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.mobile.trim() || !formData.query.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", mobile: "", query: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 bg-background opacity-0 translate-y-6 transition-all duration-[900ms] ease-out"
    >
      <div className="container mx-auto px-4 lg:pl-40">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help your business grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">contact@nestrix.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Office</h3>
                <p className="text-muted-foreground">123 Tech Street, Innovation City</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Input
                  placeholder="Mobile Number"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Your Query"
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className="bg-card border-border min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
