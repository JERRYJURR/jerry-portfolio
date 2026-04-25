import Image from "next/image";
import { HeroActions } from "@/components/hero-actions";
import siteConfig from "../../site.config.json";

const BOOKING_URL = "https://calendar.app.google/X57gyeciuexR1UR28";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-[1024px] px-6 pt-32 pb-24">
        <div className="flex max-w-[512px] flex-col gap-10">
          {/* Avatar */}
          <div className="h-24 w-24 overflow-hidden rounded-full">
            <Image
              src="/retouched.webp"
              alt="Jerry Kou"
              width={192}
              height={192}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Heading + body */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium leading-[1.15] tracking-tight md:text-[2.25rem]">
              AI-native product designer. I design, code, and ship scalable
              products.
            </h1>
            <p className="text-base leading-[1.5] text-muted-foreground">
              5+ years of experience in projects that generated $40M+ in
              revenue and reached 180k+ daily concurrent users.
            </p>
          </div>

          {/* CTAs */}
          <HeroActions email={siteConfig.email} bookingUrl={BOOKING_URL} />

          {/* Achievements */}
          <div className="flex flex-row items-start gap-10 pt-2">
            <Badge title="No. 1" caption="Google Play Canada" />
            <Badge title="Top 20" caption="App Store Canada" />
          </div>
        </div>
      </section>
    </main>
  );
}

function Badge({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-row items-center gap-2">
        <Wreath />
        <span className="text-xl font-medium tracking-tight">{title}</span>
        <Wreath flipped />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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
