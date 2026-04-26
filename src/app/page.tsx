import Image from "next/image";
import { Avatar } from "@/components/avatar";
import { CaseStudies } from "@/components/case-studies";
import { Experience } from "@/components/experience";
import { HeroActions } from "@/components/hero-actions";
import { Skills } from "@/components/skills";
import { Tools } from "@/components/tools";
import siteConfig from "../../site.config.json";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-[1024px] px-6 pt-32 pb-28">
        <div className="flex max-w-[512px] flex-col gap-12">
          {/* Avatar */}
          <Avatar
            className="size-24"
            sizes="96px"
            priority
            alt="Jerry Kou"
          />

          {/* Heading + body + CTAs */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[2rem] font-medium leading-[1.15] tracking-tight">
              AI-native product designer. I design, code, and ship scalable
              products.
            </h1>
            <p className="text-base leading-[1.5] text-muted-foreground">
              5+ years of experience in projects that generated $40M+ in
              revenue and reached 180k+ daily concurrent users.
            </p>
            <HeroActions
              email={siteConfig.email}
              bookingUrl={siteConfig.bookingUrl}
            />
          </div>

          {/* Achievements */}
          <div className="flex flex-row items-start gap-10 pt-2">
            <Badge title="No. 1" caption="Google Play Canada" />
            <Badge title="Top 20" caption="App Store Canada" />
          </div>
        </div>
      </section>

      <CaseStudies />
      <Experience />
      <Skills />
      <Tools />
    </main>
  );
}

function Badge({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-row items-center gap-3">
        <Wreath />
        <span className="text-xl font-medium tracking-tight">{title}</span>
        <Wreath flipped />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {caption}
      </span>
    </div>
  );
}

function Wreath({ flipped = false }: { flipped?: boolean }) {
  return (
    <Image
      src="/wreath.svg"
      alt=""
      width={19}
      height={32}
      className="h-8 w-[19px] flex-shrink-0"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    />
  );
}
