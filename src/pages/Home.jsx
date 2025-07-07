import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
