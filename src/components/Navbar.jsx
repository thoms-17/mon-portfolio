import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const links = [
    { href: "top", label: "Accueil" },
    { href: "#about", label: "À propos" },
    { href: "#projects", label: "Projets" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/20 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold text-[#296297] hover:text-blue-600 inline-block transform transition-transform duration-300 hover:scale-112 cursor-pointer"
          >
            Mon Portfolio
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-sm font-medium">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="inline-block transform transition-transform duration-300 hover:scale-125 text-[#296297] hover:text-blue-600"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Burger Button (Mobile) */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg px-4 py-2 text-base font-medium bg-[#296297] text-white cursor-pointer transition duration-300 hover:bg-[#1e4c73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#296297]"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-16 right-4 w-64 bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-6 flex flex-col space-y-4 z-40"
          >
            {/* Close button */}

            {/* Menu items */}
            <div className="w-full flex flex-col items-center space-y-4">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href === "top" ? undefined : href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (href === "top") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="text-lg text-[#296297] hover:text-blue-600 transition-transform transform hover:scale-110 cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
