import { motion } from "framer-motion";
import SocialButton from "../components/SocialButton";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 },
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="mx-auto p-6 text-center bg-[#296297] w-full"
    >
      <motion.h2
        {...fadeInUp}
        className="text-3xl font-semibold mb-6 text-white"
      >
        Contactez-moi
      </motion.h2>

      <motion.p {...fadeInUp} className="mb-8 text-white">
        Voici les canaux sur lesquels vous pouvez me contacter :
      </motion.p>

      <motion.div
        {...fadeInUp}
        className="flex justify-center gap-6"
      >
        <SocialButton type="github" href="https://github.com/thoms-17" label="Github" />
        <SocialButton
          type="linkedin"
          href="https://www.linkedin.com/in/thomas-cooper17"
          label="LinkedIn"
        />
        <SocialButton
          type="mail"
          href="mailto:thomcooper04@gmail.com"
          isExternal={false}
          label="Email"
        />
        <SocialButton
          type="phone"
          href="https://wa.me/33783674994"
          label="WhatsApp"
        />
      </motion.div>
    </section>
  );
};

export default ContactSection;
