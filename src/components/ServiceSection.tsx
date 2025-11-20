import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Import images properly (same as OurWorkSection)
import webdevImage from "@/assets/service-webdev.jpg";
import marketingImage from "@/assets/service-marketing.jpg";
import cloudImage from "@/assets/service-cloud.jpg";
import analyticsImage from "@/assets/service-analytics.jpg";

export const ServiceSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const flipTimer = useRef<NodeJS.Timeout | null>(null);

  const services = [
    {
      title: "Website Development",
      short: "Modern, responsive, and business-ready web development.",
      image: webdevImage, // ✅ fixed
      features: [
        "Pixel-perfect UI",
        "SEO-optimized pages",
        "Fast load performance",
        "Admin dashboard support",
        "API + database integration",
      ],
    },
    {
      title: "Digital Marketing",
      short: "End-to-end online marketing strategies for growth.",
      image: marketingImage, // ✅ fixed
      features: [
        "Google Ads campaign setup",
        "Brand identity + messaging",
        "Social media management",
        "Content creation",
        "Analytics tracking",
      ],
    },
    {
      title: "Cloud Solutions",
      short: "Reliable cloud hosting, scaling, and deployment.",
      image: cloudImage, // ✅ fixed
      features: [
        "AWS / Azure deployment",
        "Auto-scaling servers",
        "Monitoring setup",
        "Secure architecture",
        "Cost optimization",
      ],
    },
    {
      title: "AI & Automation",
      short: "Smart automation and AI solutions for business tasks.",
      image: analyticsImage, // ✅ fixed
      features: [
        "AI chatbots",
        "Workflow automation",
        "Data processing pipelines",
        "Customer support bots",
        "Business intelligence dashboards",
      ],
    },
  ];

  // animations (unchanged)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLDivElement;

          if (entry.isIntersecting) {
            card.classList.add("animate-fade-in-up");
            card.classList.remove("opacity-0");
          } else {
            card.classList.remove("animate-fade-in-up");
            card.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleFlip = (index: number) => {
    setFlippedIndex(index);

    if (flipTimer.current) clearTimeout(flipTimer.current);
    flipTimer.current = setTimeout(() => setFlippedIndex(null), 10000);
  };

  return (
    <section id="services" className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:pl-52">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            High-impact digital solutions crafted for your business success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative h-[380px] w-full opacity-0 transition-all duration-700"
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.7s ease",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 bg-card border border-border rounded-xl shadow-md p-0"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-44 object-cover rounded-t-xl"
                    />

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {service.short}
                      </p>

                      <Button
                        variant="ghost"
                        className="!bg-transparent hover:bg-transparent hover:text-primary hover:opacity-80"
                        onClick={() => handleFlip(index)}
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 bg-card border border-border rounded-xl shadow-md p-6 flex flex-col justify-between"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        {service.title}
                      </h3>

                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    >
                      Contact Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
