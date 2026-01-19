import { useState, useEffect } from "react";

export const useMediaQuery = (mediaQuery: string) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia(mediaQuery).matches);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mediaQuery]);

  return !!isMobile;
};
