import { motion } from "framer-motion";
import { timelineItems } from "../data/experience";
import { Code2, GraduationCap } from "lucide-react";

const iconMap = {
  code: Code2,
  graduation: GraduationCap,
};

const AboutSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-24 w-full"
    >
      <div className="max-w-3xl w-full">
        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-[#296297] mb-8"
        >
          Expériences
        </motion.h2>

        {/* Paragraphe introductif */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-700 leading-relaxed text-justify mb-12"
        >
          Tout au long de mon parcours, j'ai acquis de solides expériences tant
          en développement front-end que back-end, lors de mon alternance ainsi
          que mes projets personnels.
          <br />
          J'ai également une bonne compréhension des enjeux éthiques, sociaux et
          technologiques liés à l'Intelligence artificielle. L'approfondissement
          de l'impact de l'utilisation de l'intelligence artificielle à travers
          mon mémoire de fin d'études m'a permis de mieux comprendre ses enjeux
          dans le milieu médical.
        </motion.p>

        {/* Timeline */}
        <div className="relative border-l-4 border-[#296297] pl-6 space-y-12">
          {timelineItems.map((item, index) => {
            const Icon = iconMap[item.iconType];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Point de la timeline */}
                <div className="absolute -left-9 top-1 w-5 h-5 bg-[#296297] rounded-full border-4 border-white"></div>

                {/* Contenu */}
                <h3 className="text-lg font-semibold text-[#296297] flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5 text-[#296297]" />}
                  <span>
                    {item.year} – {item.title}
                  </span>
                </h3>

                <p className="text-gray-600 text-justify">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
