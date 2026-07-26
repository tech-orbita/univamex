import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { ProgramCard } from "@/components/program-card";
import { ProgramInsights } from "@/components/program-insights";
import { StudyPlan, StudyPlanOverview } from "@/components/study-plan";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProgramStory } from "@/data/program-stories";
import { seoConfig } from "@/data/seo";
import {
  getProgramBySlug,
  getRelatedPrograms,
  programs,
} from "@/data/programs";
import { programLevelRoutes } from "@/lib/program-levels";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return { title: "Programa no encontrado" };
  }

  return {
    title: `${program.shortName} en Ecatepec`,
    description: `${program.description} Consulta modalidad, duración, RVOE, plan de estudios y admisiones de ${program.name} en Ecatepec.`,
    alternates: { canonical: `/programas/${program.slug}` },
    openGraph: {
      title: `${program.name} | UNIVAMEX`,
      description: program.promise,
      url: `/programas/${program.slug}`,
      siteName: "UNIVAMEX",
      images: [
        {
          url: seoConfig.socialImage,
          width: 1200,
          height: 630,
          alt: "UNIVAMEX, oferta académica y admisiones",
        },
      ],
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.name} | UNIVAMEX`,
      description: program.promise,
      images: [seoConfig.socialImage],
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const story = getProgramStory(program.slug);
  const related = getRelatedPrograms(program);
  const programUrl = `https://www.univamex.com/programas/${program.slug}`;
  const rvoe = program.rvoeStatus === "review" ? `${program.rvoe} · por confirmar` : program.rvoe;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: program.name,
      description: program.description,
      url: programUrl,
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Colegio Universitario del Valle de México - UNIVAMEX",
        url: "https://www.univamex.com/",
      },
      educationalLevel: program.level,
      availableLanguage: "es-MX",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.univamex.com/" },
        { "@type": "ListItem", position: 2, name: "Oferta académica", item: "https://www.univamex.com/oferta-academica" },
        { "@type": "ListItem", position: 3, name: program.name, item: programUrl },
      ],
    },
  ];

  const orientationItems = [
    ["Modalidad", program.modality],
    ["Duración", program.duration],
    ["RVOE", rvoe],
    ["Asignaturas", program.subjects ?? "por confirmar"],
    ["Área", program.area],
  ];

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className="bg-[#f8fafc] px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <BreadcrumbTrail
            backHref={programLevelRoutes[program.level]}
            compact
            items={[
              { href: programLevelRoutes[program.level], label: program.level },
              { label: program.shortName },
            ]}
          />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#04215e] text-white">
        <div className="absolute inset-0">
          <Image
            src={program.image}
            alt={program.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.98)_0%,rgba(4,33,94,0.88)_30%,rgba(4,33,94,0.38)_62%,rgba(4,33,94,0.08)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[35rem] max-w-7xl items-center pb-40 pt-10 sm:min-h-[38rem] sm:pb-32 sm:pt-14 lg:min-h-[clamp(34rem,calc(100svh-14rem),48rem)] lg:pb-32 lg:pt-0">
          <div className="flex max-w-3xl items-center px-4 sm:px-6 lg:px-10 lg:py-20">
            <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f0bd4b]">
              {program.level} · {program.area}
            </p>
            <h1 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
              {program.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              {program.promise}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <WhatsAppButton
                className="w-fit !px-4 !text-xs sm:!text-sm"
                label="Solicitar informes"
                program={program.name}
                source="Hero de programa"
                variant="accent"
              />
              <a
                className="inline-flex min-h-11 w-fit items-center justify-center border border-white/80 bg-white/5 px-4 py-3 text-xs font-bold text-white transition hover:border-white hover:bg-white hover:text-[#04215e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:min-h-12 sm:px-5 sm:text-sm"
                href="#plan"
              >
                Ver plan de estudios
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-5 z-20 mx-auto max-w-7xl sm:inset-x-6 sm:bottom-7 lg:inset-x-10">
          <div className="grid grid-cols-2 gap-px border border-slate-200/80 bg-slate-200/80 shadow-2xl shadow-slate-950/30 sm:grid-cols-4">
            {orientationItems.slice(0, 4).map(([label, value]) => (
              <dl className="min-w-0 bg-white px-3 py-3 text-[#04215e] sm:px-5 sm:py-4" key={label}>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-xs">{label}</dt>
                <dd className="mt-1 break-words text-xs font-bold leading-5 sm:text-sm">{value}</dd>
              </dl>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Navegación de la ficha" className="sticky top-[4.25rem] z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur sm:top-20">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-10">
          {[
            ["La carrera", "#programa"],
            ["Plan de estudios", "#plan"],
            ["Aplicación profesional", "#aplicacion"],
            ["Campus y validez", "#campus"],
            ["Admisión", "#admisiones"],
          ].map(([label, href]) => (
            <a
              className="inline-flex min-h-14 shrink-0 items-center border-b-2 border-transparent px-4 text-sm font-bold text-slate-600 transition hover:border-[#e7a928] hover:text-[#04215e] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#e7a928] first:pl-0"
              href={href}
              key={href}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="programa">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 border-b border-slate-200 pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">La carrera</p>
              <h2 className="mt-2 max-w-md font-editorial text-3xl font-semibold leading-[1.05] text-[#04215e] sm:text-4xl">
                Una ruta académica con un propósito profesional claro.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">{story.summary}</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <h3 className="font-editorial text-2xl font-semibold text-[#04215e]">¿Este programa es para ti?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Tres señales para reconocer si esta formación coincide con lo que estás buscando.</p>
            </div>
            <div className="grid border-y border-slate-200 sm:grid-cols-3">
              {story.fit.map((item) => (
                <p className="border-b border-slate-200 px-4 py-4 text-sm leading-6 text-slate-700 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6fb] px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="plan">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">Plan de estudios</p>
              <h2 className="mt-2 max-w-xl font-editorial text-3xl font-semibold leading-[1.05] text-[#04215e] sm:text-4xl">
                Consulta las materias por periodo.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              El plan conserva el orden académico oficial y agrupa las asignaturas dentro de cada periodo para que puedas comparar el recorrido completo de un vistazo.
            </p>
          </div>
          <StudyPlanOverview items={program.studyPlan} />
          <div className="mt-8">
            <StudyPlan
              items={program.studyPlan}
              pdfHref={`/pdf/planes-estudio/${program.slug}.pdf`}
              programName={program.name}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eff6ff] px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="aplicacion">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">Lo que podrás hacer</p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">
              La carrera se entiende mejor cuando ves dónde cobra sentido.
            </h2>
          </div>
          <ProgramInsights
            aiApplications={program.aiApplications}
            aiLead={story.aiLead}
            careerField={program.careerField}
            careerLead={story.careerLead}
            graduateProfile={program.graduateProfile}
            profileLead={story.profileLead}
            programName={program.name}
          />
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="campus">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">Antes de decidir</p>
            <h2 className="mt-3 max-w-lg font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">
              Confirma lo importante para tu siguiente paso.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Revisa el campus, consulta la validez académica y pregunta por cualquier dato que necesite confirmación.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            <Link className="group flex min-h-24 items-center justify-between gap-6 py-5 transition hover:bg-[#f8fafc] sm:px-5" href="/campus">
              <span><strong className="block font-editorial text-2xl font-semibold text-[#04215e]">Conocer campus</strong><span className="mt-1 block text-sm leading-6 text-slate-600">Direcciones, espacios y recorrido virtual de UNIVAMEX.</span></span>
              <span aria-hidden="true" className="text-2xl text-[#1e40af] transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link className="group flex min-h-24 items-center justify-between gap-6 py-5 transition hover:bg-[#f8fafc] sm:px-5" href="/rvoe">
              <span><strong className="block font-editorial text-2xl font-semibold text-[#04215e]">Consultar validez académica</strong><span className="mt-1 block text-sm leading-6 text-slate-600">Claves, modalidades y datos publicados por programa.</span></span>
              <span aria-hidden="true" className="text-2xl text-[#1e40af] transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link className="group flex min-h-24 items-center justify-between gap-6 py-5 transition hover:bg-[#f8fafc] sm:px-5" href="/oferta-academica">
              <span><strong className="block font-editorial text-2xl font-semibold text-[#04215e]">Comparar programas</strong><span className="mt-1 block text-sm leading-6 text-slate-600">Explora otras opciones por nivel y área académica.</span></span>
              <span aria-hidden="true" className="text-2xl text-[#1e40af] transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#04215e] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-10" id="admisiones">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f0bd4b]">Admisión</p>
            <h2 className="mt-3 max-w-lg font-editorial text-4xl font-semibold leading-[1.02] sm:text-5xl">
              Si esta ruta tiene sentido para ti, hablemos del siguiente paso.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/75">
              Revisa la documentación correspondiente a tu nivel y recibe orientación directa sobre horarios, modalidad y fechas de inicio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                className="w-full sm:w-fit"
                label="Hablar con admisiones"
                program={program.name}
                question="los requisitos, horarios, modalidad y fechas de inicio"
                source="Cierre de ficha de programa"
                variant="accent"
              />
              <Link className="inline-flex min-h-12 w-full items-center justify-center border border-white/60 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#04215e] sm:w-fit" href="/admisiones">
                Ver proceso completo
              </Link>
            </div>
          </div>
          <div className="border border-white/20 bg-white p-4 text-[#04215e] sm:p-8">
            <AdmissionsChecklist level={program.requirementsLevel} />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">También puedes comparar</p>
            <h2 className="mt-3 max-w-2xl font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">
              Otras opciones relacionadas con tu búsqueda.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((candidate) => (
                <ProgramCard key={candidate.slug} program={candidate} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
