import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { OurWorkSection } from "@/components/OurWorkSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SectionNavigator } from "@/components/SectionNavigator";
import { MobileNavigation } from "@/components/MobileNavigation";
import { SectionDivider } from "@/components/SectionDivider";

import webDevImage from "@/assets/service-webdev.jpg";
import marketingImage from "@/assets/service-marketing.jpg";
import cloudImage from "@/assets/service-cloud.jpg";
import analyticsImage from "@/assets/service-analytics.jpg";

const Index = () => {
  const services = [
    {
      title: "Web Development",
      description: "Build powerful, responsive websites and web applications that drive results. Our expert developers use cutting-edge technologies to create seamless digital experiences.",
      image: webDevImage,
      features: [
        "Custom website design and development",
        "Responsive and mobile-first approach",
        "E-commerce solutions",
        "Progressive web applications",
      ],
    },
    {
      title: "Online Marketing",
      description: "Amplify your brand's reach with strategic digital marketing campaigns. We leverage SEO, social media, and content marketing to grow your online presence.",
      image: marketingImage,
      features: [
        "Search engine optimization (SEO)",
        "Social media marketing",
        "Content strategy and creation",
        "Pay-per-click advertising",
      ],
      reverse: true,
    },
    {
      title: "Cloud Solutions",
      description: "Scale your business with secure, reliable cloud infrastructure. We help you migrate, manage, and optimize your cloud environment for maximum efficiency.",
      image: cloudImage,
      features: [
        "Cloud migration and integration",
        "Infrastructure as a Service (IaaS)",
        "Cloud security and compliance",
        "24/7 monitoring and support",
      ],
    },
    {
      title: "Data Analytics",
      description: "Transform raw data into actionable insights. Our analytics solutions help you make informed decisions and stay ahead of the competition.",
      image: analyticsImage,
      features: [
        "Business intelligence dashboards",
        "Predictive analytics and AI",
        "Data visualization and reporting",
        "Custom analytics solutions",
      ],
      reverse: true,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <SectionNavigator />
      <MobileNavigation />
      
      {/* Main content with left padding for navigator on desktop */}
      <div className="lg:pl-40">
        <div id="hero">
          <HeroSection />
        </div>
        
        <SectionDivider />
        
        <div id="services">
          {services.map((service, index) => (
            <div key={index}>
              <ServiceSection {...service} />
              {index < services.length - 1 && <SectionDivider />}
            </div>
          ))}
        </div>
        
        <SectionDivider />
        
        <OurWorkSection />
        
        <SectionDivider />
        
        <AboutSection />
        
        <SectionDivider />
        
        <ContactSection />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
