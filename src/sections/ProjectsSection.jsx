import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import TechMarquee  from "../components/TechMarquee";
import { projects } from "../data/projects";
import { motion } from "framer-motion";

const chunkProjects = (arr, size) => {
  return arr.reduce((chunks, _, i) => {
    if (i % size === 0) chunks.push(arr.slice(i, i + size));
    return chunks;
  }, []);
};

const AUTO_SLIDE_DELAY = 5000;

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    resetTimeout();
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const pauseAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resumeAutoSlide = () => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, AUTO_SLIDE_DELAY);
  };

  const [chunkSize, setChunkSize] = useState(3);
  const slides = useMemo(
    () => chunkProjects(projects, chunkSize),
    [chunkSize]
  );

  const timeoutRef = useRef(null);

  useEffect(() => {
    // Fonction pour définir chunkSize selon la largeur
    const handleResize = () => {
      if (window.innerWidth < 768) setChunkSize(1); // mobile < 768px
      else setChunkSize(3);
    };

    handleResize(); // initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, AUTO_SLIDE_DELAY);

    return () => resetTimeout();
  }, [activeIndex, slides.length]);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center relative overflow-hidden w-full py-24 px-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 z-20"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-[1500ms] z-30"></div>
        <div className="absolute top-10 left-10 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-200 z-40"></div>
        <div className="absolute bottom-16 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse delay-300 z-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500 z-60"></div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center text-3xl font-bold text-[#296297] mb-8 relative"
      >
        Projets
      </motion.h2>

      <div className="relative w-full max-w-6xl">
        {/* Slides */}
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

        {/* Buttons */}
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

        {/* Dots avec animation temps restant */}
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
