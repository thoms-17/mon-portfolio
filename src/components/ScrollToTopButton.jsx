import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Affiche le bouton si on a scrollé vers le bas
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-[#296297] text-white shadow-lg transition-all hover:scale-125  duration-500 z-50 cursor-pointer ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } `} // masque sur desktop
      aria-label="Remonter en haut"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
