import Image from "next/image";
import type { ReactNode } from "react";
import { PageHeroMotionShell } from "@/components/site-motion-shell";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageClassName?: string;
  eyebrow?: string;
  actions?: ReactNode;
  immersive?: boolean;
};

export function PageHero({
  title,
  description,
  image,
  imageFit = "cover",
  imageClassName,
  eyebrow,
  actions,
  immersive = false,
}: PageHeroProps) {
  return (
    <PageHeroMotionShell>
      <section
        className={cn(
          "relative isolate overflow-hidden bg-[#04215e] text-white",
          immersive
            ? "min-h-[38rem] sm:min-h-[48rem] lg:min-h-[50rem]"
            : "min-h-[22rem] sm:min-h-[30rem] lg:min-h-[34rem]",
        )}
        data-page-hero-section
      >
        <div className="absolute inset-0" data-page-hero-image>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn(
              imageFit === "contain" ? "object-contain" : "object-cover",
              "saturate-[1.02]",
              imageClassName,
            )}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.96)_0%,rgba(4,33,94,0.9)_52%,rgba(4,33,94,0.58)_78%,rgba(4,33,94,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.78)_38%,rgba(4,33,94,0.36)_66%,rgba(4,33,94,0)_100%)]" />

        <div
          className={cn(
            "relative z-10 flex items-center px-4 sm:px-8 lg:px-10",
            immersive
              ? "min-h-[38rem] pb-16 pt-[6.75rem] sm:min-h-[48rem] sm:pb-28 sm:pt-[9rem] lg:min-h-[50rem]"
              : "min-h-[22rem] pb-10 pt-8 sm:min-h-[30rem] sm:pb-16 sm:pt-12 lg:min-h-[34rem]",
          )}
        >
          <div className="mx-auto w-full max-w-7xl">
            <div
              className="max-w-[21rem] drop-shadow-[0_2px_14px_rgba(2,24,63,0.72)] sm:max-w-3xl"
              data-page-hero-copy
            >
              {eyebrow ? (
                <p className="mb-2 text-xs font-bold text-[#e7a928] sm:mb-4 sm:text-sm">{eyebrow}</p>
              ) : null}
              <h1 className={cn(
                "font-semibold leading-[0.96] tracking-[-0.025em] text-balance [font-family:var(--font-hero)]",
                immersive
                  ? "max-w-[12ch] text-[clamp(2.15rem,9vw,3.25rem)] sm:text-[clamp(4rem,6.4vw,5.5rem)]"
                  : "text-[clamp(2.05rem,9vw,4.8rem)]",
              )}>
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-normal leading-6 text-white/90 sm:mt-5 sm:text-lg sm:leading-8">
                {description}
              </p>
              {actions}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-9 bg-[#F8FAFC] [clip-path:polygon(0_72%,100%_36%,100%_100%,0_100%)] sm:h-16"
        />
      </section>
    </PageHeroMotionShell>
  );
}
