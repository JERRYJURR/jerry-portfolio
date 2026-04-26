"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy, Download, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar";

type FooterProps = {
  email: string;
  bookingUrl: string;
  resumeUrl: string;
  linkedinUrl: string;
  location: string;
};

export function Footer({
  email,
  bookingUrl,
  resumeUrl,
  linkedinUrl,
  location,
}: FooterProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API failed; leave UI in default state
    }
  }, [email]);

  const safeResumeUrl =
    resumeUrl.startsWith("http") || resumeUrl.startsWith("/")
      ? resumeUrl
      : "#";

  const year = new Date().getFullYear();

  // Derive LinkedIn handle for display ("Jerry Kou" pulled from /in/<slug>)
  const linkedinHandle = "Jerry Kou";

  return (
    <footer className="border-t border-white/[0.05] pt-20 pb-6">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-20 px-6">
        {/* Top — left half holds identity, copy, CTAs, contact list */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-12">
            {/* Identity + copy + CTAs */}
            <div className="flex flex-col gap-6">
              <div className="mb-2 flex flex-row items-center gap-4">
                <Avatar className="size-12" sizes="48px" alt="Jerry Kou" />
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-normal leading-[30px] tracking-tight text-zinc-50">
                    Jerry Kou
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
                    Senior Product Designer
                  </p>
                </div>
              </div>
              <p className="text-base leading-[1.5] text-zinc-50/[0.66]">
                I&apos;m currently figuring out how to make designing with
                prompts as easy and smooth as designing with a pencil or mouse.
              </p>
              <p className="text-base leading-[1.5] text-zinc-50/[0.66]">
                Want to collaborate? Let&apos;s build something together.
              </p>

              {/* CTAs — large variant matching the hero buttons */}
              <div className="flex flex-row gap-2">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group relative overflow-hidden
                    inline-flex h-10 items-center gap-1 rounded-[12px] px-[14px]
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
                  <span className="relative inline-flex items-center gap-2">
                    Book a call
                    <ArrowRight
                      className="
                        size-4 transition-transform duration-[160ms] ease-out
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </a>

                <a
                  href={safeResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group relative
                    inline-flex h-10 items-center gap-2 rounded-[12px] px-[14px]
                    border border-white/10
                    bg-gradient-to-b from-white/[0.05] to-white/[0.025]
                    text-sm font-medium text-zinc-50
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
                      size-4 opacity-[0.33] transition-opacity
                      duration-[160ms] ease-out group-hover:opacity-70
                    "
                  />
                </a>
              </div>
            </div>

            {/* Contact list */}
            <ul className="flex flex-col">
              <li className="flex items-center justify-between gap-2 border-b border-white/[0.05] py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
                  Location
                </span>
                <span className="inline-flex items-center gap-2 text-base text-zinc-50/[0.66]">
                  <CanadianFlag />
                  {location}
                </span>
              </li>

              <li className="border-b border-white/[0.05]">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="
                    group flex w-full items-center justify-between gap-2 py-3
                    transition-colors duration-150 ease-out
                    hover:text-zinc-50
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-offset-2
                    focus-visible:ring-offset-background rounded-sm
                  "
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
                    Email
                  </span>
                  <span
                    className={`relative inline-flex items-center gap-2 text-base transition-colors duration-200 ease-out ${
                      copied ? "text-accent" : "text-zinc-50/[0.66] group-hover:text-zinc-50"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center gap-2 transition-opacity duration-[240ms] ease-out ${
                        copied ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      Click to copy
                      <Copy
                        className="size-4 opacity-[0.33] transition-opacity duration-[160ms] ease-out group-hover:opacity-70"
                        aria-hidden
                      />
                    </span>
                    <span
                      aria-hidden={!copied}
                      className={`absolute inset-0 inline-flex items-center justify-end gap-2 transition-opacity duration-[240ms] ease-out ${
                        copied ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Copied
                      <Check className="size-4" strokeWidth={2.25} />
                    </span>
                    <span role="status" aria-live="polite" className="sr-only">
                      {copied ? "Email copied to clipboard" : ""}
                    </span>
                  </span>
                </button>
              </li>

              <li className="flex items-center justify-between gap-2 border-b border-white/[0.05] py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
                  LinkedIn
                </span>
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group inline-flex items-center gap-2 text-base text-zinc-50/[0.66]
                    transition-colors duration-150 ease-out
                    hover:text-zinc-50
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-white focus-visible:ring-offset-2
                    focus-visible:ring-offset-background rounded-sm
                  "
                >
                  {linkedinHandle}
                  <ExternalLink
                    className="size-4 opacity-[0.33] transition-opacity duration-[160ms] ease-out group-hover:opacity-70"
                    aria-hidden
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom — copyright + credits */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
            © {year} Jerry Kou. All rights reserved.
          </p>
          <div className="flex flex-row items-center gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
              <CreditIcon
                src="/icons/paper.png"
                alt=""
                tone="light"
              />
              Designed in Paper
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-50/[0.66]">
              <CreditIcon src="/icons/claude.png" alt="" tone="dark" />
              Built with Claude Code
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CreditIcon({
  src,
  alt,
  tone,
}: {
  src: string;
  alt: string;
  tone: "light" | "dark";
}) {
  return (
    <span className="relative inline-block size-4 shrink-0 rounded-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      <span className="absolute inset-0 overflow-hidden rounded-[4px]">
        <Image src={src} alt={alt} fill sizes="16px" className="object-cover" />
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[4px] ${
          tone === "light"
            ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.10),inset_0_-1px_0_rgba(0,0,0,0.06)]"
            : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]"
        }`}
      />
    </span>
  );
}

function CanadianFlag() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      aria-hidden
      className="shrink-0"
    >
      <path fill="#FFFFFF" d="M8 4h16v24H8z" />
      <path
        fill="#C53A28"
        d="M5 4h4v24H5c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4Z"
      />
      <path
        fill="#C53A28"
        d="M27 4h-4v24h4c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4Z"
      />
      <path
        fill="#C53A28"
        d="M16.275 22.167l-.138-2.641c-.007-.16.117-.296.277-.304.021 0 .042 0 .063.004l2.629.462-.355-.979c-.03-.08-.005-.17.061-.223l2.88-2.332-.649-.303c-.091-.043-.135-.146-.104-.242l.569-1.751-1.659.352c-.093.019-.186-.029-.223-.116l-.321-.756-1.295 1.389c-.076.08-.201.083-.281.007-.049-.047-.071-.115-.058-.182l.624-3.22-1.001.578c-.095.056-.217.024-.272-.071-.002-.004-.004-.008-.006-.012l-1.016-1.995-1.016 1.995c-.049.098-.169.138-.267.089-.004-.002-.008-.004-.012-.006l-1.001-.578.624 3.22c.021.108-.05.212-.158.233-.067.013-.135-.009-.182-.058l-1.295-1.389-.321.756c-.037.087-.131.136-.223.116l-1.659-.352.569 1.751c.031.095-.013.199-.104.242l-.649.303 2.88 2.332c.066.054.091.144.061.223l-.355.979 2.629-.462c.158-.027.309.079.336.237.004.021.005.042.004.063l-.138 2.641h.551Z"
      />
      <path
        fill="rgba(0,0,0,0.15)"
        d="M27 4H5C2.79 4 1 5.79 1 8v16c0 2.21 1.79 4 4 4h22c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4Zm3 20c0 1.65-1.35 3-3 3H5c-1.65 0-3-1.35-3-3V8c0-1.65 1.35-3 3-3h22c1.65 0 3 1.35 3 3v16Z"
      />
    </svg>
  );
}
