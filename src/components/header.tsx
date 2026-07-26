"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;
  const logoSrc = transparent
    ? "/logos/Logo Horizontal/blanco.png"
    : "/logos/Logo Horizontal/azul.png";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        transparent
          ? "border-white/10 bg-transparent text-white"
          : "border-[#d9e0ec] bg-white/95 text-[#04215e] shadow-lg shadow-slate-950/5 backdrop-blur-md",
      )}
      initial={reduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex min-h-[4.25rem] w-full items-center gap-3 px-3 sm:min-h-[5.25rem] sm:gap-4 sm:px-6 lg:gap-6 lg:px-7 2xl:px-8">
        <Link
          href="/"
          className="group relative flex h-12 w-[11rem] shrink-0 items-center overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:h-20 sm:w-[18rem]"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={logoSrc}
            alt={`${siteConfig.name} Colegio Universitario`}
            fill
            priority
            sizes="(min-width: 640px) 288px, 176px"
            className="object-cover object-center"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden min-w-0 flex-1 xl:block">
          <ul className="flex items-center justify-center gap-0.5 2xl:gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "inline-flex min-h-11 items-center whitespace-nowrap px-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] 2xl:px-4",
                      active
                        ? transparent
                          ? "text-white"
                          : "text-[#04215e]"
                        : transparent
                          ? "text-white/78 hover:bg-white/10 hover:text-white"
                          : "text-[#04215e]/72 hover:bg-[#04215e]/6 hover:text-[#04215e]",
                    )}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 xl:block">
          <WhatsAppButton
            className="min-h-11 border-current px-5 py-3 text-sm"
            label="Solicitar informes"
            source="Header"
            variant="secondary"
          />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center border p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] xl:hidden",
            transparent
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-[#d9e0ec] text-[#04215e] hover:bg-[#04215e]/6",
          )}
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-x-0 top-[4.25rem] z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-y border-[#d9e0ec] bg-white px-3 py-3 text-[#04215e] shadow-xl shadow-slate-950/10 sm:top-[5.25rem] sm:max-h-[calc(100dvh-5.25rem)] sm:py-5 xl:hidden"
            initial={reduceMotion ? false : { y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Navegación móvil">
              <ul className="grid">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "flex min-h-11 items-center border-b border-[#d9e0ec] px-1 text-sm font-bold transition hover:bg-[#04215e]/6 sm:min-h-12",
                        item.href === "/"
                          ? pathname === item.href
                            ? "text-[#04215e]"
                            : "text-[#04215e]/72"
                          : pathname.startsWith(item.href)
                          ? "text-[#04215e]"
                          : "text-[#04215e]/72",
                      )}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 sm:mt-5">
                <WhatsAppButton
                  className="w-full border-[#04215e] px-4 text-[#04215e]"
                  label="Solicitar informes"
                  source="Header movil"
                  variant="secondary"
                />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
