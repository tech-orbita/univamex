import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Program } from "@/types/content";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function ProgramCard({ program }: { program: Program }) {
  const galleryImage = `/images/program-thumbnails/${program.slug}.webp`;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-[#1E40AF]/45 hover:shadow-xl hover:shadow-[#04215e]/10 focus-within:-translate-y-1 focus-within:border-[#1E40AF]/55 focus-within:shadow-xl"
      data-program-gallery-card
    >
      <Link
        aria-label={`Ver programa: ${program.name}`}
        className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#1E40AF]"
        href={`/programas/${program.slug}`}
      >
        <span className="sr-only">Ver programa: {program.name}</span>
      </Link>

      <div className="relative aspect-[4/3] overflow-hidden bg-[#04215e]">
        <Image
          src={galleryImage}
          alt={`Ilustración de ${program.shortName} para la galería de oferta académica`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.24),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#e7a928] transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[#1E40AF]">
            {program.level}
          </span>
          <span className="rounded-md bg-[#FEF3C7] px-2.5 py-1 text-[#92400E]">
            {program.modality}
          </span>
        </div>
        <h3 className="mt-3 font-editorial text-lg font-semibold leading-6 text-[#04215e] transition-colors group-hover:text-[#1e40af] group-focus-within:text-[#1e40af] sm:mt-4 sm:text-xl sm:leading-7">
          {program.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 sm:mt-3 sm:line-clamp-3 sm:leading-6">
          {program.description}
        </p>
        <dl className="mt-3 grid gap-1.5 text-sm leading-5 text-slate-700 sm:mt-5 sm:gap-2">
          <div className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-[#1E40AF]"
            />
            <div>
              <dt className="sr-only">Duración</dt>
              <dd>{program.duration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 text-[#1E40AF]"
            />
            <div>
              <dt className="sr-only">RVOE</dt>
              <dd>
                RVOE {program.rvoe}
                {program.rvoeStatus === "review" ? (
                  <span className="font-semibold text-[#B45309]">
                    {" "}
                    por confirmar
                  </span>
                ) : null}
              </dd>
            </div>
          </div>
        </dl>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:gap-3">
          <span className="inline-flex min-h-11 items-center justify-center gap-1 border border-[#CBD5E1] px-2 py-2 text-sm font-semibold text-[#1E3A8A] transition-colors group-hover:border-[#1E40AF] group-hover:bg-[#EFF6FF] group-focus-within:border-[#1E40AF] group-focus-within:bg-[#EFF6FF] sm:gap-2 sm:px-4 sm:py-3">
            Ver programa
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5"
            />
          </span>
          <div className="relative z-20">
            <WhatsAppButton
              className="h-full w-full px-2 sm:px-4"
              label="Informes"
              program={program.name}
            />
          </div>
        </div>
      </div>
    </article>
  );
}



