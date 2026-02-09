import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import SocialButton from "../components/SocialButton";
import BackgroundDecorations from "../components/BackgroundDecorations";
import Button from "../components/Button";
import { animations, transitions } from "../constants/theme";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center relative overflow-hidden w-full"
    >
      <BackgroundDecorations />

      <div className="px-4 text-center relative z-10 mt-16 sm:mt-0">
        <motion.div
          {...animations.fadeInUp}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            {...animations.scaleIn}
            transition={{ ...transitions.default, delay: 0.2 }}
            className="w-32 h-32 mx-auto mb-8 relative rounded-full border-4 border-[#296297] overflow-hidden hover:scale-110 transition-transform duration-400"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/pp_pro.jpg`}
              alt="Thomas Cooper"
              className="w-full h-full object-cover object-[5px_-20px] scale-110 rounded-full"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600 mb-6"
          >
            Développeur
            <span className="block text-[#296297]">Full Stack Freelance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Diplômé en développement Web, Big Data & Intelligence Artificielle
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-4 sm:mb-12"
          >
            <Button href={`${import.meta.env.BASE_URL}cv-thomas-cooper.pdf`} download>
              <Download /> Mon CV
            </Button>

            <Button href={`${import.meta.env.BASE_URL}d2c-thomas-cooper.pdf`} download>
              <Download /> Mon Détail de compétence
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-10 mb-24"
          >
            <SocialButton type="github" href="https://github.com/thoms-17" />
            <SocialButton
              type="linkedin"
              href="https://www.linkedin.com/in/thomas-cooper17"
            />
            <SocialButton type="mail" href="mailto:thomcooper04@gmail.com" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gray-500 font-medium">Scroll</span>
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
