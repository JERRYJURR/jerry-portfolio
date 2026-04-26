"use client";

import { ArrowRight, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroActionsProps = {
  email: string;
  bookingUrl: string;
};

export function HeroActions({ email, bookingUrl }: HeroActionsProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API failed; leave UI in default state
    }
  }, [email]);

  return (
    <div className="mt-2 flex flex-row gap-2">
      {/* Primary · Book a call */}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group relative overflow-hidden
          inline-flex h-10 items-center gap-1 rounded-[12px] px-[14px]
          border border-white
          bg-gradient-to-b from-[oklab(94%_0_0)] to-[oklab(78%_0_0)]
          text-base font-medium text-zinc-950
          transition-[transform,box-shadow,background-image]
          duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
          will-change-transform
          hover:-translate-y-px
          hover:from-[oklab(98%_0_0)] hover:to-[oklab(82%_0_0)]
          hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.25)]
          active:scale-[0.97] active:duration-[80ms] active:ease-out
          active:from-[oklab(85%_0_0)] active:to-[oklab(70%_0_0)]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-white focus-visible:ring-offset-2
          focus-visible:ring-offset-background
        "
      >
        {/* Shine sweep — runs once on hover-in (600ms ease-out) */}
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 -translate-x-full
            bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.85)_50%,transparent_70%)]
            transition-transform duration-0
            group-hover:translate-x-full
            group-hover:duration-[600ms] group-hover:ease-out
          "
        />
        <span className="relative inline-flex items-center gap-2">
          Book a call
          <ArrowRight
            className="
              size-4 transition-transform duration-[160ms] ease-out
              group-hover:translate-x-0.5
            "
          />
        </span>
      </a>

      {/* Secondary · Copy email — cross-fade between default and success */}
      <button
        type="button"
        onClick={handleCopy}
        className={`
          group relative
          inline-flex h-10 items-center gap-2 rounded-[12px] px-[14px]
          border
          bg-gradient-to-b from-white/[0.05] to-white/[0.025]
          text-base font-medium
          shadow-[0_0_0_0_rgba(0,0,0,0)]
          transition-[transform,border-color,color,background-image,box-shadow]
          duration-[160ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
          will-change-transform
          hover:-translate-y-px
          hover:from-white/[0.10] hover:to-white/[0.06]
          hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
          active:scale-[0.97] active:duration-[80ms] active:ease-out
          active:from-white/[0.14] active:to-white/[0.10]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-white focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          ${
            copied
              ? "border-accent/50 text-accent"
              : "border-white/10 text-zinc-50 hover:border-white/40"
          }
        `}
      >
        {/* Default label — sets the layout width */}
        <span
          className={`
            inline-flex items-center gap-2
            transition-opacity duration-[240ms] ease-out
            ${copied ? "opacity-0" : "opacity-100"}
          `}
        >
          Copy email
          <Copy
            className="
              size-4 opacity-[0.33] transition-opacity
              duration-[160ms] ease-out group-hover:opacity-70
            "
          />
        </span>

        {/* Success label — absolutely positioned, cross-fades in */}
        <span
          aria-hidden={!copied}
          className={`
            absolute inset-0 flex items-center justify-center gap-2
            transition-opacity duration-[240ms] ease-out
            ${copied ? "opacity-100" : "opacity-0"}
          `}
        >
          Copied
          <Check className="size-4" strokeWidth={2.25} />
        </span>

        {/* Live region for screen readers */}
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </button>
    </div>
  );
}
