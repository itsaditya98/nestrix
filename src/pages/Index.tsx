import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { OurWorkSection } from "@/components/OurWorkSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SectionNavigator } from "@/components/SectionNavigator";
import { MobileNavigation } from "@/components/MobileNavigation";
import { SectionDivider } from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <SectionNavigator />
      <MobileNavigation />

      <div>
        <div id="hero">
          <HeroSection />
        </div>

        <SectionDivider />

        <div id="services">
          <ServiceSection />
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
