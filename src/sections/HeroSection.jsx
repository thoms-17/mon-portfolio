import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center relative overflow-hidden w-full"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Taches existantes */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

        {/* Tache centrée */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-[1500ms]"></div>

        {/* Tache en haut à gauche */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-200"></div>

        {/* Tache en bas à droite */}
        <div className="absolute bottom-16 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse delay-300"></div>

        {/* Tache au centre bas */}
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              TC
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-ping opacity-25"></div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
          >
            Développeur
            <span className="block text-blue-600">Full Stack</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Passionné par la création d'expériences web modernes et performantes
            avec React, TypeScript et les dernières technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="/cv.pdf"
              download
              className="px-8 py-4 bg-[#296297] text-white rounded-full font-semibold hover:bg-[#1F4D73] transition-transform duration-300 hover:scale-105 shadow-lg cursor-pointer"
            >
              Télécharger mon CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-6 mb-30"
          >
            <a
              href="https://github.com"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-blue-600"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-blue-600"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-blue-600"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
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
