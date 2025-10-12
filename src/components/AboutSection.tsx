import { useEffect, useState } from "react";
import { Target, Users, Lightbulb, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Empowering businesses with cutting-edge technology solutions",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals dedicated to your success",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Staying ahead with the latest tech trends",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Delivering quality in every project",
  },
];

export const AboutSection = () => {
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

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-card">
      <div className="container mx-auto px-4 lg:pl-40">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-primary">Nestrix</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a technology-driven company committed to delivering exceptional digital solutions. 
            With years of experience and a passion for innovation, we help businesses thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg bg-background border border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <value.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
