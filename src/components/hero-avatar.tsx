"use client";

import { useEffect, useRef } from "react";
import { Avatar } from "@/components/avatar";
import { usePrefersReducedMotion } from "@/components/reveal";

const ACTIVE_LERP = 0.12; // ~160ms feel
const SETTLE_LERP = 0.06; // ~300ms feel for the mouse-leave reset
const MAX_TILT_DEG = 8;
const SPOT_RANGE = 25; // %, half-range around 50% center → clamps to 25-75%

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/**
 * Hero portrait that tilts ≤3° toward the cursor and carries a soft white
 * radial highlight whose center tracks the cursor across the avatar surface
 * (clamped to 25-75% so the gloss never falls off the disc). Disabled on
 * touch / coarse-pointer devices and on prefers-reduced-motion — the
 * underlying <Avatar /> is rendered as-is in those cases.
 */
export function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const target = { tiltX: 0, tiltY: 0, spotX: 50, spotY: 50 };
    const current = { tiltX: 0, tiltY: 0, spotX: 50, spotY: 50 };
    let lerp = ACTIVE_LERP;
    let raf: number | null = null;

    const tick = () => {
      current.tiltX += (target.tiltX - current.tiltX) * lerp;
      current.tiltY += (target.tiltY - current.tiltY) * lerp;
      current.spotX += (target.spotX - current.spotX) * lerp;
      current.spotY += (target.spotY - current.spotY) * lerp;

      inner.style.setProperty("--tilt-x", `${current.tiltX.toFixed(3)}deg`);
      inner.style.setProperty("--tilt-y", `${current.tiltY.toFixed(3)}deg`);
      inner.style.setProperty("--spot-x", `${current.spotX.toFixed(2)}%`);
      inner.style.setProperty("--spot-y", `${current.spotY.toFixed(2)}%`);

      const dTilt =
        Math.abs(target.tiltX - current.tiltX) +
        Math.abs(target.tiltY - current.tiltY);
      const dSpot =
        Math.abs(target.spotX - current.spotX) +
        Math.abs(target.spotY - current.spotY);

      if (dTilt > 0.01 || dSpot > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const ensureTicking = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clamp((event.clientX - cx) / (rect.width / 2), -1, 1);
      const dy = clamp((event.clientY - cy) / (rect.height / 2), -1, 1);
      target.tiltX = dy * MAX_TILT_DEG;
      target.tiltY = dx * MAX_TILT_DEG;
      target.spotX = 50 + dx * SPOT_RANGE;
      target.spotY = 50 + dy * SPOT_RANGE;
      lerp = ACTIVE_LERP;
      ensureTicking();
    };

    const onPointerLeave = () => {
      target.tiltX = 0;
      target.tiltY = 0;
      target.spotX = 50;
      target.spotY = 50;
      lerp = SETTLE_LERP;
      ensureTicking();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="size-24 inline-block [perspective:800px]"
    >
      <div
        ref={innerRef}
        className="relative size-full"
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Avatar className="size-24" sizes="96px" priority alt="Jerry Kou" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.18) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
