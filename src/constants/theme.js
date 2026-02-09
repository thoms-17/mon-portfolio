export const colors = {
  primary: "#296297",
  primaryHover: "#1F4D73",
  gradientFrom: "from-blue-50",
  gradientVia: "via-white",
  gradientTo: "to-indigo-50",
};

export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
  },
};

export const transitions = {
  default: { duration: 0.8, ease: "easeOut" },
  fast: { duration: 0.4, ease: "easeOut" },
  bounce: { type: "spring", stiffness: 300, damping: 20 },
};
