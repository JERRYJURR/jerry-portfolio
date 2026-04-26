"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
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

const INITIAL_COLUMN_IDS = COLUMNS.map((_, i) => `col-${i}`);

export function Tools() {
  const [columnIds, setColumnIds] = useState(INITIAL_COLUMN_IDS);

  // Require >6px of pointer travel before activating drag, so a quick click
  // is never interpreted as a sort attempt.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumnIds((items) => {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over.id));
      return arrayMove(items, oldIndex, newIndex);
    });
  };

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

        <DndContext
          id="tools-sortable"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={columnIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {columnIds.map((id) => {
                const colIndex = Number.parseInt(id.split("-")[1], 10);
                return (
                  <SortableColumn
                    key={id}
                    id={id}
                    groups={COLUMNS[colIndex]}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}

function SortableColumn({
  id,
  groups,
}: {
  id: string;
  groups: ToolGroup[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 320,
      easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
    },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group flex flex-col gap-4 touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {groups.map((group) => (
        <ToolCard
          key={group.label}
          group={group}
          isDragging={isDragging}
        />
      ))}
    </div>
  );
}

function ToolCard({
  group,
  isDragging = false,
}: {
  group: ToolGroup;
  isDragging?: boolean;
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const revealStyle = staggerStyle(0, {
    revealed,
    reduced,
    distance: 16,
    duration: 360,
  });
  return (
    <div ref={ref} style={revealStyle} className="flex flex-col gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
        {group.label}
      </p>
      <ul
        className={`
          flex flex-col gap-2 rounded-2xl bg-white/[0.05] p-3
          transition-[box-shadow,background-color,transform]
          duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)]
          group-hover:bg-white/[0.07]
          group-hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]
          ${
            isDragging
              ? "scale-[1.03] bg-white/[0.10] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
              : ""
          }
        `}
      >
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
