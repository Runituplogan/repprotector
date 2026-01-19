import { RefObject, useEffect } from "react";

interface useClickOutsideHandlerProps {
  refs: RefObject<HTMLElement>[];
  callbackHandler: () => void;
  excludeSelectors?: (string | undefined)[]; //Optional CSS selectors to exclude which must align with `refs`
}

const useClickOutside = ({
  refs,
  callbackHandler,
  excludeSelectors = [],
}: useClickOutsideHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      const shouldExclude = excludeSelectors.some(
        (selector) => selector && target.closest(selector),
      );

      if (shouldExclude) return;

      const clickedOutsideAll = refs.every(
        (ref) => ref.current && !ref.current.contains(target),
      );

      if (clickedOutsideAll) {
        callbackHandler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callbackHandler, excludeSelectors]);
};

export { useClickOutside };
