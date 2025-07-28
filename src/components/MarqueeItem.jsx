import { motion } from "framer-motion";

const MarqueeItem = ({ images, from, to }) => {
  return (
    <div className="flex select-none">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: from }}
          animate={{ x: to }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {images.map(({ src }, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg p-4"
              style={{ minWidth: 120, marginRight: 40 }}
            >
              <img src={src} alt={`logo-${index}`} className="h-20 w-20"/>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default MarqueeItem;
