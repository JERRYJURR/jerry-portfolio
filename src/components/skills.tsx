"use client";

import { Binoculars, Code2, Paintbrush } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Reveal,
  staggerStyle,
  usePrefersReducedMotion,
  useReveal,
} from "@/components/reveal";

type SkillGroup = {
  icon: LucideIcon;
  label: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: Paintbrush,
    label: "Design & prototyping",
    items: [
      "Rapid prototyping",
      "Design systems",
      "Interaction design",
      "Accessibility (WCAG)",
      "Data visualization",
      "Information architecture",
    ],
  },
  {
    icon: Binoculars,
    label: "Research & validation",
    items: ["User interviews", "Usability testing", "A/B testing", "Metrics & KPIs"],
  },
  {
    icon: Code2,
    label: "Development",
    items: [
      "Prompt engineering",
      "Front-end development",
      "Design-to-code",
      "Design tokens",
      "Component libraries",
    ],
  },
];

export function Skills() {
  // Each skill group reveals independently as it scrolls past the trigger
  // line. Left column heading + body fades on its own.
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-[1024px] px-6 py-14"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
        {/* Left · heading + body (sticky) */}
        <div className="md:sticky md:top-24 md:self-start">
          <Reveal distance={16} duration={360} className="flex flex-col gap-6">
            <h2 className="text-2xl font-normal leading-[30px] tracking-tight text-zinc-50">
              Skills &amp; competencies
            </h2>
            <p className="max-w-[270px] text-base leading-[1.5] text-zinc-50/[0.66]">
              I&apos;m always looking to sharpen my skills and learn new things.
            </p>
          </Reveal>
        </div>

        {/* Right · groups */}
        <div className="flex flex-col">
          {SKILL_GROUPS.map((group, index) => (
            <SkillGroupRow
              key={group.label}
              group={group}
              isLast={index === SKILL_GROUPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroupRow({
  group,
  isLast,
}: {
  group: SkillGroup;
  isLast: boolean;
}) {
  const Icon = group.icon;
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
      className={`flex items-start gap-6 py-10 first:pt-0 ${
        isLast ? "" : "border-b border-white/[0.05]"
      }`}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
        <Icon className="size-6 text-zinc-500" strokeWidth={2} aria-hidden />
      </span>
      <div className="flex flex-1 flex-col gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
          {group.label}
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
          {group.items.map((item) => (
            <li
              key={item}
              className="text-[18px] font-normal leading-[22px] text-zinc-50"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
