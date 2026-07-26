export type ProgramStory = {
  summary: string;
  fit: string[];
  aiLead: string;
  profileLead: string;
  careerLead: string;
};

const stories: Record<string, ProgramStory> = {
  "bachillerato-informatica-administrativa": {
    summary:
      "Una ruta de bachillerato técnico para entender cómo se organizan los negocios y cómo la tecnología puede hacer más claros, rápidos y confiables sus procesos.",
    fit: [
      "Te interesa combinar administración, computación y herramientas digitales desde el bachillerato.",
      "Disfrutas ordenar información, resolver problemas prácticos y aprender con proyectos concretos.",
      "Quieres llegar a estudios profesionales con una base técnica y administrativa útil.",
    ],
    aiLead:
      "La inteligencia artificial aparece como apoyo para leer información, automatizar tareas y tomar mejores decisiones en operaciones cotidianas.",
    profileLead:
      "Al terminar, tendrás una base para trabajar con información administrativa, herramientas digitales y soporte operativo.",
    careerLead:
      "Tu primera experiencia puede ocurrir en áreas administrativas, contables, de inventarios, soporte y comercio digital.",
  },
  "bachillerato-trabajo-social": {
    summary:
      "Una formación técnica para observar problemáticas sociales, comprender a las comunidades y participar en proyectos de bienestar con sensibilidad y método.",
    fit: [
      "Te importa escuchar a las personas y comprender las condiciones que afectan su bienestar.",
      "Te interesa colaborar con instituciones, comunidades y proyectos de impacto social.",
      "Buscas una formación práctica que conecte derechos humanos, investigación y servicio.",
    ],
    aiLead:
      "Las herramientas de IA pueden ayudar a organizar diagnósticos, mapear necesidades y dar seguimiento a proyectos comunitarios sin sustituir la mirada humana.",
    profileLead:
      "Desarrollarás bases para identificar necesidades, comunicarte con distintos grupos y apoyar la gestión de programas sociales.",
    careerLead:
      "La formación se relaciona con escuelas, centros de salud, casas hogar, organismos públicos y organizaciones sociales.",
  },
  "bachillerato-turismo": {
    summary:
      "Un bachillerato técnico que conecta hospitalidad, gastronomía, idiomas y operación turística para convertir la atención al visitante en experiencias bien organizadas.",
    fit: [
      "Te gusta atender personas, descubrir destinos y cuidar los detalles de una experiencia.",
      "Quieres explorar hotelería, alimentos, agencias de viajes, eventos o promoción turística.",
      "Te interesa aprender haciendo y desarrollar habilidades de servicio e idiomas.",
    ],
    aiLead:
      "La IA puede apoyar la planeación de rutas, la comunicación con visitantes, la promoción de destinos y la gestión de reservaciones.",
    profileLead:
      "Construirás bases para operar servicios turísticos, comunicar destinos y participar en experiencias de hospitalidad.",
    careerLead:
      "El campo inicial incluye hoteles, restaurantes, agencias, transporte turístico, museos y organización de eventos.",
  },
  "licenciatura-administracion": {
    summary:
      "Una licenciatura para entender cómo funcionan las organizaciones, coordinar recursos y convertir la información en decisiones que mejoren el trabajo de los equipos.",
    fit: [
      "Te interesa organizar personas, recursos y procesos para que una organización avance.",
      "Quieres entender finanzas, mercadotecnia, recursos humanos, logística y emprendimiento.",
      "Te atrae resolver problemas empresariales con análisis y criterio práctico.",
    ],
    aiLead:
      "La IA se integra como apoyo para analizar operaciones, automatizar reportes, planear recursos y encontrar oportunidades de mejora.",
    profileLead:
      "Desarrollarás una mirada integral para dirigir equipos, interpretar información financiera y diseñar mejoras estratégicas.",
    careerLead:
      "Podrás orientarte hacia administración, recursos humanos, finanzas, logística, consultoría o proyectos propios.",
  },
  "licenciatura-arquitectura": {
    summary:
      "Una ruta profesional para imaginar, representar y desarrollar espacios que respondan a necesidades humanas, técnicas y urbanas.",
    fit: [
      "Te interesa transformar ideas en espacios y disfrutas observar cómo viven las personas.",
      "Te atraen el dibujo, la representación, los materiales y la resolución espacial.",
      "Buscas combinar creatividad con precisión técnica y responsabilidad profesional.",
    ],
    aiLead:
      "La IA puede acompañar la exploración de alternativas, la visualización y el análisis de información del proyecto, siempre bajo criterio de diseño.",
    profileLead:
      "Construirás bases para desarrollar propuestas espaciales, comunicar decisiones y trabajar con procesos de diseño arquitectónico.",
    careerLead:
      "La formación se proyecta hacia despachos, construcción, visualización, supervisión, interiorismo y gestión de proyectos.",
  },
  "comercio-negocios-internacionales": {
    summary:
      "Una licenciatura para comprender cómo se mueven los productos, las empresas y las decisiones comerciales en mercados conectados.",
    fit: [
      "Te interesan los negocios, los mercados, las culturas y la negociación.",
      "Quieres comprender logística, comercio exterior, finanzas y estrategias comerciales.",
      "Te motiva trabajar con información para detectar oportunidades entre organizaciones y mercados.",
    ],
    aiLead:
      "La IA puede apoyar la investigación de mercados, la lectura de tendencias, la clasificación de información y la planeación logística.",
    profileLead:
      "Desarrollarás criterio para analizar operaciones comerciales, negociar y coordinar procesos que cruzan fronteras.",
    careerLead:
      "El campo laboral se relaciona con comercio exterior, compras, logística, ventas, aduanas y desarrollo de negocios.",
  },
  "comunicacion-medios-digitales": {
    summary:
      "Una licenciatura para investigar, contar historias y producir mensajes que funcionen en medios audiovisuales, digitales y organizacionales.",
    fit: [
      "Te interesa escribir, investigar, producir contenido y entender cómo circulan los mensajes.",
      "Quieres combinar creatividad, análisis y herramientas de comunicación digital.",
      "Te atrae trabajar con audiencias, medios, marcas, instituciones o proyectos culturales.",
    ],
    aiLead:
      "La IA puede apoyar la investigación, la ideación, la edición y el análisis de audiencias sin reemplazar la intención ni la responsabilidad del comunicador.",
    profileLead:
      "Desarrollarás habilidades para construir mensajes, producir contenidos y tomar decisiones de comunicación con contexto.",
    careerLead:
      "Podrás participar en medios, agencias, comunicación institucional, producción audiovisual, contenidos digitales y proyectos culturales.",
  },
  "criminologia-criminalistica": {
    summary:
      "Una licenciatura para estudiar el delito desde sus dimensiones sociales, jurídicas y técnicas, con atención a la investigación y la prevención.",
    fit: [
      "Te interesa comprender las causas, evidencias y consecuencias de los fenómenos delictivos.",
      "Tienes curiosidad por la investigación, el análisis y el trabajo metódico.",
      "Buscas una formación que conecte sociedad, derecho, seguridad y observación técnica.",
    ],
    aiLead:
      "La IA puede apoyar la organización de evidencia, el análisis de patrones y la investigación documental con controles éticos y metodológicos.",
    profileLead:
      "Desarrollarás bases para observar, documentar y analizar fenómenos relacionados con criminología y criminalística.",
    careerLead:
      "La formación puede vincularse con investigación, seguridad, prevención, análisis de información y apoyo pericial.",
  },
  "licenciatura-derecho": {
    summary:
      "Una licenciatura para interpretar normas, construir argumentos y acompañar la resolución de conflictos con responsabilidad jurídica y social.",
    fit: [
      "Te interesa analizar situaciones, defender argumentos y comprender cómo funciona la justicia.",
      "Disfrutas leer, investigar y comunicar ideas con precisión.",
      "Quieres participar en la solución de conflictos desde una perspectiva jurídica.",
    ],
    aiLead:
      "La IA puede ayudar a localizar información, ordenar expedientes y comparar documentos, siempre con revisión profesional y confidencialidad.",
    profileLead:
      "Construirás herramientas para interpretar normas, argumentar, investigar y comunicar alternativas jurídicas.",
    careerLead:
      "Podrás orientarte hacia litigio, asesoría, empresas, instituciones públicas, cumplimiento y mediación.",
  },
  "diseno-grafico-multimedia": {
    summary:
      "Una licenciatura para convertir ideas en sistemas visuales, piezas multimedia y experiencias que comuniquen con intención.",
    fit: [
      "Te interesa resolver problemas de comunicación mediante imagen, tipografía, movimiento y composición.",
      "Quieres aprender a trabajar con herramientas digitales y proyectos visuales.",
      "Te motiva construir conceptos y convertirlos en piezas concretas para distintas audiencias.",
    ],
    aiLead:
      "La IA puede acelerar la exploración de conceptos, variaciones visuales y referencias, mientras la dirección creativa permanece en manos del diseñador.",
    profileLead:
      "Desarrollarás criterio para investigar, conceptualizar y producir soluciones gráficas y multimedia.",
    careerLead:
      "El campo laboral incluye estudios de diseño, agencias, comunicación interna, producción audiovisual, editorial y trabajo independiente.",
  },
  "ingenieria-arte-digital-videojuegos": {
    summary:
      "Una ingeniería que cruza programación, diseño visual, narrativa e interacción para crear experiencias digitales y videojuegos.",
    fit: [
      "Te interesan la tecnología, la creatividad y la construcción de mundos interactivos.",
      "Quieres entender cómo se diseña y desarrolla una experiencia digital de principio a fin.",
      "Te gusta experimentar con código, imagen, sonido, narrativa y trabajo colaborativo.",
    ],
    aiLead:
      "La IA puede apoyar prototipos, comportamiento de personajes, exploración visual y análisis de experiencia dentro de proyectos digitales.",
    profileLead:
      "Desarrollarás bases para participar en equipos de arte, programación, diseño de interacción y producción de experiencias.",
    careerLead:
      "Podrás colaborar en videojuegos, animación, experiencias interactivas, contenidos digitales, simulación y producción multimedia.",
  },
  "ingenieria-ia-big-data": {
    summary:
      "Una ingeniería para convertir datos en sistemas inteligentes, combinando programación, análisis, modelos de IA y criterio para resolver problemas reales.",
    fit: [
      "Te interesa entender cómo aprenden los sistemas y cómo los datos pueden mejorar decisiones.",
      "Disfrutas las matemáticas, la programación y la experimentación con tecnología.",
      "Quieres construir soluciones inteligentes con impacto en organizaciones y personas.",
    ],
    aiLead:
      "La inteligencia artificial no aparece como adorno: se estudia para modelar información, automatizar procesos y construir soluciones evaluables.",
    profileLead:
      "Desarrollarás bases para programar, analizar datos, evaluar modelos y comunicar decisiones técnicas.",
    careerLead:
      "El campo laboral incluye datos, software, automatización, analítica, producto digital, consultoría y áreas de innovación.",
  },
  "ingenieria-sistemas-computacionales": {
    summary:
      "Una ingeniería para diseñar, construir y mantener sistemas computacionales que sostienen operaciones, servicios y productos digitales.",
    fit: [
      "Te interesa resolver problemas mediante programación, infraestructura y pensamiento lógico.",
      "Quieres comprender cómo se conectan el software, los datos, las redes y las organizaciones.",
      "Te motiva aprender tecnología con una mirada práctica y de largo plazo.",
    ],
    aiLead:
      "La IA puede apoyar la automatización, las pruebas, la detección de patrones y la optimización de sistemas computacionales.",
    profileLead:
      "Desarrollarás bases para analizar requerimientos, programar soluciones y participar en la evolución de sistemas.",
    careerLead:
      "Podrás orientarte hacia desarrollo de software, soporte, infraestructura, bases de datos, seguridad y gestión tecnológica.",
  },
  "mercadotecnia-digital-redes-sociales": {
    summary:
      "Una licenciatura para diseñar estrategias digitales, comprender audiencias y conectar marcas, contenidos y resultados medibles.",
    fit: [
      "Te interesa entender por qué las personas eligen, comparten y recuerdan ciertas marcas.",
      "Quieres combinar creatividad, comunicación, análisis y herramientas digitales.",
      "Te atrae planear campañas, contenidos y experiencias en medios digitales.",
    ],
    aiLead:
      "La IA puede apoyar segmentación, investigación, generación de variantes y lectura de resultados sin reemplazar la estrategia ni la responsabilidad de marca.",
    profileLead:
      "Desarrollarás criterio para investigar audiencias, planear campañas, construir mensajes y evaluar resultados.",
    careerLead:
      "El campo laboral incluye agencias, marcas, comercio electrónico, contenidos, redes sociales, comunicación y emprendimiento.",
  },
  "licenciatura-pedagogia": {
    summary:
      "Una licenciatura para comprender cómo aprenden las personas y diseñar experiencias, programas e instituciones educativas con intención.",
    fit: [
      "Te interesa la educación, el desarrollo humano y la manera en que se construye el aprendizaje.",
      "Quieres investigar problemas educativos y diseñar respuestas pertinentes.",
      "Te motiva acompañar procesos de formación en distintos contextos y edades.",
    ],
    aiLead:
      "La IA puede apoyar la creación de recursos, la organización de información y el análisis de experiencias educativas con criterio pedagógico.",
    profileLead:
      "Desarrollarás herramientas para investigar, planear, evaluar y mejorar procesos de enseñanza y aprendizaje.",
    careerLead:
      "Podrás trabajar en escuelas, capacitación, diseño instruccional, gestión educativa, consultoría y proyectos sociales.",
  },
  "licenciatura-psicologia": {
    summary:
      "Una licenciatura para estudiar la conducta y el desarrollo humano desde la investigación, la evaluación y la intervención responsable.",
    fit: [
      "Te interesa comprender cómo piensan, sienten y se relacionan las personas.",
      "Quieres estudiar la conducta con bases teóricas, metodológicas y éticas.",
      "Te atraen los campos clínico, educativo, laboral, social y de la salud.",
    ],
    aiLead:
      "La IA puede apoyar la investigación, el análisis de instrumentos y la organización de información, sin sustituir el juicio profesional.",
    profileLead:
      "Construirás bases para investigar, evaluar y participar en intervenciones psicológicas dentro de contextos definidos.",
    careerLead:
      "La formación se relaciona con organizaciones, escuelas, salud, proyectos comunitarios, investigación y acompañamiento profesional.",
  },
  "licenciatura-turismo": {
    summary:
      "Una licenciatura para diseñar y operar experiencias turísticas que integren destinos, hospitalidad, alimentos, idiomas y gestión.",
    fit: [
      "Te interesa conocer destinos y crear experiencias cuidadas para otras personas.",
      "Quieres combinar administración, servicio, gastronomía, idiomas y promoción.",
      "Te atrae una profesión dinámica con múltiples espacios de trabajo.",
    ],
    aiLead:
      "La IA puede apoyar la planeación turística, la personalización de experiencias, la comunicación con visitantes y el análisis de tendencias.",
    profileLead:
      "Desarrollarás herramientas para planear, operar y promover servicios turísticos con enfoque en calidad.",
    careerLead:
      "El campo laboral incluye hotelería, agencias, gastronomía, transporte, eventos, destinos, museos y emprendimiento turístico.",
  },
  "maestria-juicios-orales": {
    summary:
      "Un posgrado especializado en el sistema penal acusatorio, la argumentación y las técnicas necesarias para intervenir en audiencias orales.",
    fit: [
      "Ya tienes formación jurídica y quieres profundizar en litigación oral.",
      "Te interesa analizar casos, construir teorías y defender argumentos ante distintas audiencias.",
      "Buscas actualizar tu práctica con una mirada técnica, ética y procesal.",
    ],
    aiLead:
      "La IA puede apoyar la investigación normativa, la organización de expedientes y la preparación de hipótesis, con revisión jurídica rigurosa.",
    profileLead:
      "Fortalecerás tu capacidad para analizar casos, argumentar y participar en las distintas etapas del sistema acusatorio.",
    careerLead:
      "La especialización se relaciona con litigio, defensoría, fiscalía, asesoría, investigación y docencia jurídica.",
  },
  "maestria-educacion": {
    summary:
      "Un posgrado para analizar problemas educativos, liderar procesos de innovación y tomar decisiones informadas dentro de instituciones y proyectos.",
    fit: [
      "Ya trabajas o te formas en educación y quieres profundizar tu capacidad de análisis.",
      "Te interesa mejorar instituciones, políticas, prácticas y entornos de aprendizaje.",
      "Quieres conectar investigación, gestión e innovación educativa.",
    ],
    aiLead:
      "La IA puede apoyar el análisis de evidencia, el diseño de escenarios y la gestión del conocimiento dentro de proyectos educativos.",
    profileLead:
      "Desarrollarás herramientas para investigar, planear, evaluar y dirigir procesos de transformación educativa.",
    careerLead:
      "El campo laboral incluye dirección escolar, gestión educativa, consultoría, capacitación, investigación y diseño de políticas.",
  },
  "doctorado-educacion-neurociencias-genero": {
    summary:
      "Un doctorado de investigación para estudiar el aprendizaje desde las neurociencias, la tecnología y una perspectiva de género con impacto educativo y social.",
    fit: [
      "Cuentas con formación de maestría y quieres desarrollar investigación original.",
      "Te interesan el aprendizaje, la neurociencia, la innovación y la inclusión.",
      "Buscas construir conocimiento con rigor metodológico y relevancia social.",
    ],
    aiLead:
      "La IA y el big data pueden apoyar la personalización, el análisis de evidencia y la investigación educativa bajo criterios éticos.",
    profileLead:
      "Desarrollarás capacidad para formular, ejecutar y comunicar investigación doctoral sobre problemas educativos complejos.",
    careerLead:
      "El campo laboral incluye universidades, investigación, docencia de posgrado, política educativa y organizaciones de innovación.",
  },
};

export function getProgramStory(slug: string) {
  const story = stories[slug];

  if (!story) {
    throw new Error(`No existe contenido editorial para el programa ${slug}`);
  }

  return story;
}

export const programStorySlugs = Object.keys(stories);
