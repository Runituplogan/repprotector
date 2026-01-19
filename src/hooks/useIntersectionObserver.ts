import { useEffect } from "react";

type UseIntersectionObserverOptions = {
  target: React.RefObject<Element>;
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export const useIntersectionObserver = ({
  target,
  onIntersect,
  enabled = true,
  rootMargin = "0px",
  threshold = 1.0,
}: UseIntersectionObserverOptions) => {
  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { rootMargin, threshold },
    );

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [target, onIntersect, enabled, rootMargin, threshold]);
};
