import Link from "next/link";
import Image from "next/image";
import { Clock3, Mail, Phone } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { footerNavItems, siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 py-9 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Image
            src="/logos/Logo Horizontal/blanco.png"
            alt="UNIVAMEX"
            width={210}
            height={60}
            className="h-auto w-44"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            {siteConfig.fullName}. Decídete a llegar más lejos estudiando lo
            que te apasiona.
          </p>
          <div className="mt-4 sm:mt-6">
            <WhatsAppButton
              label="Solicitar informes"
              source="Footer"
              variant="floating"
            />
          </div>
          <div
            aria-label="Redes sociales oficiales"
            className="mt-4 flex flex-wrap gap-2"
            role="group"
          >
            {socialLinks.map((social) => (
              <a
                aria-label={`Abrir ${social.platform} oficial de UNIVAMEX`}
                className="group inline-flex min-h-11 items-center gap-2 border border-white/20 px-3 text-sm font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-[#e7a928] hover:bg-white hover:text-[#04215e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
                href={social.href}
                key={social.platform}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BrandIcon
                  brand={social.brand}
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                />
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-300">
            Navegación
          </h2>
          <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm text-slate-300 transition hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-300">
            Contacto
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300 sm:mt-4 sm:space-y-3">
            <li className="flex gap-2">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <a className="transition hover:text-white" href={`tel:${siteConfig.phone.replaceAll("-", "")}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <a className="transition hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex gap-2">
              <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4" />
              <span>{siteConfig.serviceHours}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}



