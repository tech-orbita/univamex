# Sistema de diseño responsive de UNIVAMEX

Este documento es la referencia canónica para mantener el frontend compacto, legible y consistente sin alterar la identidad visual institucional ni el contenido académico.

## Principios

- La interfaz debe ayudar a comparar programas y llegar a admisiones con contexto.
- En móvil se prioriza densidad útil: menos espacio ornamental, controles táctiles claros y contenido académico progresivo.
- Una card solo se usa cuando agrupa una entidad o acción real. Los textos breves relacionados se presentan como filas, listas divididas, pestañas o acordeones.
- No se inventan testimonios, métricas, RVOE, modalidades, beneficios ni descripciones para llenar espacio.
- WhatsApp siempre usa el helper central y un mensaje contextual.

## Color y tipografía vigente

- Azul institucional principal: `#04215e`.
- Azul de acción: `#1e40af`.
- Oro de acento: `#e7a928`; para texto pequeño sobre fondo claro se usa `#b45309`.
- Fondos: blanco, `#f8fafc`, `#f3f6fb` y azul muy claro `#eff6ff`.
- El runtime actual conserva Atkinson Hyperlegible para cuerpo y Noto Serif Display / Source Serif 4 para títulos editoriales. Cambiar familias tipográficas requiere una tarea visual separada.

## Escala responsive

| Propiedad | Móvil `<640` | Tablet `640–1023` | Desktop `>=1024` |
| --- | --- | --- | --- |
| Gutter horizontal | 16 px | 24 px | 40 px |
| Padding vertical normal | 40 px | 56 px | 64–80 px según contexto |
| Padding vertical compacto | 28–36 px | 40–48 px | 40–56 px |
| Gap entre bloques | 16–24 px | 24–32 px | 32–40 px |
| Padding de card | 12–16 px | 20–24 px | 20–24 px |
| Altura mínima de control | 44 px | 44–48 px | 44–48 px |
| Header | 68 px | 84 px | 84 px |

Los breakpoints siguen Tailwind: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

## Ritmo tipográfico

- H1 móvil: normalmente `2–2.15rem`, `line-height 1.02`; debe caber en un máximo práctico de tres líneas.
- H2 móvil: `1.75rem`, `line-height 1.04`.
- Cuerpo móvil: `0.875–1rem`, `line-height 1.25–1.5` según longitud.
- Se reducen márgenes superiores a 8–20 px en móvil; las escalas amplias solo se recuperan desde `sm` o `lg`.
- No usar `leading-8` en textos móviles breves ni padding de 24–32 px para una sola frase.

## Fichas de programa

- El hero académico mantiene metadata en una cuadrícula 2×2 y acciones en una fila de dos columnas en móvil. El breadcrumb ocupa una franja azul limpia antes de la fotografía; la imagen comienza debajo, llega hasta el borde inferior del hero y usa un degradado azul oscuro arriba que se vuelve casi transparente abajo para conservar legibilidad sin ocultar la escena.
- `Resumen del programa` usa texto editorial y un bloque nativo `<details>` para “¿Este programa es para ti?”. Las filas se separan con divisores, no con cards individuales.
- `IA en tu carrera`, `Perfil de egreso` y `Campo laboral` viven en `ProgramInsights`. Son tres pestañas accesibles con equivalencia clic, touch y teclado (`←`, `→`, `Home`, `End`).
- Los paneles usan listas numeradas compactas. Todo el contenido permanece en el DOM aunque un panel esté oculto.
- Cada panel puede abrir WhatsApp con una pregunta contextual; nunca se envía un mensaje automáticamente.
- El plan de estudios ocupa todo el ancho disponible y usa una secuencia centrada en todos los breakpoints: el periodo activo muestra sus materias y los periodos adyacentes se asoman arriba y abajo. Cada tarjeta conserva una variación cromática reconocible. La cabecera completa activa el periodo mediante click, touch o teclado, sin un botón visual secundario. La descarga PDF aparece como acción final después de la secuencia.
- El cierre de admisiones evita contenedores blancos sobredimensionados: el mensaje, las acciones y los documentos forman un único capítulo editorial con lectura horizontal en escritorio y progresiva en móvil.

## Componentes y cards

