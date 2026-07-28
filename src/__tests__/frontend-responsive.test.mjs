import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("la ficha editorial integra breadcrumb, imagen full-bleed y metadata en el hero", async () => {
  const page = await read("../app/programas/[slug]/page.tsx");

  assert.match(page, /<ProgramMotionShell>/);
  assert.match(page, /data-program-hero/);
  assert.match(page, /data-hero-image/);
  assert.match(page, /min-h-\[29rem\]/);
  assert.match(page, /bottom-0 top-14/);
  assert.match(page, /sm:top-16 lg:inset-y-0/);
  assert.match(page, /linear-gradient\(180deg,rgba\(3,23,67,0\.97\)/);
  assert.match(page, /lg:h-\[70svh\]/);
  assert.match(page, /max-w-6xl/);
  assert.match(page, /max-w-\[42rem\]/);
  assert.match(page, /tone="inverse"/);
  assert.match(page, /lg:\[clip-path:polygon/);
  assert.match(page, /grid-flow-dense grid-cols-2/);
  assert.doesNotMatch(page, /program\.level} · \{program\.area/);
  assert.doesNotMatch(page, /Formación con contexto/);
  assert.match(page, /<ProgramSectionNav/);
  assert.match(page, /href="#plan"/);
  assert.match(page, /id="programa"/);
  assert.match(page, /id="aplicacion"/);
  assert.match(page, /id="admisiones"/);
  assert.doesNotMatch(page, /scroll-mt-28/);
  assert.doesNotMatch(page, /SECTION 0[1-9]/);
  assert.doesNotMatch(page, /program\.aiApplications\.map/);
  assert.doesNotMatch(page, /entryProfile \?\?/);
});

test("la ficha usa contenido editorial específico por slug", async () => {
  const [page, stories, programs] = await Promise.all([
    read("../app/programas/[slug]/page.tsx"),
    read("../data/program-stories.ts"),
    read("../data/programs.ts"),
  ]);

  const slugs = [...programs.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(slugs.length, 20);
  assert.match(page, /getProgramStory\(program\.slug\)/);
  assert.match(stories, /export function getProgramStory/);
  assert.match(stories, /No existe contenido editorial/);

  for (const slug of slugs) {
    assert.match(stories, new RegExp(`"${slug}":`));
  }
});

test("el plan de estudios conserva la expansión sin capturar el scroll nativo", async () => {
  const component = await read("../components/study-plan.tsx");

  assert.match(component, /aria-expanded={isActive}/);
  assert.match(component, /data-plan-period/);
  assert.match(component, /data-plan-stage/);
  assert.match(component, /onClick=\{\(\) => setActivePeriod\(periodIndex\)\}/);
  assert.match(component, /w-full opacity-100/);
  assert.match(component, /w-\[84%\] opacity-100/);
  assert.match(component, /py-6 sm:py-8 lg:py-10/);
  assert.doesNotMatch(component, /hover:opacity-85|opacity-60/);
  assert.match(component, /mt-4 grid grid-cols-2/);
  assert.match(component, /className={isActive \? "block" : "hidden"}/);
  assert.match(component, /const periodThemes/);
  assert.match(component, /period\.items\.map\(\(subject\) => \(/);
  assert.doesNotMatch(component, /<table/);
  assert.doesNotMatch(component, /ChevronDown/);
  assert.doesNotMatch(component, /ScrollTrigger/);
  assert.doesNotMatch(component, /pin: stage/);
  assert.doesNotMatch(component, /overflow-y-auto/);
  assert.doesNotMatch(component, /scrollbar-/);
  assert.doesNotMatch(component, /tabIndex={0}/);
  assert.doesNotMatch(component, /periodFilter/);
  assert.doesNotMatch(component, /min-w-\[44rem\]/);
  assert.doesNotMatch(component, /overflow-x-auto/);
  assert.doesNotMatch(component, /IntersectionObserver/);
  assert.doesNotMatch(component, /addEventListener\("wheel"/);
  assert.doesNotMatch(component, /preventDefault\(\)/);
  assert.doesNotMatch(component, /window\.scrollTo/);
  assert.match(component, /Descargar PDF/);
  assert.match(component, /<WhatsAppButton/);
  assert.doesNotMatch(component, /Etapa formativa/);
  assert.doesNotMatch(component, /Filtrar por etapa/);
  assert.doesNotMatch(component, /String\(subjectIndex \+ 1\)/);
});

test("los insights se muestran como storytelling compacto e interactivo, sin listas numeradas", async () => {
  const component = await read("../components/program-insights.tsx");

  assert.match(component, /IA aplicada/);
  assert.match(component, /Lo que desarrollarás/);
  assert.match(component, /Campo laboral/);
  assert.match(component, /role="tablist"/);
  assert.match(component, /role="tabpanel"/);
  assert.match(component, /<WhatsAppButton/);
  assert.doesNotMatch(component, /<ol/);
  assert.doesNotMatch(component, /01|02|03/);
});

test("la ficha conserva rutas de decisión y contexto de WhatsApp", async () => {
  const [page, helper] = await Promise.all([
    read("../app/programas/[slug]/page.tsx"),
    read("../lib/whatsapp.ts"),
  ]);

  assert.match(page, /"\/campus"/);
  assert.match(page, /"\/rvoe"/);
  assert.match(page, /href="\/admisiones"/);
  assert.match(page, /variant="program"/);
  assert.match(page, /data-plan-heading/);
  assert.doesNotMatch(page, /<aside/);
  assert.match(page, /source="Hero de programa"/);
  assert.match(page, /source="Cierre de ficha de programa"/);
  assert.match(helper, /context\.program && context\.question/);
  assert.match(helper, /Tengo una duda sobre \$\{context\.question\}/);
});

test("los contratos móviles conservan header compacto y gutters del sistema", async () => {
  const [globals, header, programPage] = await Promise.all([
    read("../app/globals.css"),
    read("../components/header.tsx"),
    read("../app/programas/[slug]/page.tsx"),
  ]);

  assert.match(globals, /padding-top: 4\.25rem/);
  assert.match(header, /min-h-\[4\.25rem\]/);
  assert.match(header, /h-\[3\.15rem\] w-\[9\.9rem\]/);
  assert.match(header, /sm:h-\[4\.275rem\] sm:w-\[13\.5rem\]/);
  assert.match(programPage, /px-4 py-14/);
  assert.match(programPage, /sm:px-6 sm:py-20/);
  assert.match(programPage, /px-4 py-7 sm:px-6 sm:py-20/);
  assert.match(programPage, /text-\[1\.1rem\] font-medium leading-6/);
  assert.match(programPage, /text-\[2rem\] font-semibold leading-\[1\.02\]/);
});

test("motion, navegación sticky y cards completas respetan interacción accesible", async () => {
  const [motionShell, sectionNav, fitAccordion, card, packageJson] = await Promise.all([
    read("../components/program-motion-shell.tsx"),
    read("../components/program-section-nav.tsx"),
    read("../components/program-fit-accordion.tsx"),
    read("../components/program-card.tsx"),
    read("../../package.json"),
  ]);

  assert.match(packageJson, /"gsap"/);
  assert.match(packageJson, /"@gsap\/react"/);
  assert.match(motionShell, /ScrollTrigger/);
  assert.match(motionShell, /prefers-reduced-motion: reduce/);
  assert.match(motionShell, /scrub: 0\.8/);
  assert.doesNotMatch(motionShell, /opacity: 0[, }]/);
  assert.match(motionShell, /\{ opacity: 1, y: 20 \}/);
  assert.match(motionShell, /\{ opacity: 0\.14, y: 6 \}/);
  assert.match(sectionNav, /sticky top-\[4\.25rem\]/);
  assert.match(sectionNav, /aria-current/);
  assert.match(fitAccordion, /aria-expanded/);
  assert.match(card, /aria-label={`Ver programa:/);
  assert.match(card, /absolute inset-0 z-10/);
  assert.match(card, /group-hover:scale-105/);
});

test("el motion editorial compartido cubre Inicio, Quiénes somos y Campus", async () => {
  const [motionShell, home, about, campus, pageHero, hero] = await Promise.all([
    read("../components/site-motion-shell.tsx"),
    read("../app/page.tsx"),
    read("../app/quienes-somos/page.tsx"),
    read("../app/campus/page.tsx"),
    read("../components/page-hero.tsx"),
    read("../components/hero.tsx"),
  ]);

  assert.match(motionShell, /useGSAP/);
  assert.match(motionShell, /ScrollTrigger/);
  assert.match(motionShell, /gsap\.matchMedia/);
  assert.match(motionShell, /prefers-reduced-motion: reduce/);
  assert.match(motionShell, /scrub: 0\.8/);
  assert.match(motionShell, /onComplete: setupScrollMotion/);
  assert.match(motionShell, /\{ autoAlpha: 1, yPercent: 0 \}/);
  assert.match(motionShell, /immediateRender: false/);
  assert.doesNotMatch(motionShell, /autoAlpha: 0[, }]/);
  assert.match(motionShell, /start: "top 94%"/);
  assert.match(home, /<SiteMotionShell className="home-main">/);
  assert.match(about, /<SiteMotionShell>/);
  assert.match(campus, /<SiteMotionShell>/);
  assert.match(pageHero, /<PageHeroMotionShell>/);
  assert.match(pageHero, /rgba\(4,33,94,0\)_100%/);
  assert.doesNotMatch(pageHero, /bg-\[#04215e\]\/42/);
  assert.match(hero, /max-w-\[19rem\] text-sm leading-6/);
  assert.match(hero, /sm:max-w-\[34rem\]/);
  assert.match(hero, /flex flex-nowrap items-center gap-2/);
  assert.match(hero, /min-h-11 shrink-0/);
});

test("cada cambio de página restablece el scroll sin romper las anclas internas", async () => {
  const [layout, scrollReset] = await Promise.all([
    read("../app/layout.tsx"),
    read("../components/route-scroll-reset.tsx"),
  ]);

  assert.match(layout, /<RouteScrollReset \/>/);
  assert.match(scrollReset, /usePathname\(\)/);
  assert.match(scrollReset, /useLayoutEffect/);
  assert.match(scrollReset, /scrollRestoration = "manual"/);
  assert.match(scrollReset, /window\.scrollTo\(0, 0\)/);
  assert.match(scrollReset, /\[pathname\]/);
  assert.doesNotMatch(scrollReset, /useSearchParams/);
});

test("las fotografías editoriales conservan su proporción y Campus tiene respuesta física", async () => {
  const [pathways, campus, campusPreview, whatsappButton] = await Promise.all([
    read("../components/home-pathways.tsx"),
    read("../app/campus/page.tsx"),
    read("../components/home-campus-preview.tsx"),
    read("../components/whatsapp-button.tsx"),
  ]);

  assert.match(pathways, /className="relative aspect-video/);
  assert.match(pathways, /className="object-contain"/);
  assert.match(pathways, /mode="sync"/);
  assert.match(pathways, /\[grid-area:1\/1\]/);
  assert.match(pathways, /linear-gradient\(180deg/);
  assert.doesNotMatch(pathways, /activeStory\.icon/);
  assert.doesNotMatch(pathways, /activeStory\.note/);
  assert.match(pathways, /flex items-end justify-between/);
  assert.doesNotMatch(pathways, /min-h-\[34rem\]/);
  assert.match(campus, /width=\{item\.width\}/);
  assert.match(campus, /height=\{item\.height\}/);
  assert.match(campus, /h-auto w-full object-contain/);
  assert.match(campus, /aspect-video overflow-hidden bg-slate-200/);
  assert.match(campus, /h-full w-full object-cover/);
  assert.match(campus, /group flex h-full flex-col/);
  assert.doesNotMatch(campus, /aspect-\[4\/3\]/);
  assert.match(campus, /hover:-translate-y-1/);
  assert.match(campus, /focus-within:-translate-y-1/);
  assert.match(campus, /hover:scale-\[1\.045\]/);
  assert.match(campus, /hover:z-10/);
  assert.match(campus, /className="min-w-0" data-motion-item key=\{item\.image\}/);
  assert.match(campus, /cropToLandscape: true/);
  assert.match(campus, /uniformLandscapeFrame: true/);
  assert.match(campus, /item\.cropToLandscape/);
  assert.match(campus, /item\.uniformLandscapeFrame/);
  assert.match(campus, /h-full w-full object-cover object-center/);
  assert.match(campusPreview, /width=\{campus\.imageWidth\}/);
  assert.match(campusPreview, /aspect-video/);
  assert.match(campusPreview, /h-full w-full object-cover/);
  assert.match(campusPreview, /flex h-full min-w-0 flex-col/);
  assert.match(whatsappButton, /src="\/icons\/whatsapp\.png"/);
  assert.match(whatsappButton, /icon="whatsapp"/);
});

test("el recorrido 360 requiere activación explícita y permite recuperar el scroll", async () => {
  const tour = await read("../components/virtual-tour.tsx");

  assert.match(tour, /const \[isInteractive, setIsInteractive\] = useState\(false\)/);
  assert.match(tour, /Haz clic para explorar/);
  assert.match(tour, /inert=\{!isInteractive\}/);
  assert.match(tour, /event\.key === "Escape"/);
  assert.match(tour, /onPointerLeave/);
  assert.match(tour, /event\.pointerType !== "touch"/);
  assert.match(tour, /Bloquear interacción/);
  assert.match(tour, /fullscreenchange/);
  assert.match(tour, /touch-pan-y/);
});

test("Oferta académica conserva controles sticky y thumbnails exclusivos de galería", async () => {
  const [finder, card, programPage, programData, thumbnailFiles] =
    await Promise.all([
      read("../components/program-finder.tsx"),
      read("../components/program-card.tsx"),
      read("../app/programas/[slug]/page.tsx"),
      read("../data/programs.ts"),
      readdir(
        new URL(
          "../../public/images/program-thumbnails/",
          import.meta.url,
        ),
      ),
    ]);

  assert.match(finder, /sticky top-\[4\.25rem\]/);
  assert.match(finder, /sm:top-20/);
  assert.match(finder, /relative flex min-w-0 items-center gap-2/);
  assert.match(finder, /aria-expanded=\{filtersOpen\}/);
  assert.match(finder, /mobile-program-filters/);
  assert.match(finder, /hidden shrink-0 items-center gap-2 lg:flex/);
  assert.match(finder, /border-r border-slate-200/);
  assert.match(finder, /aria-label="Reiniciar búsqueda y filtros"/);
  assert.match(finder, /hover:border-\[#1E40AF\]/);
  assert.doesNotMatch(finder, /grid min-w-0 grid-cols-3/);
  assert.match(finder, /grid-flow-dense/);
  assert.match(finder, /aria-live="polite"/);
  assert.match(card, /\/images\/program-thumbnails\/\$\{program\.slug\}\.webp/);
  assert.match(card, /aspect-\[4\/3\]/);
  assert.match(card, /data-program-gallery-card/);
  assert.doesNotMatch(card, /src=\{program\.image\}/);
  assert.match(programPage, /src=\{program\.image\}/);

  const programSlugs = [
    ...programData.matchAll(/\s+slug: "([^"]+)",/g),
  ]
    .map((match) => `${match[1]}.webp`)
    .sort();
  const thumbnails = thumbnailFiles
    .filter((file) => file.endsWith(".webp"))
    .sort();

  assert.equal(thumbnails.length, 20);
  assert.deepEqual(thumbnails, programSlugs);
});
