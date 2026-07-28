import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { institutionalSummary } from "@/data/institutional";

export function HomeInstitutional() {
  return (
    <section className="bg-[#f8fafc] px-4 py-10 text-[#071a3d] sm:px-6 sm:py-14 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-slate-200 bg-white lg:grid-cols-[0.78fr_1.22fr]">
        <div
          className="relative min-h-[16rem] overflow-hidden bg-slate-200 sm:min-h-[20rem] lg:min-h-[31rem]"
          data-motion-media
          data-motion-parallax-section
        >
          <div className="absolute inset-0" data-motion-parallax>
            <Image
              src="/images/VIDA-UNIVERSITARIA.png"
              alt="Comunidad UNIVAMEX durante una actividad de vida universitaria"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.52),transparent_58%)]" />
          </div>
        </div>

        <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-12" data-motion="rise">
          <p className="text-sm font-bold text-[#b45309]">
            {institutionalSummary.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
            {institutionalSummary.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {institutionalSummary.description}
          </p>

          <dl
            className="mt-5 grid grid-cols-3 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:mt-8"
            data-motion-group
          >
            {institutionalSummary.facts.map((fact) => (
              <div className="bg-[#f8fafc] p-3 sm:p-5" data-motion-item key={fact.value}>
                <dt className="font-heading text-lg font-semibold text-[#04215e] sm:text-2xl">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-xs leading-4 text-slate-600 sm:text-sm sm:leading-5">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            className="mt-5 inline-flex min-h-11 w-fit items-center gap-3 border-b border-[#04215e] text-sm font-bold text-[#04215e] transition hover:border-[#e7a928] sm:mt-8 sm:min-h-12"
            href="/quienes-somos"
          >
            Conocer nuestra historia
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
