"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

const EASE_OUT = "cubic-bezier(0.2, 0.6, 0.2, 1)";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/**
 * Flips `revealed` to true exactly once, the first time the observed element
 * crosses the trigger line. Default rootMargin fires when the element top
 * crosses 80% from viewport top — i.e., the element is in the bottom 20%
 * of the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -20% 0px",
}: { rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, revealed] as const;
}

type RevealProps = {
  children: ReactNode;
  /** Translate distance in px. Defaults to 16. Spec uses 8 / 12 / 16. */
  distance?: number;
  /** Animation duration in ms. Defaults to 360. Spec uses 280 / 320 / 360 / 380. */
  duration?: number;
  /** Delay before this reveal starts. Used for staggers. */
  delay?: number;
  /** rootMargin override. Default triggers at 25% from viewport top. */
  rootMargin?: string;
  className?: string;
};

/**
 * Translate-fade reveal. Honors prefers-reduced-motion (opacity only,
 * no translate). Triggers once per session via IntersectionObserver.
 */
export function Reveal({
  children,
  distance = 16,
  duration = 360,
  delay = 0,
  rootMargin,
  className,
}: RevealProps) {
  const [ref, revealed] = useReveal<HTMLDivElement>({ rootMargin });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      style={staggerStyle(0, {
        revealed,
        reduced,
        distance,
        duration,
        gap: 0,
        baseDelay: delay,
      })}
      className={className}
    >
      {children}
    </div>
  );
}

type StaggerOptions = {
  revealed: boolean;
  reduced: boolean;
  /** Translate distance in px when not revealed. */
  distance?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Per-step delay in ms (multiplied by index). */
  gap?: number;
  /** Constant delay added on top of `index * gap`, in ms. */
  baseDelay?: number;
};

/**
 * Inline style for a single staggered item driven by a parent reveal.
 * Pair with useReveal: pass its `revealed` boolean plus a `reduced` flag,
 * call once per child with an increasing index.
 */
export function staggerStyle(
  index: number,
  {
    revealed,
    reduced,
    distance = 12,
    duration = 480,
    gap = 80,
    baseDelay = 0,
  }: StaggerOptions,
): CSSProperties {
  const offset = reduced ? 0 : distance;
  const delay = baseDelay + index * gap;
  return {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0px)" : `translateY(${offset}px)`,
    transition: `opacity ${duration}ms ${EASE_OUT} ${delay}ms, transform ${duration}ms ${EASE_OUT} ${delay}ms`,
    willChange: revealed ? undefined : "opacity, transform",
  };
}
