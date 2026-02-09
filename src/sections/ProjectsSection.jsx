import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import TechMarquee from "../components/TechMarquee";
import BackgroundDecorations from "../components/BackgroundDecorations";
import { projects } from "../data/projects";
import { useCarousel } from "../hooks/useCarousel";

const ProjectsSection = () => {
  const {
    activeIndex,
    slides,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoSlide,
    resumeAutoSlide,
  } = useCarousel(projects, 3);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center relative overflow-hidden w-full py-24 px-4"
    >
      <BackgroundDecorations />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center text-3xl font-bold text-[#296297] mb-8 relative"
      >
        Projets
      </motion.h2>

      <div className="relative w-full max-w-6xl">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((group, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex justify-center gap-6 w-full"
              >
                {group.map((project, j) => (
                  <ProjectCard
                    key={j}
                    {...project}
                    onHoverStart={pauseAutoSlide}
                    onHoverEnd={resumeAutoSlide}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          type="button"
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-[#296297] text-white hover:bg-[#1F4D73] transition-transform duration-400 hover:scale-110 p-3 rounded-full shadow-md cursor-pointer"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-[#296297] text-white hover:bg-[#1F4D73] transition-transform duration-400 hover:scale-110 p-3 rounded-full shadow-md cursor-pointer"
        >
          <ChevronRight />
        </button>

        <div className="mt-6 text-center">
          <div className="inline-flex space-x-3 rounded-full px-2 py-1 overflow-hidden bg-white shadow-md">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative w-4 h-4 rounded-full cursor-pointer ${
                  i === activeIndex ? "bg-[#296297]" : "bg-gray-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <TechMarquee />
    </section>
  );
};

export default ProjectsSection;
