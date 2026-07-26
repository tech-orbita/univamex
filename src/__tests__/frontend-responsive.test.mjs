import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("la ficha editorial conserva hero amplio, metadata compacta y anclas semánticas", async () => {
  const page = await read("../app/programas/[slug]/page.tsx");

  assert.match(page, /bg-\[linear-gradient\(90deg/);
  assert.match(page, /absolute inset-x-4 bottom-5/);
  assert.match(page, /href="#plan"/);
  assert.match(page, /id="programa"/);
  assert.match(page, /id="aplicacion"/);
  assert.match(page, /id="admisiones"/);
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

test("el plan de estudios es una tabla filtrable y agrupada por periodo", async () => {
  const component = await read("../components/study-plan.tsx");

  assert.match(component, /<table/);
  assert.match(component, /<thead/);
  assert.match(component, /Mostrar periodo/);
  assert.match(component, /Consulta todas las asignaturas de cada periodo/);
  assert.match(component, /period\.items\.map\(\(subject\) => \(/);
  assert.doesNotMatch(component, /aria-expanded/);
  assert.doesNotMatch(component, /<button/);
  assert.match(component, /overflow-x-auto/);
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

  assert.match(page, /href="\/campus"/);
  assert.match(page, /href="\/rvoe"/);
  assert.match(page, /href="\/admisiones"/);
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
  assert.match(programPage, /px-4 py-14/);
  assert.match(programPage, /sm:px-6 sm:py-20/);
});
