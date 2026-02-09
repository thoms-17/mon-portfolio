import { motion } from "framer-motion";
import SocialButton from "../components/SocialButton";
import { animations } from "../constants/theme";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="mx-auto p-6 text-center bg-[#296297] w-full"
    >
      <motion.h2
        {...animations.fadeInUp}
        className="text-3xl font-semibold mb-6 text-white"
      >
        Contactez-moi
      </motion.h2>

      <motion.p {...animations.fadeInUp} className="mb-8 text-white">
        Voici les canaux sur lesquels vous pouvez me contacter :
      </motion.p>

      <motion.div
        {...animations.fadeInUp}
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
