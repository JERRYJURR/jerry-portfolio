"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Avatar } from "@/components/avatar";

type NavbarProps = {
  bookingUrl: string;
  resumeUrl: string;
};

const NAV_ITEMS = [
  { label: "Case studies", href: "#case-studies" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
];

const SCROLL_RAMP_RANGE = 150; // px over which the blur/bg fade in
const SCROLL_HIDE_THRESHOLD = 200;

export function Navbar({ bookingUrl, resumeUrl }: NavbarProps) {
  const [rampFactor, setRampFactor] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  // Timestamp until which scroll events are treated as the result of a nav
  // click rather than a user gesture; while active, the hide-on-scroll-down
  // logic is suppressed so the navbar stays visible after clicking a link.
  const programmaticUntil = useRef(0);
  const pathname = usePathname();

  // On the home page, brand click fires a reset event (replays all
  // animations) and smooth-scrolls to top in parallel. Any other route
  // falls through to normal Link navigation.
  const handleBrandClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      event.preventDefault();
      // Drop any nav-link hash so the URL matches a fresh visit.
      window.history.replaceState(null, "", "/");
      window.dispatchEvent(new Event("portfolio-reset"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pathname],
  );

  // Mark scroll events as programmatic for ~1.5s after a nav-link click so
  // the navbar doesn't auto-hide while smooth-scrolling to the target.
  const handleNavClick = useCallback(() => {
    programmaticUntil.current = performance.now() + 1500;
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onScroll = () => {
      const currentY = window.scrollY;

      const factor = Math.min(Math.max(currentY / SCROLL_RAMP_RANGE, 0), 1);
      setRampFactor(factor);

      const isProgrammatic = performance.now() < programmaticUntil.current;

      if (!reduceMotion && !isProgrammatic) {
        const delta = currentY - lastScrollY.current;
        if (currentY < SCROLL_HIDE_THRESHOLD) {
          setHidden(false);
        } else if (delta > 2) {
          setHidden(true);
        } else if (delta < -2) {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const safeResumeUrl =
    resumeUrl.startsWith("http") || resumeUrl.startsWith("/")
      ? resumeUrl
      : "#";

  const blurPx = rampFactor * 12;
  const bgAlpha = rampFactor * 0.7;
  const borderAlpha = rampFactor * 0.06;

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full border-b
        transition-transform duration-200 ease-out
        motion-reduce:transition-none
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
      style={{
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
        backgroundColor: `oklch(0.141 0.005 285.823 / ${bgAlpha})`,
        borderBottomColor: `rgba(255, 255, 255, ${borderAlpha})`,
      }}
    >
      <div className="mx-auto w-full max-w-[1024px] px-6 py-3">
        <div className="flex flex-row items-center">
          {/* Brand · fills left half so center can sit dead-center */}
          <Link
            href="/"
            onClick={handleBrandClick}
            className="
              group flex flex-1 flex-row items-center gap-3
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white focus-visible:ring-offset-2
              focus-visible:ring-offset-background rounded-md
            "
          >
            <Avatar className="size-8" sizes="32px" />
            <span className="relative text-lg font-medium text-zinc-50">
              Jerry Kou
              <span
                aria-hidden
                className="
                  pointer-events-none absolute -bottom-0.5 left-0 right-0
                  h-[0.5px] origin-left scale-x-0 bg-zinc-50/[0.33]
                  transition-transform duration-[180ms] ease-out
                  group-hover:scale-x-100
                "
              />
            </span>
          </Link>

          {/* Nav links · hug content */}
          <ul className="hidden md:flex flex-row items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="
                    text-sm text-muted-foreground
                    transition-colors duration-150 ease-out
                    hover:text-zinc-50
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-offset-2
                    focus-visible:ring-offset-background rounded-md
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTAs · fills right half so center can sit dead-center */}
          <div className="flex flex-1 flex-row items-center justify-end gap-2">
            {/* Primary · Book a call (small) */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative overflow-hidden
                inline-flex h-8 items-center gap-1 rounded-[10px] px-3
                border border-white
                bg-gradient-to-b from-[oklab(94%_0_0)] to-[oklab(78%_0_0)]
                text-sm font-medium text-zinc-950
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
              <span className="relative inline-flex items-center gap-1">
                Book a call
                <ArrowRight
                  className="
                    size-3.5 transition-transform duration-[160ms] ease-out
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </a>

            {/* Secondary · Resume (small) */}
            <a
              href={safeResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative
                inline-flex h-8 items-center gap-1.5 rounded-[10px] px-3
                border border-white/10
                bg-gradient-to-b from-white/[0.05] to-white/[0.025]
                text-sm font-medium text-zinc-50
                shadow-[0_0_0_0_rgba(0,0,0,0)]
                transition-[transform,border-color,background-image,box-shadow]
                duration-[160ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                will-change-transform
                hover:-translate-y-px
                hover:border-white/40
                hover:from-white/[0.10] hover:to-white/[0.06]
                hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                active:scale-[0.97] active:duration-[80ms] active:ease-out
                active:from-white/[0.14] active:to-white/[0.10]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-white focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              Resume
              <Download
                className="
                  size-3.5 opacity-[0.33] transition-opacity
                  duration-[160ms] ease-out group-hover:opacity-70
                "
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
