import { Github, Download } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  image,
  description,
  github,
  download,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="relative z-10 bg-white rounded-xl shadow-md overflow-hidden mt-5 mb-5 
  w-[90vw] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px] flex-shrink-0
  transform duration-300 hover:scale-105"
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          src={`${import.meta.env.BASE_URL}${image.replace(/^\//, "")}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-[#296297]">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        {/* Bouton conditionnel */}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 p-3 bg-[#296297] rounded-full shadow-lg hover:shadow-xl transition-transform duration-400 hover:scale-120 text-white hover:text-white hover:bg-[#1F4D73]"
          >
            <Github size={24} />
          </a>
        )}

        {download && (
          <a
            href={`${import.meta.env.BASE_URL}${download.replace(/^\//, "")}`}
            download
            className="mt-4 p-3 bg-[#296297] rounded-full shadow-lg hover:shadow-xl transition-transform duration-400 hover:scale-120 text-white hover:text-white hover:bg-[#1F4D73]"
          >
            <Download size={24} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
