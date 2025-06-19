import { useKeenSlider } from "keen-slider/react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
  });

  return (
    <motion.section
      className="my-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <section id="projects" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Mes Projets
          </h2>
          <div ref={sliderRef} className="keen-slider">
            {projects.map((project) => (
              <div
                key={project.id}
                className="keen-slider__slide flex justify-center"
              >
                <div className="p-2">
                  {" "}
                  {/* padding pour éviter le rognage du scale */}
                  <ProjectCard {...project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default ProjectsSection;
