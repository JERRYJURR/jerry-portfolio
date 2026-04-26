"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/reveal";

const CHAR_INTERVAL_MS = 28;
const HOLD_AFTER_MS = 600;
const FADE_MS = 240;
const EASE_OUT = "cubic-bezier(0.2, 0.6, 0.2, 1)";

/**
 * Reveals the hero headline character-by-character at ~28ms/char on every
 * load, like an AI streaming a response. A thin caret tracks the last
 * character; after completion it holds 600ms then fades over 240ms.
 *
 * prefers-reduced-motion users see the full text instantly with no caret.
 */
export function HeroHeadline({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const [chars, setChars] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkipAnimation(true);
      setChars(text.length);
      setCaretVisible(false);
      return;
    }

    const interval = window.setInterval(() => {
      setChars((c) => (c >= text.length ? c : c + 1));
    }, CHAR_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [reduced, text]);

  // After streaming completes, hold the caret then fade it out.
  useEffect(() => {
    if (skipAnimation || chars < text.length) return;
    const holdTimer = window.setTimeout(() => {
      setCaretVisible(false);
    }, HOLD_AFTER_MS);
    return () => window.clearTimeout(holdTimer);
  }, [chars, text.length, skipAnimation]);

  return (
    <h1
      aria-label={text}
      className="text-[2rem] font-medium leading-[1.15] tracking-tight"
    >
      <span aria-hidden>{text.slice(0, chars)}</span>
      <span
        aria-hidden
        className="inline-block w-[2px] h-[0.9em] align-text-bottom bg-current ml-[2px]"
        style={{
          opacity: caretVisible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ${EASE_OUT}`,
        }}
      />
    </h1>
  );
}
