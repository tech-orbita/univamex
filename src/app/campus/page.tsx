import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { FinalContactCta } from "@/components/final-contact-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteMotionShell } from "@/components/site-motion-shell";
import { VirtualTour } from "@/components/virtual-tour";
import { campusContact, campuses } from "@/data/campuses";

type CampusPageProps = {
  searchParams: Promise<{
    vista?: string;
  }>;
};

type InstallationGalleryItem = {
  image: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  uniformLandscapeFrame?: boolean;
  cropToLandscape?: boolean;
};

const installationGallery: readonly InstallationGalleryItem[] = [
  {
    image: "/images/CAMPUS CIUDAD AZTECA.png",
    uniformLandscapeFrame: true,
    width: 2736,
    height: 1536,
    alt: "Fachada del Campus Ciudad Azteca de UNIVAMEX",
    title: "Fachada del Campus Ciudad Azteca",
  },
  {
    image: "/images/instalaciones1.jpg",
    uniformLandscapeFrame: true,
    width: 1040,
    height: 584,
    alt: "Vista exterior del Campus Ciudad Azteca de UNIVAMEX",
    title: "Campus Ciudad Azteca",
  },
  {
    image: "/images/instalaciones2.jpg",
    uniformLandscapeFrame: true,
    cropToLandscape: true,
    width: 960,
    height: 720,
    alt: "Sala de espera y jardín interior de UNIVAMEX",
    title: "Sala de espera y jardín interior",
  },
  {
    image: "/images/instalaciones3.jpg",
    width: 960,
    height: 720,
    alt: "Espacio de atención administrativa de UNIVAMEX",
    title: "Atención administrativa",
  },
  {
    image: "/images/instalaciones4.jpg",
    width: 960,
    height: 720,
    alt: "Pasillo y fuente interior en UNIVAMEX",
    title: "Áreas de circulación y convivencia",
  },
  {
    image: "/images/instalaciones5.jpg",
    width: 960,
    height: 720,
    alt: "Recepción de UNIVAMEX",
    title: "Recepción",
  },
  {
    image: "/images/instalaciones6.jpg",
    width: 960,
    height: 720,
    alt: "Centro de servicios administrativos de UNIVAMEX",
    title: "Servicios administrativos",
  },
  {
    image: "/images/laboratorios.jpg",
    width: 960,
    height: 720,
    alt: "Laboratorio académico de UNIVAMEX",
    title: "Laboratorio académico",
  },
  {
    image: "/images/gimasio.jpg",
    width: 960,
    height: 720,
    alt: "Gimnasio de UNIVAMEX",
    title: "Gimnasio",
  },
];

export const metadata: Metadata = {
  title: "Campus UNIVAMEX en Ecatepec",
  description:
    "Conoce Campus Ciudad Azteca y Campus Las Américas de UNIVAMEX: instalaciones, direcciones, mapas, rutas y recorrido virtual 360.",
  alternates: { canonical: "/campus" },
};

