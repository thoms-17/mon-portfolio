import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <motion.section
      className="my-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-4">À propos</h2>
      <p className="text-gray-700 leading-relaxed max-w-prose">
        Je suis un développeur web passionné par la création d’expériences utilisateurs
        simples, modernes et efficaces. Ce portfolio a pour but de présenter mon travail,
        mes compétences, et de faciliter le contact.
      </p>
    </motion.section>
  );
};

export default AboutSection;
