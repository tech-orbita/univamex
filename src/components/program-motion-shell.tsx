"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type ProgramMotionShellProps = {
  children: ReactNode;
};

type ScrollTextRevealProps = {
  className?: string;
  text: string;
};

type ProgramMarqueeProps = {
  items: string[];
};

export function ProgramMotionShell({ children }: ProgramMotionShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          root.querySelectorAll<HTMLElement>(
            "[data-reveal], [data-reveal-item], [data-hero-image]",
          ),
          { clearProps: "all" },
        );
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-reveal]"),
        );

        reveals.forEach((element) => {
          const mode = element.dataset.reveal;
          const from =
            mode === "clip"
              ? { opacity: 1, scale: 0.985, y: 22 }
              : mode === "fade"
                ? { opacity: 1, y: 12 }
                : { opacity: 1, y: 30 };

          gsap.fromTo(element, from, {
            duration: 0.58,
            ease: "power3.out",
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 94%",
              once: true,
            },
            y: 0,
          });
        });

        gsap.utils
          .toArray<HTMLElement>(root.querySelectorAll("[data-reveal-group]"))
          .forEach((group) => {
            const items = group.querySelectorAll<HTMLElement>(
              "[data-reveal-item]",
            );
            if (!items.length) return;

            gsap.fromTo(
              items,
              { opacity: 1, y: 20 },
              {
                duration: 0.5,
                ease: "power3.out",
                opacity: 1,
                stagger: 0.06,
                scrollTrigger: {
                  trigger: group,
                  start: "top 92%",
                  once: true,
                },
                y: 0,
              },
            );
          });

        const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
        if (heroImage) {
          gsap.fromTo(
            heroImage,
            { opacity: 1, scale: 1.04 },
            {
              ease: "none",
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: heroImage.closest("section"),
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }

        const heroCopy = root.querySelector<HTMLElement>("[data-hero-copy]");
        if (heroCopy) {
          gsap.to(heroCopy, {
            ease: "none",
            opacity: 1,
            scrollTrigger: {
              trigger: heroCopy.closest("section"),
              start: "top top",
              end: "65% top",
              scrub: 0.7,
            },
            yPercent: -9,
          });
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}

export function ScrollTextReveal({ className, text }: ScrollTextRevealProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const wordElements = root.querySelectorAll<HTMLElement>("[data-word]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(wordElements, { opacity: 1 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          wordElements,
          { opacity: 0.14, y: 6 },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.04,
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              end: "bottom 54%",
              scrub: 0.65,
            },
            y: 0,
          },
        );
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <p aria-label={text} className={className} ref={rootRef}>
      {words.map((word, index) => (
        <span aria-hidden="true" className="inline-block" data-word key={`${word}-${index}`}>
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </p>
  );
}

export function ProgramMarquee({ items }: ProgramMarqueeProps) {
  const repeatedItems = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-[#04215e]/12 bg-white"
    >
      <div className="program-marquee-track flex min-w-max items-center py-3">
        {repeatedItems.map((item, index) => (
          <span
            className="flex items-center text-xs font-bold uppercase tracking-[0.16em] text-[#04215e]/70"
            key={`${item}-${index}`}
          >
            <span className="mx-7 h-1.5 w-1.5 bg-[#e7a928]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
