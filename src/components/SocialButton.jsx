import { Github, Linkedin, Mail, Phone } from "lucide-react";

const icons = {
  github: Github,
  linkedin: Linkedin,
  phone: Phone,
  mail: Mail,
};

const SocialButton = ({ type, href, label = null, isExternal = type !== "mail" }) => {
  const Icon = icons[type];

  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-400 hover:scale-110 text-[#296297] hover:text-white hover:bg-[#1F4D73]"
      >
        <Icon size={24} />
      </a>
      {label && <span className="text-sm text-white">{label}</span>}
    </div>
  );
};

export default SocialButton;
