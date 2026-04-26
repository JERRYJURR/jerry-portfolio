"use client";

import Image from "next/image";
import {
  Reveal,
  staggerStyle,
  usePrefersReducedMotion,
  useReveal,
} from "@/components/reveal";

type Tool = {
  name: string;
  icon: string;
  /** Source image has a white/very light background — uses an inverted dark
   *  hairline + bottom shade so the edge has definition. */
  lightBg?: boolean;
};

type ToolGroup = {
  label: string;
  tools: Tool[];
};

const COLUMNS: ToolGroup[][] = [
  [
    {
      label: "UX / UI",
      tools: [
        { name: "Figma", icon: "/icons/figma.png" },
        { name: "Excalidraw", icon: "/icons/excalidraw.png", lightBg: true },
      ],
    },
    {
      label: "Design-to-code",
      tools: [
        { name: "Paper", icon: "/icons/paper.png" },
        { name: "Framer", icon: "/icons/framer.png" },
        { name: "Webflow", icon: "/icons/webflow.png" },
      ],
    },
  ],
  [
    {
      label: "AI coding",
      tools: [
        { name: "Claude Code", icon: "/icons/claude.png" },
        { name: "Codex", icon: "/icons/codex.png" },
        { name: "Cursor", icon: "/icons/cursor.jpg" },
        { name: "GitHub Copilot", icon: "/icons/copilot.jpg", lightBg: true },
        { name: "Lovable", icon: "/icons/lovable.jpg" },
      ],
    },
  ],
  [
    {
      label: "Frontend",
      tools: [
        { name: "Git", icon: "/icons/git.png" },
        { name: "HTML/CSS", icon: "/icons/html.png" },
        { name: "React", icon: "/icons/react.png" },
        { name: "TypeScript", icon: "/icons/ts.png" },
        { name: "Vite", icon: "/icons/vite.png" },
        { name: "Tailwind", icon: "/icons/tailwind.png" },
        { name: "shadcn", icon: "/icons/shadcn.png" },
      ],
    },
  ],
  [
    {
      label: "Visual design",
      tools: [
        { name: "Photoshop", icon: "/icons/ps.png" },
        { name: "Illustrator", icon: "/icons/ai.png" },
        { name: "After Effects", icon: "/icons/ae.png" },
        { name: "Spline", icon: "/icons/spline.png" },
      ],
    },
    {
      label: "Documentation",
      tools: [
        { name: "Notion", icon: "/icons/notion.png" },
        { name: "Gitbook", icon: "/icons/gitbook.png" },
      ],
    },
  ],
  [
    {
      label: "Analytics / research",
      tools: [
        { name: "Mixpanel", icon: "/icons/mixpanel.png" },
        { name: "Hotjar", icon: "/icons/hotjar.png" },
        { name: "Google Analytics 4", icon: "/icons/ga4.png" },
        { name: "Maze", icon: "/icons/maze.png" },
        { name: "Typeform", icon: "/icons/typeform.png" },
      ],
    },
  ],
];

export function Tools() {
  // Heading reveals on its own; each ToolCard reveals independently as it
  // scrolls past the trigger.
  return (
    <section
      id="tools"
      className="mx-auto w-full max-w-[1024px] px-6 pt-14 pb-40"
    >
      <div className="flex flex-col gap-8">
        <Reveal distance={16} duration={360}>
          <h2 className="text-2xl font-normal leading-[30px] tracking-tight text-zinc-50">
            Tools
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((column, i) => (
            <div key={i} className="flex flex-col gap-4">
              {column.map((group) => (
                <ToolCard key={group.label} group={group} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ group }: { group: ToolGroup }) {
  const [ref, revealed] = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const style = staggerStyle(0, {
    revealed,
    reduced,
    distance: 16,
    duration: 360,
  });
  return (
    <div ref={ref} style={style} className="flex flex-col gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
        {group.label}
      </p>
      <ul className="flex flex-col gap-2 rounded-2xl bg-white/[0.05] p-3">
        {group.tools.map((tool) => (
          <li key={tool.name} className="flex items-center gap-3">
            <span className="relative size-6 shrink-0 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.2)]">
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  src={tool.icon}
                  alt=""
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-md ${
                  tool.lightBg
                    ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.10),inset_0_-1px_0_rgba(0,0,0,0.06)]"
                    : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]"
                }`}
              />
            </span>
            <span className="text-sm leading-[18px] text-zinc-50/[0.66]">
              {tool.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
