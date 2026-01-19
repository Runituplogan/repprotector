import { useState, useEffect, RefObject } from "react";

interface Position {
  top: number;
  left: number;
}

export function useDropdownPosition(
  iconRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  dimension: { width: number; height: number },
) {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [isReady, setIsReady] = useState(false);

  const updatePosition = () => {
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = rect.bottom + window.scrollY + 2;
    let left = rect.right + window.scrollX - dimension.width;

    const dropdownBottom = rect.bottom + dimension.height;
    if (dropdownBottom > viewportHeight) {
      top = rect.top + window.scrollY - dimension.height + 27;
    }

    if (left < 0) left = rect.left + window.scrollX;

    const dropdownRight = left + dimension.width;
    if (dropdownRight > viewportWidth)
      left = viewportWidth - dimension.width - 10;

    setPosition({ top, left });
    setIsReady(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      return;
    }
    updatePosition();

    const findScrollParent = (
      element: HTMLElement | null,
    ): HTMLElement | null => {
      if (!element) return null;
      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = /(auto|scroll)/.test(overflow + overflowY);
      if (isScrollable && element.scrollHeight > element.clientHeight)
        return element;
      return findScrollParent(element.parentElement);
    };

    const scrollParent = findScrollParent(iconRef.current);
    if (scrollParent) {
      scrollParent.addEventListener("scroll", updatePosition);
      return () => scrollParent.removeEventListener("scroll", updatePosition);
    }
  }, [isOpen, iconRef]);

  return { position, isReady };
}
