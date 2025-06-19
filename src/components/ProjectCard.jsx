import { useState } from "react";

const ProjectCard = ({ title, image, description, github }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-[300px] h-[400px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className="relative w-full h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-xl">
        {/* Effet 3D */}
        <div
          className={`relative w-full h-full duration-700 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Recto */}
          <div className="absolute inset-0 bg-white rounded-xl overflow-hidden backface-hidden">
            <img src={image} alt={title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Cliquez pour en savoir plus
              </p>
            </div>
          </div>

          {/* Verso */}
          <div className="absolute inset-0 bg-white rounded-xl overflow-hidden p-4 rotate-y-180 backface-hidden">
            <h3 className="text-lg font-bold text-blue-600">{title}</h3>
            <p className="text-gray-700 text-sm mt-2 mb-4">{description}</p>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline"
            >
              Voir sur GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
