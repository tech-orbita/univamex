import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  label?: string;
  program?: string;
  source?: string;
  question?: string;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "floating"
    | "light"
    | "accent";
  className?: string;
  icon?: "message" | "whatsapp";
};

const variants = {
  primary:
    "bg-[#04215e] text-white shadow-sm shadow-slate-950/10 hover:bg-[#0b327f]",
  secondary:
    "border border-current bg-transparent text-current backdrop-blur hover:border-[#e7a928] hover:bg-white/10",
  ghost: "text-[#04215e] hover:bg-[#04215e]/6",
  floating:
    "bg-[#04215e] text-white shadow-lg shadow-slate-950/20 hover:bg-[#0b327f]",
  light:
    "border border-white bg-white text-[#04215e] shadow-sm shadow-slate-950/10 hover:bg-[#e7eefb]",
  accent:
    "border border-[#e7a928] bg-[#e7a928] text-[#071a3d] shadow-lg shadow-slate-950/20 hover:border-[#f0bd4b] hover:bg-[#f0bd4b]",
};

export function WhatsAppButton({
  label = "Solicitar informes",
  program,
  source,
  question,
  variant = "primary",
  className,
  icon = "message",
}: WhatsAppButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]",
        variants[variant],
        className,
      )}
      href={buildWhatsAppUrl({ program, source, question })}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon === "whatsapp" ? (
        <Image
          aria-hidden="true"
          alt=""
          className="h-8 w-8"
          height={512}
          src="/icons/whatsapp.png"
          width={512}
        />
      ) : (
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
      )}
      <span>{label}</span>
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-40 sm:bottom-6 sm:right-6">
      <WhatsAppButton
        className="h-12 w-12 !rounded-full !bg-transparent !p-0 shadow-xl shadow-slate-950/25 transition-transform hover:scale-105 sm:h-16 sm:w-16 [&>img]:h-full [&>img]:w-full [&>span]:sr-only"
        icon="whatsapp"
        label="Solicitar informes por WhatsApp"
        source="Acceso flotante"
        variant="floating"
      />
    </div>
  );
}



