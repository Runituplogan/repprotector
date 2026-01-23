import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { policies } from "../app/(landing-page)/(policy-pages)/_data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};


export const isValidTarget = (targetId: string | null | undefined): boolean => {
  if (typeof window === 'undefined') return false;
  if (!targetId) return false;

  return document.getElementById(targetId) !== null;
};

type GetValidatedHashResult = {
  targetId: string | null;
  isValid: boolean;
};

export const getValidatedHash = (
  allowedTargets: string[] = []
): GetValidatedHashResult => {
  if (typeof window === 'undefined') {
    return { targetId: null, isValid: false };
  }

  const hash = window.location.hash;
  if (!hash) return { targetId: null, isValid: false };

  const targetId = hash.substring(1);
  const exists = isValidTarget(targetId);

  const isAllowed =
    allowedTargets.length === 0 || allowedTargets.includes(targetId);

  return {
    targetId,
    isValid: exists && isAllowed,
  };
};

type ScrollOptions = {
  behavior?: ScrollBehavior;
  offset?: number;
  delay?: number;
  cleanup?: boolean;
};

export const cleanHashFromUrl = () => {
  if (typeof window === 'undefined') return;

  window.history.replaceState({}, '', window.location.pathname);
};

export const scrollToElementWithOffset = (
  targetId: string,
  options: ScrollOptions = {}
): boolean => {
  if (typeof window === 'undefined') return false;

  const {
    behavior = 'smooth',
    offset = 0,
    delay = 100,
    cleanup = false,
  } = options;

  const element = document.getElementById(targetId);
  if (!element) return false;

  setTimeout(() => {
    const elementTop =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });

    if (cleanup) {
      cleanHashFromUrl();
    }
  }, delay);

  return true;
};


export const getHashId = () => {
  if (typeof window === 'undefined') return null;

  const hash = window.location.hash;
  if (!hash) return null;

  return hash.substring(1);
};


type ScrollToElementOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  delay?: number;
  cleanup?: boolean;
};

export const scrollToElement = (
  targetId: string,
  options: ScrollToElementOptions = {}
): boolean => {
  if (typeof window === 'undefined') return false;

  const {
    behavior = 'smooth',
    block = 'start',
    delay = 100,
    cleanup = false,
  } = options;

  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Element with id "${targetId}" not found`);
    return false;
  }

  setTimeout(() => {
    element.scrollIntoView({ behavior, block });

    if (cleanup) {
      cleanHashFromUrl();
    }
  }, delay);

  return true;
};


type HandleHashScrollOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  delay?: number;
  cleanup?: boolean;
};

export const handleHashScroll = (
  options: HandleHashScrollOptions = {}
): (() => void) => {
  if (typeof window === 'undefined') return () => { };

  const targetId: string | null = getHashId();
  if (!targetId) return () => { };

  const {
    behavior = 'smooth',
    block = 'start',
    delay = 100,
    cleanup = true,
  } = options;

  const timeoutId: number = window.setTimeout(() => {
    scrollToElement(targetId, { behavior, block, cleanup: false });

    if (cleanup) {
      cleanHashFromUrl();
    }
  }, delay);

  return () => clearTimeout(timeoutId);
};


export function formatTab(tab: string) {
  return tab.replaceAll("-", " ");
}

export async function generateStaticParams() {
  return policies.map((policy) => {
    const slug = policy.url.includes("/")
      ? policy.url.split("/").pop()
      : policy.url;

    return { slug };
  });
}