- Las cards de programas conservan imagen, nivel, modalidad, descripción, metadata y acciones porque representan una entidad navegable.
- En móvil, sus imágenes usan una relación más baja, el cuerpo tiene 16 px de padding y las dos acciones comparten fila.
- En Oferta académica, búsqueda, filtros y reinicio forman una toolbar sticky de una sola fila y 44 px de alto útil. En escritorio los tres selectores permanecen inline y muestran su etiqueta funcional junto al valor; en móvil y tablet se agrupan tras `Filtros` en un panel flotante bajo demanda. El conteo de resultados vive fuera del sticky, antes de la galería, para reducir el ruido durante el scroll.
- Las cards del catálogo usan exclusivamente thumbnails editoriales 4:3 en `public/images/program-thumbnails/`: ilustraciones 2D descriptivas, personajes simplificados, fondo azul institucional y acentos oro. Las fichas individuales conservan sus fotografías académicas originales.
- El hero de cada programa integra breadcrumb, título, acciones, fotografía y metadata en un bloque compacto. En escritorio ocupa cerca del 70% del viewport, la imagen es full-bleed y comparte el plano con un corte editorial; en móvil la fotografía ocupa el fondo inicial y el contenido se superpone sobre un degradado vertical oscuro-a-transparente. El rail de metadata conserva una cuadrícula 2×2 debajo de la imagen. Las cards del catálogo y la imagen de campus mantienen sus encuadres editoriales uniformes.
- Las fotografías informativas de Inicio y Campus conservan su proporción intrínseca; no se fuerzan dentro de un marco más alto con `object-cover`. El recorte editorial queda reservado para fondos full-bleed como los héroes.
- Datos cortos relacionados deben usar una cuadrícula 2×2, lista dividida o rail horizontal antes que cards verticales independientes.
- Los acordeones de orientación usan filas móviles compactas de al menos 56 px de alto y 12 px de padding; desde tablet recuperan la composición vertical de 20 px.

## Accesibilidad e interacción

- Estados `hover`, `focus-visible`, teclado y touch deben conducir a la misma información.
- Los objetivos táctiles mantienen al menos 44×44 px.
- El contenido no puede depender solo de hover.
- Las pestañas declaran `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls` y foco gestionado.
- Se respeta `prefers-reduced-motion`; las animaciones existentes no deben bloquear navegación ni lectura.
- El botón flotante de WhatsApp usa `safe-area-inset-bottom` y un tamaño móvil de 48 px para no tapar controles.

## Motion y microinteracciones

- Las fichas de programa usan GSAP y `ScrollTrigger` dentro de `ProgramMotionShell`; nunca se registra motion desde un Server Component.
- Inicio, Quiénes somos y Campus usan `SiteMotionShell`; el mini héroe compartido encapsula su propia animación en `PageHeroMotionShell`. Framer Motion sigue reservado para transiciones de carrusel o estado y GSAP para movimiento ligado al scroll.
- Las entradas generales de scroll usan desplazamiento y escala breve con opacidad fija al 100%. El resumen editorial de “La carrera” es la excepción intencional: sus palabras progresan de 14% a 100% de opacidad mediante scrub. No se usa smooth-scroll artificial ni se bloquea el scroll nativo.
- `prefers-reduced-motion` elimina parallax, scrub y marquee, manteniendo todo el contenido visible y navegable.
- El recorrido 360 inicia bloqueado: wheel y touch desplazan la página hasta que la persona lo activa mediante click o teclado. `Escape`, salir con el puntero o abandonar pantalla completa recuperan el bloqueo; touch conserva un control visible.
- La subnavegación de la ficha es sticky, marca la sección activa con `aria-current` y muestra el progreso de lectura sin alterar las anclas semánticas.
- Las cards de programa son clicables en toda su superficie. El enlace general es hermano del CTA de informes para evitar enlaces anidados y conservar acciones independientes.
- Hover y focus-visible comparten escala, desplazamiento, línea de acento y cambio de contraste; touch conserva el mismo acceso al contenido mediante click o controles nativos.
- El plan de estudios forma parte del scroll nativo de la página: no usa pin, viewport interno, barra secundaria ni intercepta wheel/touch. La secuencia usa aire vertical compacto y simétrico (24 px en móvil, hasta 40 px en escritorio). La tarjeta elegida se expande a todo el ancho y las vecinas permanecen más estrechas, pero todas conservan siempre el 100% de opacidad y saturación. Un botón semántico que ocupa cada cabecera conserva la equivalencia de click, touch y teclado sin competir con la navegación por anclas.

## Verificación

- Ejecutar `npm.cmd run lint`, `npm.cmd run test:frontend` y `npm.cmd run build`.
- Revisar 390×844, 768×1024 y 1440×960.
- En cada ficha comprobar: H1, metadata 2×2, resumen colapsable, pestañas, navegación por teclado, plan de estudios, ausencia de overflow y enlace contextual de WhatsApp.
- Auditar las rutas del sitemap en móvil y revisar errores de consola.
