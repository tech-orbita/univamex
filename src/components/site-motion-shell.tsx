"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type SiteMotionShellProps = {
  children: ReactNode;
  className?: string;
};

type PageHeroMotionShellProps = {
  children: ReactNode;
};

const motionTargets = [
  "[data-motion]",
  "[data-motion-item]",
  "[data-motion-media]",
  "[data-motion-parallax]",
  "[data-motion-hero-media]",
  "[data-motion-hero-copy]",
].join(", ");

function directMotionItems(group: HTMLElement) {
  return Array.from(group.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.hasAttribute("data-motion-item"),
  );
}

export function SiteMotionShell({ children, className }: SiteMotionShellProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.querySelectorAll<HTMLElement>(motionTargets), {
          clearProps: "all",
        });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(root.querySelectorAll("[data-motion]"))
          .forEach((element) => {
            const mode = element.dataset.motion;
            const from =
              mode === "fade"
                ? { autoAlpha: 1, y: 12 }
                : mode === "clip"
                  ? {
                      autoAlpha: 1,
                      scale: 0.985,
                      y: 18,
                    }
                  : { autoAlpha: 1, y: 24 };

            gsap.fromTo(element, from, {
              autoAlpha: 1,
              duration: 0.58,
              ease: "power3.out",
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
          .toArray<HTMLElement>(root.querySelectorAll("[data-motion-group]"))
          .forEach((group) => {
            const items = directMotionItems(group);
            if (!items.length) return;

            gsap.fromTo(
              items,
              { autoAlpha: 1, y: 18 },
              {
                autoAlpha: 1,
                duration: 0.5,
                ease: "power3.out",
                stagger: 0.055,
                scrollTrigger: {
                  trigger: group,
                  start: "top 92%",
                  once: true,
                },
                y: 0,
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>(root.querySelectorAll("[data-motion-media]"))
          .forEach((element) => {
            gsap.fromTo(
              element,
              {
                autoAlpha: 1,
                scale: 0.975,
                y: 12,
              },
              {
                autoAlpha: 1,
                duration: 0.65,
                ease: "power3.out",
                scale: 1,
                scrollTrigger: {
                  trigger: element,
                  start: "top 92%",
                  once: true,
                },
                y: 0,
              },
            );
          });

        const homeHeroMedia = root.querySelector<HTMLElement>(
          "[data-motion-hero-media]",
        );
        const homeHeroCopy = root.querySelector<HTMLElement>(
          "[data-motion-hero-copy]",
        );
        const homeHeroSection = root.querySelector<HTMLElement>(
          "[data-motion-hero-section]",
        );

        if (homeHeroSection && homeHeroMedia) {
          gsap.to(homeHeroMedia, {
            ease: "none",
            scale: 1.06,
            scrollTrigger: {
              trigger: homeHeroSection,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
            yPercent: 4,
          });
        }

        if (homeHeroSection && homeHeroCopy) {
          gsap.to(homeHeroCopy, {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: homeHeroSection,
              start: "top top",
              end: "70% top",
              scrub: 0.7,
            },
            yPercent: -8,
          });
        }
      });

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>(root.querySelectorAll("[data-motion-parallax]"))
            .forEach((element) => {
              const trigger =
                element.closest<HTMLElement>("[data-motion-parallax-section]") ??
                element.parentElement;

              if (!trigger) return;

              gsap.fromTo(
                element,
                { scale: 1.035, yPercent: -2.5 },
                {
                  ease: "none",
                  scale: 1.055,
                  scrollTrigger: {
                    trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.75,
                  },
                  yPercent: 2.5,
                },
              );
            });
        },
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <main className={cn("w-full max-w-full overflow-x-clip", className)} ref={rootRef}>
      {children}
    </main>
  );
}

export function PageHeroMotionShell({ children }: PageHeroMotionShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const image = root.querySelector<HTMLElement>("[data-page-hero-image]");
      const copy = root.querySelector<HTMLElement>("[data-page-hero-copy]");
      const section = root.querySelector<HTMLElement>("[data-page-hero-section]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([image, copy].filter(Boolean), { clearProps: "all" });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTweens: gsap.core.Tween[] = [];
        const setupScrollMotion = () => {
          if (section && image) {
            scrollTweens.push(
              gsap.fromTo(
                image,
                { scale: 1, yPercent: 0 },
                {
                  ease: "none",
                  immediateRender: false,
                  scale: 1.035,
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.75,
                  },
                  yPercent: 3,
                },
              ),
            );
          }

          if (section && copy) {
            scrollTweens.push(
              gsap.fromTo(
                copy,
                { autoAlpha: 1, yPercent: 0 },
                {
                  autoAlpha: 1,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "70% top",
                    scrub: 0.65,
                  },
                  yPercent: -7,
                },
              ),
            );
          }

          requestAnimationFrame(() => ScrollTrigger.refresh());
        };

        const intro = gsap.timeline({ onComplete: setupScrollMotion });

        if (image) {
          intro.fromTo(
            image,
            { autoAlpha: 1, scale: 1.035 },
            { autoAlpha: 1, duration: 0.85, ease: "power3.out", scale: 1 },
            0,
          );
        }

        if (copy) {
          intro.fromTo(
            copy,
            { autoAlpha: 1, y: 18 },
            { autoAlpha: 1, duration: 0.58, ease: "power3.out", y: 0 },
            0,
          );
        }

        if (!image && !copy) setupScrollMotion();

        return () => {
          scrollTweens.forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
        };
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
