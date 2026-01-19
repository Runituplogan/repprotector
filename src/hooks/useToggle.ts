import { useState } from "react";

export const useToggle = (defaultState = false) => {
  const [isExpanded, setIsExpanded] = useState(defaultState);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsExpanded(false);
    }, 100);
    setHoverTimeout(timeout);
  };

  const handleToggleDropDown = (reset?: () => void) => {
    reset?.();
    setIsExpanded((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setIsExpanded(false);
  };

  return {
    isExpanded,
    handleMouseEnter,
    handleMouseLeave,
    handleCloseDropdown,
    handleToggleDropDown,
  };
};
