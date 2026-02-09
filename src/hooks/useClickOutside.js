import { useEffect } from "react";

export const useClickOutside = (refs, callback, isActive = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e) => {
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );

      if (clickedOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, callback, isActive]);
};
