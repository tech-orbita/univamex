import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { GuidedWhatsAppForm } from "@/components/guided-whatsapp-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SiteMotionShell } from "@/components/site-motion-shell";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig, socialLinks } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto y campus UNIVAMEX Ecatepec",
  description:
    "Contacta admisiones UNIVAMEX en Ecatepec por teléfono, WhatsApp o correo. Consulta horarios y ubicación de Ciudad Azteca y Las Américas.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const contactShortcuts = [
    {
      label: "WhatsApp",
      value: siteConfig.whatsappDisplay,
      description: "Inicia una conversación con admisiones.",
      href: buildWhatsAppUrl({ source: "Atajo de contacto" }),
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Llamar",
      value: siteConfig.phone,
      description: "Comunícate directamente con nuestro equipo.",
      href: `tel:${siteConfig.phone.replaceAll("-", "")}`,
      icon: Phone,
      external: false,
    },
    {
      label: "Correo",
      value: siteConfig.email,
      description: "Envíanos tus datos o una consulta detallada.",
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "Visitar campus",
      value: "Consulta sedes y mapas",
      description: "Ubica Ciudad Azteca y Las Américas.",
      href: "/campus",
      icon: MapPin,
      external: false,
    },
  ] as const;

  return (
    <SiteMotionShell>
      <PageHero
        title="Contacto"
        description="Confirma inscripciones, horarios, grupos y ubicación con el equipo de UNIVAMEX."
        image="/images/UNIVAMEX5.png"
        imageClassName="object-[50%_center]"
      />

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-motion="rise">
            <p className="text-sm font-bold text-[#b45309]">
              Admisiones UNIVAMEX
            </p>
            <h2 className="mt-3 max-w-xl font-heading text-[2rem] font-semibold leading-[1.02] text-[#04215e] sm:text-4xl lg:text-[2.8rem]">
              Habla con nosotros por el canal que prefieras
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Confirma horarios, grupos disponibles o requisitos de inscripción
              con un asesor.
            </p>

            <div className="mt-6">
              <WhatsAppButton
                label="Escribir por WhatsApp"
                source="Contacto"
              />
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-slate-300 pt-5">
              <Clock3
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#1E40AF]"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Horario de atención
                </p>
                <p className="mt-1 text-sm leading-6 text-[#04215e]">
                  {siteConfig.serviceHours}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0" data-motion="rise">
            <p className="text-sm font-bold text-[#b45309]">Accesos directos</p>
            <h2 className="mt-2 font-editorial text-2xl font-semibold leading-tight text-[#04215e] sm:text-3xl">
              Elige cómo quieres contactarnos
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Cada acceso abre directamente el canal indicado.
            </p>

            <div
              className="mt-6 grid grid-flow-dense grid-cols-2 border-t border-slate-300"
              data-motion-group
            >
              {contactShortcuts.map((item) => (
                <Link
                  className="group relative min-w-0 border-b border-slate-300 py-4 pr-3 transition duration-300 even:border-l even:pl-3 even:pr-0 hover:text-[#1E40AF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] sm:min-h-36 sm:py-5 sm:pr-5 sm:even:pl-5"
                  data-motion-item
                  href={item.href}
                  key={item.label}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  <span className="flex items-start justify-between gap-2 text-[#1E40AF]">
                    <item.icon aria-hidden="true" className="h-5 w-5" />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1E40AF]"
                    />
                  </span>
                  <span className="mt-3 block font-editorial text-base font-semibold leading-snug text-[#04215e] sm:text-lg">
                    {item.label}
                  </span>
                  <span
                    className={
                      item.label === "Correo"
                        ? "mt-1 block break-words text-[0.65rem] font-bold leading-5 tracking-[-0.015em] text-slate-700 sm:text-sm sm:tracking-normal"
                        : "mt-1 block break-words text-xs font-bold leading-5 text-slate-700 sm:text-sm"
                    }
                  >
                    {item.value}
                  </span>
                  <span className="mt-1 hidden text-xs leading-5 text-slate-500 sm:block">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>

            <div
              className="grid sm:grid-cols-2 sm:divide-x sm:divide-slate-300"
              data-motion-group
            >
              {socialLinks.map((social) => (
                <a
                  aria-label={`Abrir ${social.platform} oficial de UNIVAMEX`}
                  className="group flex min-h-20 items-center gap-3 border-b border-slate-300 py-4 transition duration-300 first:pr-0 hover:text-[#1E40AF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] sm:first:pr-5 sm:last:pl-5"
                  data-motion-item
                  href={social.href}
                  key={social.platform}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <BrandIcon
                    brand={social.brand}
                    className="h-6 w-6 shrink-0 text-[#1E40AF] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#04215e]">
                      {social.platform}
                    </span>
                    <span className="block truncate text-xs text-slate-500 sm:text-sm">
                      {social.handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1E40AF]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#04215e] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
          <div data-motion="rise">
            <p className="text-sm font-bold text-[#e7a928]">Mensaje guiado</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              Cuéntanos qué quieres estudiar
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">
              Prepara un mensaje con tu programa y campus de interés para que admisiones pueda orientarte con mayor precisión.
            </p>
          </div>
          <div data-motion="rise">
            <GuidedWhatsAppForm
              programs={programs.map(({ name, level }) => ({ name, level }))}
              campuses={campuses.map(({ name }) => name)}
              source="Contacto"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div data-motion="rise">
            <SectionHeading
              title="Campus y referencias"
              description="Si necesitas visitar una sede, revisa la referencia y abre el mapa antes de salir. El horario general de atención es de lunes a sábado, de 8:00 a 18:00 h."
            />
          </div>
          <div
            className="grid gap-3 sm:gap-5 md:grid-cols-2"
            data-motion-group
          >
            {campuses.map((campus) => (
              <article
                className="border border-slate-200 bg-[#F8FAFC] p-4 sm:p-6"
                data-motion-item
                key={campus.name}
              >
                <MapPin aria-hidden="true" className="h-6 w-6 text-[#1E40AF]" />
                <h2 className="mt-3 font-editorial text-lg font-semibold leading-snug text-[#04215e] sm:mt-4 sm:text-xl">
                  {campus.name}
                </h2>
                <p className="mt-2 text-sm leading-5 text-slate-600 sm:mt-3 sm:leading-6">
                  {campus.address}
                </p>
                <Link
                  className="mt-3 inline-flex min-h-11 items-center gap-2 border border-[#CBD5E1] bg-white px-4 text-sm font-bold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF] sm:mt-5"
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir mapa
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div
          className="mx-auto flex max-w-7xl flex-col gap-4 border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:gap-6 sm:p-6 md:flex-row md:items-center md:justify-between"
          data-motion="rise"
        >
          <div>
            <h2 className="font-editorial text-2xl font-semibold leading-snug text-[#04215e]">
              Antes de escribir, puedes resolver dudas rápidas
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              RVOE, duración, documentos, modalidades, campus y recorrido
              virtual están resumidos en preguntas frecuentes.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#04215e] px-5 py-3 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white"
            href="/faq"
          >
            Ver FAQ
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteMotionShell>
  );
}