export default async function CampusPage({ searchParams }: CampusPageProps) {
  const { vista } = await searchParams;

  return (
    <SiteMotionShell>
      <PageHero
        title="Campus"
        description="Conoce nuestras sedes, ubica cada campus y revisa los espacios disponibles antes de planear tu visita."
        image="/images/CAMPUS CIUDAD AZTECA.png"
      />

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div data-motion="rise">
            <SectionHeading
              title="Dos sedes en Ecatepec"
              description="Revisa la dirección, las referencias y los espacios generales de cada sede para preparar tu visita."
            />
          </div>

          <div
            className="mt-5 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2"
            data-motion-group
          >
            {campuses.map((campus) => (
              <div className="h-full min-w-0" data-motion-item key={campus.name}>
                <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:border-[#e7a928] hover:shadow-2xl hover:shadow-slate-950/10 focus-within:-translate-y-1 focus-within:border-[#e7a928] focus-within:shadow-2xl focus-within:shadow-slate-950/10">
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
                <div className="flex flex-1 flex-col p-4 sm:p-7">
                  <p className="text-xs font-bold text-[#b45309]">
                    {campus.shortName}
                  </p>
                  <h2 className="mt-2 font-editorial text-2xl font-semibold leading-snug text-[#071a3d]">
                    {campus.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {campus.reference}
                  </p>
                  <p className="mt-4 flex gap-2 text-sm leading-6 text-slate-700">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1e40af]"
                    />
                    <span>{campus.address}</span>
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {campus.highlights.map((item) => (
                      <li
                        className="border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-slate-700"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 border border-[#cbd5e1] px-4 text-sm font-bold text-[#1e3a8a] transition hover:border-[#04215e] hover:bg-[#eff6ff]"
                    href={campus.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir mapa
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
                </article>
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex flex-col gap-3 border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-900/5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            data-motion="rise"
          >
            <div className="flex gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#1e40af]"
              />
              <p>Informes: {campusContact.phone}</p>
            </div>
            <Link
              className="inline-flex min-h-11 items-center justify-center border border-[#04215e] px-4 font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
              href="/contacto"
            >
              Contactar admisiones
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div data-motion="rise">
            <SectionHeading
              title="Espacios del campus"
              description="Fotografías de los espacios académicos, de atención y convivencia de UNIVAMEX. La primera fila comparte un formato horizontal para conservar una composición uniforme."
            />
          </div>
          <div
            className="mt-5 grid grid-cols-2 items-start gap-2 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
            data-motion-group
          >
            {installationGallery.map((item) => (
              <div className="min-w-0" data-motion-item key={item.image}>
                <figure className="group relative overflow-hidden border border-slate-200 bg-[#F8FAFC] shadow-sm shadow-slate-900/5 transition duration-500 ease-out will-change-transform hover:z-10 hover:-translate-y-1 hover:scale-[1.045] hover:border-[#e7a928] hover:shadow-2xl hover:shadow-slate-950/15">
                  <div
                    className={
                      item.uniformLandscapeFrame
                        ? "aspect-video overflow-hidden bg-slate-200"
                        : "overflow-hidden bg-slate-200"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={
                        item.cropToLandscape
                          ? "h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          : item.uniformLandscapeFrame
                            ? "h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          : "h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      }
                    />
                  </div>
                  <figcaption className="p-4 font-editorial text-lg font-semibold leading-snug text-[#071a3d]">
                    {item.title}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div data-motion="rise">
            <SectionHeading
              title="Mapas y rutas para llegar"
              description="Abre la ubicación de cada sede o inicia una ruta en Google Maps desde tres puntos de referencia de Ecatepec. El trayecto se calcula al momento de abrirlo."
            />
          </div>

          <div
            className="mt-5 grid items-start gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2"
            data-motion-group
          >
            {campuses.map((campus) => (
              <article
                className="group overflow-hidden border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:border-[#e7a928] hover:shadow-2xl hover:shadow-slate-950/10 focus-within:-translate-y-1 focus-within:border-[#e7a928] focus-within:shadow-2xl focus-within:shadow-slate-950/10"
                data-motion-item
                key={campus.name}
              >
                <iframe
                  title={`Mapa de ${campus.name}`}
                  src={campus.mapEmbedUrl}
                  className="aspect-[16/10] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="p-4 sm:p-6">
                  <h2 className="font-editorial text-2xl font-semibold text-[#04215e]">
                    {campus.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {campus.address}
                  </p>
                  <div className="mt-5 grid gap-2">
                    {campus.routes.map((route) => (
                      <Link
                        className="inline-flex min-h-11 items-center justify-between gap-3 border border-slate-200 px-4 py-2 text-sm font-bold text-[#1e3a8a] transition hover:border-[#04215e] hover:bg-[#eff6ff]"
                        href={route.url}
                        key={route.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {route.label}
                        <Navigation aria-hidden="true" className="h-4 w-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
        id="recorrido-360"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl" data-motion="rise">
            <p className="text-sm font-bold text-[#b45309]">Recorrido virtual</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] tracking-normal text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[0.98] lg:text-5xl">
              Explora el campus en 360
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Revisa vistas de la explanada y canchas desde el navegador antes
              de planear tu visita.
            </p>
          </div>

          <div data-motion-media>
            <VirtualTour initialSceneId={vista} />
          </div>
        </div>
      </section>

      <FinalContactCta />
    </SiteMotionShell>
  );
}
