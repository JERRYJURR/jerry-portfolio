"use client";

import Image from "next/image";
import { Gauge, ListChecks, Rocket, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  staggerStyle,
  usePrefersReducedMotion,
  useReveal,
} from "@/components/reveal";

type Bullet = {
  icon: LucideIcon;
  text: string;
};

type Role = {
  logo: string;
  logoAlt: string;
  company: string;
  dateRange: string;
  title: string;
  bullets: Bullet[];
};

const ROLES: Role[] = [
  {
    logo: "/icons/xp3.jpg",
    logoAlt: "Ex Populus",
    company: "Ex Populus",
    dateRange: "Jan 2025 – Now",
    title: "Senior Product Designer",
    bullets: [
      {
        icon: Rocket,
        text: "I designed and scaled a live service, consumer gaming product that reached 1.9M daily sessions and 187k concurrent users at peak.",
      },
      {
        icon: Gauge,
        text: "I reduced frontend development time by more than 80% and product exploration timelines by more than 50% using hi-fidelity Claude Code and AI prototypes.",
      },
      {
        icon: Zap,
        text: "I shipped features that reduced time-to-value by ~60%, and achieved a 47% peak feature adoption rate.",
      },
    ],
  },
  {
    logo: "/icons/xp1.jpg",
    logoAlt: "Ex Populus",
    company: "Ex Populus",
    dateRange: "Mar 2022 – Jan 2025",
    title: "Product Designer",
    bullets: [
      {
        icon: Rocket,
        text: "I designed a first-of-its-kind, Web3 consumer product that drove $40M+ in sales, and defined a new product category.",
      },
      {
        icon: Gauge,
        text: "I reduced design handoff and frontend development time by 50% by building a WCAG 2.1 compliant React design system and component library.",
      },
    ],
  },
  {
    logo: "/icons/f1.jpg",
    logoAlt: "Frame One Software",
    company: "Frame One Software",
    dateRange: "Apr 2021 – Mar 2022",
    title: "UX/UI Designer",
    bullets: [
      {
        icon: Rocket,
        text: "I designed a first-of-its-kind, mining enterprise application that achieved significant adoption in a $100B+ legacy, slow-moving industry.",
      },
      {
        icon: ListChecks,
        text: "I designed 5+ applications across enterprise, e-commerce, health and fitness, and gaming domains.",
      },
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[1024px] px-6 py-14"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
        {/* Left · heading + body (sticks while right column scrolls) */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-normal leading-[30px] tracking-tight text-zinc-50">
              Experience
            </h2>
            <p className="max-w-[270px] text-base leading-[1.5] text-zinc-50/[0.66]">
              5+ years of experience building real products in a variety of
              different domains.
            </p>
          </div>
        </div>

        {/* Right · roles */}
        <div className="flex flex-col">
          {ROLES.map((role, index) => (
            <RoleEntry
              key={`${role.company}-${role.title}`}
              role={role}
              isLast={index === ROLES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleEntry({ role, isLast }: { role: Role; isLast: boolean }) {
  // Each role reveals independently as it crosses 25% from viewport top,
  // y +16 → 0 · 360ms.
  const [ref, revealed] = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const style = staggerStyle(0, {
    revealed,
    reduced,
    distance: 16,
    duration: 360,
  });
  return (
    <div
      ref={ref}
      style={style}
      className={`flex flex-col gap-8 py-10 first:pt-0 ${
        isLast ? "" : "border-b border-white/[0.05]"
      }`}
    >
      {/* Header — logo + company / date / title */}
      <div className="flex items-center gap-6">
        <div className="relative size-12 shrink-0 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <Image
              src={role.logo}
              alt={role.logoAlt}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
            {role.company} <span className="px-1">/</span> {role.dateRange}
          </p>
          <h3 className="text-[18px] font-normal leading-[22px] text-zinc-50">
            {role.title}
          </h3>
        </div>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-5">
        {role.bullets.map((bullet, i) => {
          const Icon = bullet.icon;
          return (
            <li key={i} className="flex items-start gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                <Icon
                  className="size-4 text-zinc-500"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
              <p className="flex-1 text-base leading-[1.5] text-zinc-50/[0.66]">
                {bullet.text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
