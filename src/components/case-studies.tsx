import { CaseStudyCard } from "@/components/case-study-card";

type CaseStudy = {
  year: string;
  client: string;
  role: string;
  title: string;
  href: string;
  layout: "full" | "half";
  baseGradient: string;
  blobA: string;
  blobB: string;
  useMeshGradient?: boolean;
  meshColors?: string[];
  /** Mesh shader offset / rotation so each card boots in a different state */
  meshOffsetX?: number;
  meshOffsetY?: number;
  meshRotation?: number;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    layout: "full",
    year: "2025",
    client: "raijin",
    role: "lead designer",
    title:
      "Optimizing engagement and maximizing value for almost 200k daily users.",
    href: "/work/raijin-engagement",
    baseGradient:
      "linear-gradient(in oklab 132deg, oklab(86.2% 0.027 0.077) 0%, oklab(72.2% 0.107 0.081) 28%, oklab(55.6% 0.141 -0.003) 58%, oklab(36.3% 0.059 -0.090) 82%, oklab(26.4% 0.014 -0.078) 100%)",
    blobA:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(91.7% 0.017 0.068 / 60%) 0%, oklab(91.7% 0.017 0.068 / 0%) 72%)",
    blobB:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(36.1% 0.058 -0.116 / 55%) 0%, oklab(36.1% 0.058 -0.116 / 0%) 70%)",
    // Neon blue — saturated, electric
    useMeshGradient: true,
    meshColors: [
      "#000005", // pure black
      "#001a5e", // deep saturated blue
      "#0030f5", // saturated electric blue
      "#1a66ff", // neon blue
      "#4d8bff", // bright blue
      "#a8c5ff", // pale blue highlight
    ],
    meshOffsetX: 0.3,
    meshOffsetY: -0.2,
    meshRotation: 0,
  },
  {
    layout: "half",
    year: "2025",
    client: "raijin",
    role: "lead designer",
    title: "Scaling to 40+ external partners.",
    href: "/work/raijin-partners",
    baseGradient:
      "linear-gradient(in oklab 132deg, oklab(90% -0.008 0.088) 0%, oklab(81.2% -0.061 0.107) 28%, oklab(59.8% -0.078 0.045) 58%, oklab(37.3% -0.054 0.010) 82%, oklab(25.5% -0.034 0.005) 100%)",
    blobA:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(95.3% -0.008 0.078 / 58%) 0%, oklab(95.3% -0.008 0.078 / 0%) 72%)",
    blobB:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(48.5% -0.082 0.026 / 55%) 0%, oklab(48.5% -0.082 0.026 / 0%) 70%)",
    // Neon red with saturated orange accent — warm, electric
    useMeshGradient: true,
    meshColors: [
      "#000005", // pure black
      "#5e0810", // deep red
      "#e80820", // saturated red
      "#ff0a18", // neon red
      "#ff5500", // saturated orange accent
      "#ff8a3a", // bright orange
      "#ffaab0", // bright coral highlight
    ],
    meshOffsetX: -0.4,
    meshOffsetY: 0.3,
    meshRotation: 75,
  },
  {
    layout: "half",
    year: "2024",
    client: "ex populus",
    role: "lead designer",
    title: "Cutting development time by 50%.",
    href: "/work/ex-populus-velocity",
    baseGradient:
      "linear-gradient(in oklab 132deg, oklab(92.2% 0.005 0.089) 0%, oklab(77.1% 0.066 0.127) 28%, oklab(59.9% 0.165 0.084) 58%, oklab(36.8% 0.113 0.025) 82%, oklab(20% 0.058 0.002) 100%)",
    blobA:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(95.5% -0.004 0.066 / 60%) 0%, oklab(95.5% -0.004 0.066 / 0%) 72%)",
    blobB:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(47.7% 0.141 0.052 / 55%) 0%, oklab(47.7% 0.141 0.052 / 0%) 70%)",
    // Neon green — saturated, electric
    useMeshGradient: true,
    meshColors: [
      "#000005", // pure black
      "#003a14", // deep emerald
      "#08a838", // saturated emerald
      "#00ff44", // neon green
      "#5cff7c", // bright green
      "#b8ffc4", // pale green highlight
    ],
    meshOffsetX: 0.5,
    meshOffsetY: 0.1,
    meshRotation: 145,
  },
  {
    layout: "full",
    year: "2023",
    client: "xai",
    role: "lead designer",
    title: "A $40M 0→1 product.",
    href: "/work/xai-launch",
    baseGradient:
      "linear-gradient(in oklab 132deg, oklab(66.5% -0.007 -0.138) 0%, oklab(46.4% 0.005 -0.168) 28%, oklab(45% 0.103 -0.142) 58%, oklab(27.6% 0.038 -0.102) 82%, oklab(18.3% 0.014 -0.069) 100%)",
    blobA:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(85.5% -0.062 -0.068 / 55%) 0%, oklab(85.5% -0.062 -0.068 / 0%) 72%)",
    blobB:
      "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(61.2% 0.204 -0.072 / 50%) 0%, oklab(61.2% 0.204 -0.072 / 0%) 70%)",
    // Neon violet — saturated, electric
    useMeshGradient: true,
    meshColors: [
      "#000005", // pure black
      "#180578", // deep saturated indigo
      "#4a0bff", // saturated electric violet
      "#7a2cff", // neon violet
      "#a060ff", // bright violet
      "#d8baff", // pale violet highlight
    ],
    meshOffsetX: -0.2,
    meshOffsetY: -0.4,
    meshRotation: 230,
  },
];

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="mx-auto w-full max-w-[1024px] px-6 py-28"
    >
      <h2 className="text-2xl font-normal leading-[30px] tracking-tight text-zinc-50">
        Case studies
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-2 [perspective:1200px]">
        {CASE_STUDIES.map((cs) => (
          <CaseStudyCard key={cs.href} {...cs} />
        ))}
      </div>
    </section>
  );
}
