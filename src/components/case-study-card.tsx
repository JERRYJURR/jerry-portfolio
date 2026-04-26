"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type CaseStudyCardProps = {
  year: string;
  client: string;
  role: string;
  title: string;
  href: string;
  /** "full" spans the whole row; "half" sits in a 2-up grid */
  layout: "full" | "half";
  /** 5-stop linear gradient for the base of the gradient hero */
  baseGradient: string;
  /** Radial-gradient string for the warm/highlight blob (top-right) */
  blobA: string;
  /** Radial-gradient string for the cool/shadow blob (bottom-left) */
  blobB: string;
  /** When true, render a Paper MeshGradient instead of the static gradient + blobs.
   *  Animates only on hover. */
  useMeshGradient?: boolean;
  /** Up to 10 hex/rgb color stops for the mesh */
  meshColors?: string[];
  /** Shader offset / rotation so each card boots in a different state */
  meshOffsetX?: number;
  meshOffsetY?: number;
  meshRotation?: number;
};

/** Smoothness of the lerp toward the mouse target. Higher = snappier; lower = more lag.
 *  ~0.15 gives the spec's "120ms feel." */
const LERP_FACTOR = 0.15;
/** How dramatic the 3D tilt is at the corners. Subtle on purpose. */
const TILT_DEGREES = 2;
/** How far the card lifts on hover. */
const LIFT_PX = 4;

export function CaseStudyCard({
  year,
  client,
  role,
  title,
  href,
  layout,
  baseGradient,
  blobA,
  blobB,
  useMeshGradient = false,
  meshColors,
  meshOffsetX = 0,
  meshOffsetY = 0,
  meshRotation = 0,
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const target = useRef({ x: 50, y: 50, hover: 0 });
  const current = useRef({ x: 50, y: 50, hover: 0 });
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const tick = useCallback(() => {
    const card = cardRef.current;
    if (!card) {
      rafRef.current = null;
      return;
    }

    const t = target.current;
    const c = current.current;

    c.x += (t.x - c.x) * LERP_FACTOR;
    c.y += (t.y - c.y) * LERP_FACTOR;
    c.hover += (t.hover - c.hover) * LERP_FACTOR;

    card.style.setProperty("--spot-x", `${c.x}%`);
    card.style.setProperty("--spot-y", `${c.y}%`);
    card.style.setProperty("--hover", `${c.hover}`);

    // Tilt scales with hover so it eases in/out alongside the spotlight
    const rotX = ((c.y - 50) / 50) * -TILT_DEGREES * c.hover;
    const rotY = ((c.x - 50) / 50) * TILT_DEGREES * c.hover;
    const lift = -LIFT_PX * c.hover;

    card.style.setProperty("--tilt-x", `${rotX.toFixed(3)}deg`);
    card.style.setProperty("--tilt-y", `${rotY.toFixed(3)}deg`);
    card.style.setProperty("--lift", `${lift.toFixed(3)}px`);

    const settled =
      Math.abs(t.x - c.x) < 0.05 &&
      Math.abs(t.y - c.y) < 0.05 &&
      Math.abs(t.hover - c.hover) < 0.001;

    if (settled) {
      rafRef.current = null;
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const handlePointerEnter = useCallback(() => {
    target.current.hover = 1;
    setIsHovered(true);
    startLoop();
  }, [startLoop]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType !== "mouse") return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      target.current.x = ((event.clientX - rect.left) / rect.width) * 100;
      target.current.y = ((event.clientY - rect.top) / rect.height) * 100;
      target.current.hover = 1;
      startLoop();
    },
    [startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    target.current.hover = 0;
    setIsHovered(false);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          "perspective(1000px) translateY(var(--lift, 0px)) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        transformStyle: "preserve-3d",
      }}
      className={`
        group relative flex h-[394px] flex-col justify-end overflow-hidden rounded-2xl
        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.10),0_1px_2px_rgba(0,0,0,0.3)]
        transition-[box-shadow] duration-[380ms]
        ease-[cubic-bezier(0.2,0.6,0.2,1)]
        will-change-transform
        hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_1px_0_rgba(255,255,255,0.18),0_8px_28px_-6px_rgba(0,0,0,0.55)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        motion-reduce:transition-none
        ${layout === "full" ? "col-span-2" : "col-span-2 md:col-span-1"}
      `}
    >
      {/* Background — either static gradient + blobs OR Paper MeshGradient */}
      {useMeshGradient && meshColors ? (
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={meshColors}
          speed={isHovered ? 0.15 : 0}
          distortion={0.1}
          swirl={0}
          grainMixer={0.06}
          grainOverlay={0.2}
          offsetX={meshOffsetX}
          offsetY={meshOffsetY}
          rotation={meshRotation}
        />
      ) : (
        <>
          {/* Base gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: baseGradient }}
          />
          {/* Blob A · top-right · drift-a */}
          <div
            aria-hidden
            className="drift-a pointer-events-none absolute"
            style={{
              top: "-30%",
              left: "48%",
              width: "70%",
              height: "150%",
              borderRadius: "50%",
              backgroundImage: blobA,
            }}
          />
          {/* Blob B · bottom-left · drift-b (180° offset) */}
          <div
            aria-hidden
            className="drift-b pointer-events-none absolute"
            style={{
              bottom: "-40%",
              left: "-15%",
              width: "65%",
              height: "140%",
              borderRadius: "50%",
              backgroundImage: blobB,
            }}
          />
        </>
      )}
      {/* Cursor spotlight — radial gradient that follows the mouse with lag */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.08), transparent 55%)",
          opacity: "var(--hover, 0)",
        }}
      />

      {/* Body — sits on top of the gradient, anchored to the bottom of the card */}
      <div className="relative flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/70">
            {year} <span className="px-1">•</span> {client}{" "}
            <span className="px-1">•</span> {role}
          </p>
          <h3 className="text-[18px] font-normal leading-[22px] text-zinc-50">
            <span
              className="
                bg-no-repeat
                [background-image:linear-gradient(currentColor,currentColor)]
                [background-size:0%_1px]
                [background-position:0_100%]
                [box-decoration-break:clone]
                [-webkit-box-decoration-break:clone]
                transition-[background-size]
                duration-[220ms] ease-out
                group-hover:[background-size:100%_1px]
              "
            >
              {title}
            </span>
          </h3>
        </div>
        <span
          className="
            inline-flex items-center gap-1 text-sm
            text-zinc-50/[0.66]
            transition-colors duration-200 ease-out
            group-hover:text-zinc-50
          "
        >
          {/* Underline wipes in on hover via background-size trick */}
          <span
            className="
              inline-block bg-no-repeat
              [background-image:linear-gradient(currentColor,currentColor)]
              [background-size:0%_1px]
              [background-position:0_100%]
              transition-[background-size]
              duration-[220ms] ease-out
              group-hover:[background-size:100%_1px]
            "
          >
            Read case study
          </span>
          <ArrowRight
            className="
              size-3.5 transition-transform duration-200 ease-out
              group-hover:translate-x-1
            "
          />
        </span>
      </div>
    </a>
  );
}
