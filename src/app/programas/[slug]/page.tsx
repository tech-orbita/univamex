import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpenText,
  CalendarDays,
  FileBadge2,
  GraduationCap,
} from "lucide-react";
import { AdmissionsChecklist } from "@/components/admissions-checklist";
import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { ProgramCard } from "@/components/program-card";
import { ProgramFitAccordion } from "@/components/program-fit-accordion";
import { ProgramInsights } from "@/components/program-insights";
import {
  ProgramMarquee,
  ProgramMotionShell,
  ScrollTextReveal,
} from "@/components/program-motion-shell";
import { ProgramSectionNav } from "@/components/program-section-nav";
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
    { icon: GraduationCap, label: "Modalidad", value: program.modality },
    { icon: CalendarDays, label: "Duración", value: program.duration },
    { icon: FileBadge2, label: "RVOE", value: rvoe },
    {
      icon: BookOpenText,
      label: "Asignaturas",
      value: program.subjects ?? "por confirmar",
    },
  ];
  const hasExtendedHeroTitle = program.name.length > 55;

  return (
    <ProgramMotionShell>
    <main className="w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section
        className="relative isolate overflow-hidden bg-[#031f58] text-white lg:grid lg:h-[70svh] lg:min-h-[38rem] lg:max-h-[46rem] lg:grid-rows-[1fr_auto] lg:bg-[radial-gradient(circle_at_15%_70%,#0b4597_0%,#042b70_30%,#031f58_72%)]"
        data-program-hero
      >
        <div className="relative z-10 mx-auto min-h-[29rem] w-full max-w-[100rem] px-4 pb-6 pt-3 sm:min-h-[32rem] sm:px-6 sm:pb-8 sm:pt-5 lg:flex lg:min-h-0 lg:flex-col lg:px-10 lg:pb-7 lg:pt-6">
          <BreadcrumbTrail
            backHref={programLevelRoutes[program.level]}
            compact
            items={[
              { href: "/", label: "Inicio" },
              { href: programLevelRoutes[program.level], label: program.level },
              { label: program.shortName },
            ]}
            tone="inverse"
          />

          <div className="flex pt-3 sm:pt-5 lg:flex-1 lg:items-center lg:pb-8 lg:pt-2">
            <div className="max-w-[42rem] lg:w-[47%]" data-hero-copy>
              <h1
                className={`max-w-[42rem] font-heading font-semibold leading-[0.97] tracking-[-0.04em] text-balance ${
                  hasExtendedHeroTitle
                    ? "text-[clamp(1.75rem,7.4vw,2rem)] sm:text-[clamp(2.15rem,4.8vw,4.75rem)] lg:text-[clamp(2.25rem,3.5vw,3.5rem)] lg:leading-[0.98] lg:tracking-[-0.035em]"
                    : "text-[clamp(2.15rem,4.8vw,4.75rem)]"
                }`}
              >
                {program.name}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/82 sm:mt-5 sm:text-lg sm:leading-7 lg:mt-6">
                {program.promise}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                <WhatsAppButton
                  className="w-full !px-3 !text-xs sm:w-fit sm:!px-5 sm:!text-sm"
                  label="Solicitar informes"
                  program={program.name}
                  source="Hero de programa"
                  variant="accent"
                />
                <a
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/65 bg-white/[0.04] px-3 py-2.5 text-center text-xs font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#04215e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:min-h-12 sm:w-fit sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
                  href="#plan"
                >
                  Ver plan de estudios
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 top-14 overflow-hidden bg-slate-200 sm:top-16 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[60%] lg:[clip-path:polygon(17%_0,100%_0,100%_100%,0_100%)]">
          <div className="absolute inset-0 origin-center" data-hero-image>
            <Image
              src={program.image}
              alt={program.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-full w-full object-cover object-center saturate-[1.08] contrast-[1.03]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,23,67,0.97)_0%,rgba(3,31,88,0.78)_43%,rgba(3,31,88,0.16)_78%,rgba(3,31,88,0.03)_100%)] lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-[22%] bg-gradient-to-r from-[#031f58]/45 to-transparent lg:block"
          />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 sm:pb-6 lg:px-0 lg:pb-7">
          <div
            className="grid grid-flow-dense grid-cols-2 gap-px border border-white/35 bg-white/20 shadow-2xl shadow-slate-950/30 sm:grid-cols-4"
          >
            {orientationItems.map(({ icon: Icon, label, value }) => (
              <dl
                className="flex min-w-0 items-center gap-2.5 bg-[#052d70]/[0.98] px-3 py-4 sm:gap-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
                key={label}
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#f2b634] sm:h-6 sm:w-6" strokeWidth={1.65} />
                <div className="min-w-0">
                  <dt className="text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white/60 sm:text-[0.65rem]">
                    {label}
                  </dt>
                  <dd className="mt-0.5 break-words text-[0.68rem] font-bold leading-4 text-white sm:text-sm sm:leading-5">
                    {value}
                  </dd>
                </div>
              </dl>
            ))}
          </div>
        </div>
      </section>

      <ProgramSectionNav />

      <section
        className="relative bg-white px-4 py-7 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        id="programa"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40" data-reveal="up">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b45309] sm:text-sm">
                La carrera
              </p>
              <h2 className="mt-2 max-w-2xl font-editorial text-[1.85rem] font-semibold leading-[1.01] text-[#04215e] sm:mt-3 sm:text-5xl lg:text-[3.45rem]">
                Una ruta académica con propósito profesional.
              </h2>
              <div className="mt-8 hidden h-px w-28 bg-[#e7a928] lg:block" />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7 lg:pt-16">
            <ScrollTextReveal
              className="max-w-3xl font-editorial text-[1.1rem] font-medium leading-6 text-[#04215e] sm:text-3xl sm:leading-[1.32]"
              text={story.summary}
            />

            <div className="mt-6 border-t border-slate-200 pt-5 sm:mt-12 sm:pt-8" data-reveal="up">
              <div className="mb-3 max-w-xl sm:mb-6">
                <h3 className="font-editorial text-2xl font-semibold leading-tight text-[#04215e] sm:text-3xl">
                  ¿Este programa es para ti?
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">
                  Revisa las señales que mejor describen lo que buscas en tu
                  formación profesional.
                </p>
              </div>
              <ProgramFitAccordion items={story.fit} />
            </div>
          </div>
        </div>
      </section>

      <ProgramMarquee
        items={[
          program.level,
          program.area,
          program.modality,
          "IA aplicada",
          "Perfil de egreso",
          "Campo laboral",
        ]}
      />

      <section
        className="bg-[#f3f6fb] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        id="plan"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7" data-plan-heading data-reveal="up">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b45309] sm:text-sm">
                Plan de estudios
              </p>
              <h2 className="mt-2 max-w-3xl font-editorial text-[2rem] font-semibold leading-[1.02] text-[#04215e] sm:mt-3 sm:text-5xl lg:text-6xl">
                Consulta las materias por periodo.
              </h2>
            </div>
            <div className="lg:col-span-5" data-reveal="up">
              <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                El plan conserva el orden académico oficial y agrupa las
                asignaturas dentro de cada periodo.
              </p>
              <StudyPlanOverview items={program.studyPlan} />
            </div>
          </div>

          <div className="mt-8 min-w-0 sm:mt-10 lg:mt-12" data-reveal="clip">
            <StudyPlan
              items={program.studyPlan}
              pdfHref={`/pdf/planes-estudio/${program.slug}.pdf`}
              programName={program.name}
            />
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#eff6ff] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        id="aplicacion"
      >
        <div
          aria-hidden="true"
          className="absolute -right-10 top-0 font-editorial text-[clamp(7rem,18vw,16rem)] font-semibold leading-none text-[#04215e]/[0.035]"
        >
          futuro
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div
            className="mb-10 grid grid-cols-1 gap-6 border-b border-[#04215e]/15 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12"
            data-reveal="up"
          >
            <div className="lg:col-span-7">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">
                Lo que podrás hacer
              </p>
              <h2 className="mt-3 max-w-4xl font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl lg:text-6xl">
                La carrera se entiende mejor cuando ves dónde cobra sentido.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-slate-600 lg:col-span-5 lg:pb-1">
              Cambia de perspectiva para explorar tecnología aplicada, perfil
              de egreso y campo laboral sin abandonar el contexto del programa.
            </p>
          </div>
          <div data-reveal="clip">
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
        </div>
      </section>

      <section
        className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        id="campus"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="lg:col-span-7" data-reveal="clip">
            <div className="relative min-h-[23rem] overflow-hidden border border-slate-200 bg-[#04215e] sm:min-h-[32rem]">
              <Image
                src="/images/campus-hero.png"
                alt="Espacios del campus UNIVAMEX"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,33,94,0.84),rgba(4,33,94,0.05)_65%)]" />
              <p className="absolute bottom-6 left-6 max-w-sm border-l-2 border-[#e7a928] pl-4 font-editorial text-2xl font-semibold leading-tight text-white sm:bottom-8 sm:left-8 sm:text-3xl">
                Tu decisión también se construye con contexto.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5" data-reveal="up">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">
              Antes de decidir
            </p>
            <h2 className="mt-3 max-w-lg font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">
              Confirma lo importante para tu siguiente paso.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Revisa el campus, consulta la validez académica y pregunta por
              cualquier dato que necesite confirmación.
            </p>

            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 lg:mt-auto">
              {[
                [
                  "/campus",
                  "Conocer campus",
                  "Direcciones, espacios y recorrido virtual de UNIVAMEX.",
                ],
                [
                  "/rvoe",
                  "Consultar validez académica",
                  "Claves, modalidades y datos publicados por programa.",
                ],
                [
                  "/oferta-academica",
                  "Comparar programas",
                  "Explora otras opciones por nivel y área académica.",
                ],
              ].map(([href, title, description]) => (
                <Link
                  className="group relative flex min-h-24 items-center justify-between gap-6 overflow-hidden py-5 transition-colors hover:bg-[#f3f6fb] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1e40af] sm:px-5"
                  href={href}
                  key={href}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-[#e7a928] transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <span>
                    <strong className="block font-editorial text-2xl font-semibold text-[#04215e]">
                      {title}
                    </strong>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl text-[#1e40af] transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[radial-gradient(circle_at_88%_18%,rgba(231,169,40,0.18),transparent_28%),linear-gradient(135deg,#f8fafc_0%,#edf4ff_62%,#fff8e8_100%)] px-4 py-14 text-[#04215e] sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        id="admisiones"
      >
        <div
          aria-hidden="true"
          className="absolute -right-24 top-0 h-full w-[38%] skew-x-[-9deg] border-l border-[#1e40af]/10 bg-white/30"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 border-b border-[#04215e]/15 pb-9 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-12">
            <div className="lg:col-span-7" data-reveal="up">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">
                Admisión
              </p>
              <h2 className="mt-3 max-w-4xl font-editorial text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
                Tu siguiente paso puede empezar con una conversación clara.
              </h2>
            </div>
            <div className="lg:col-span-5" data-reveal="up">
              <p className="max-w-lg text-base leading-7 text-slate-600">
                Revisa la documentación correspondiente a tu nivel y recibe
                orientación directa sobre horarios, modalidad y fechas de inicio.
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
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center border border-[#04215e]/35 bg-white/50 px-5 py-3 text-sm font-bold text-[#04215e] transition-colors hover:border-[#04215e] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] sm:w-fit"
                  href="/admisiones"
                >
                  Ver proceso completo
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-10" data-reveal="clip">
            <AdmissionsChecklist
              level={program.requirementsLevel}
              variant="program"
            />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div data-reveal="up">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#b45309]">
                También puedes comparar
              </p>
              <h2 className="mt-3 max-w-3xl font-editorial text-4xl font-semibold leading-[1.02] text-[#04215e] sm:text-5xl">
                Otras opciones relacionadas con tu búsqueda.
              </h2>
            </div>
            <div
              className="mt-8 grid grid-flow-dense gap-5 md:grid-cols-2 lg:grid-cols-3"
              data-reveal-group
            >
              {related.map((candidate) => (
                <div data-reveal-item key={candidate.slug}>
                  <ProgramCard program={candidate} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
    </ProgramMotionShell>
  );
}
