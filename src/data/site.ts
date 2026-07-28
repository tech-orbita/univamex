import type { NavItem, ProgramArea, ProgramLevel } from "@/types/content";

export const siteConfig = {
  name: "UNIVAMEX",
  fullName: "Colegio Universitario del Valle de México - UNIVAMEX",
  phone: "55-80-82-57-96",
  whatsappDisplay: "55-29-94-53-81",
  whatsappNumber: "525529945381",
  email: "informes@univamex.edu.mx",
  website: "www.univamex.com",
  baseUrl: "https://www.univamex.com",
  serviceHours: "Lunes a sábado, de 8:00 a 18:00 h",
};

export const socialLinks = [
  {
    platform: "Facebook",
    brand: "facebook",
    handle: siteConfig.fullName,
    href: "https://www.facebook.com/Universitariodelvalledemexico",
  },
  {
    platform: "Instagram",
    brand: "instagram",
    handle: "@univamex_oficial",
    href: "https://www.instagram.com/univamex_oficial/",
  },
] as const;

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Oferta académica", href: "/oferta-academica" },
  { label: "Admisiones", href: "/admisiones" },
  { label: "Campus", href: "/campus" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNavItems: NavItem[] = [
  ...navItems,
  { label: "Universidad en Ecatepec", href: "/universidad-en-ecatepec" },
  { label: "RVOE", href: "/rvoe" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Recorrido 360", href: "/recorrido-360" },
];

export const levels: ProgramLevel[] = [
  "Bachillerato",
  "Licenciatura",
  "Maestría",
  "Doctorado",
];

export const areas: ProgramArea[] = [
  "Tecnología",
  "Negocios",
  "Derecho y seguridad",
  "Educación y desarrollo humano",
  "Creatividad y medios",
  "Turismo y servicios",
  "Impacto social",
];



