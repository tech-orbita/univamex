import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { campuses } from "@/data/campuses";

export function HomeCampusPreview() {
  return (
    <section
      aria-labelledby="home-campus-title"
      className="bg-[#f3f6fb] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-motion="rise"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#b45309]">Campus</p>
            <h2
              className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl"
              id="home-campus-title"
            >
              Estudia en Ecatepec
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-7">
              Ubica las sedes, revisa sus instalaciones y abre una ruta antes de
              planear tu visita.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-2 border border-[#04215e] px-5 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
            href="/campus"
          >
            Ver campus
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-2"
          data-motion-group
        >
          {campuses.map((campus) => (
            <article
              className="group flex h-full min-w-0 flex-col overflow-hidden border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:border-[#e7a928] hover:shadow-2xl hover:shadow-slate-950/10 focus-within:-translate-y-1 focus-within:border-[#e7a928] focus-within:shadow-2xl focus-within:shadow-slate-950/10"
              data-motion-item
              key={campus.name}
            >
              <div className="aspect-video overflow-hidden bg-slate-200">
                <Image
                  src={campus.image}
                  alt={campus.imageAlt}
                  width={campus.imageWidth}
                  height={campus.imageHeight}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-within:scale-[1.035]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-editorial text-xl font-semibold leading-snug text-[#04215e] sm:text-2xl">
                  {campus.name}
                </h3>
                <p className="mt-2 flex gap-2 text-sm leading-5 text-slate-600 sm:mt-3 sm:leading-6">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-[#1e40af]"
                  />
                  <span>{campus.address}</span>
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:flex sm:gap-3 sm:pt-6">
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#04215e] px-4 text-sm font-bold text-white transition duration-300 hover:bg-[#0b327f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
                    href="/campus"
                  >
                    Ver campus
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-4 text-sm font-bold text-[#04215e] transition duration-300 hover:border-[#04215e] hover:bg-[#eff6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
                    href={campus.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir mapa
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-4 flex flex-col gap-3 border-l-4 border-[#e7a928] bg-white p-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
          data-motion="rise"
        >
          <p className="text-sm leading-6 text-slate-600">
            También puedes recorrer virtualmente la explanada y las canchas del
            Campus Ciudad Azteca.
          </p>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#04215e]"
            href="/campus#recorrido-360"
          >
            Abrir recorrido 360
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
