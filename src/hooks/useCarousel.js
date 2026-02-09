import { useState, useEffect, useRef, useMemo } from "react";

const AUTO_SLIDE_DELAY = 5000;

export const useCarousel = (items, itemsPerSlide = 3) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(itemsPerSlide);
  const timeoutRef = useRef(null);

  const slides = useMemo(() => {
    return items.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) chunks.push(items.slice(i, i + chunkSize));
      return chunks;
    }, []);
  }, [items, chunkSize]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    resetTimeout();
  };

  const pauseAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resumeAutoSlide = () => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, AUTO_SLIDE_DELAY);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setChunkSize(1);
      else setChunkSize(itemsPerSlide);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerSlide]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, AUTO_SLIDE_DELAY);
    return () => resetTimeout();
  }, [activeIndex, slides.length]);

  return {
    activeIndex,
    slides,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoSlide,
    resumeAutoSlide,
  };
};
