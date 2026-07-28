import { cn } from "@/lib/utils";

type BrandIconProps = {
  brand: "facebook" | "instagram";
  className?: string;
};

export function BrandIcon({ brand, className }: BrandIconProps) {
  if (brand === "facebook") {
    return (
      <svg
        aria-hidden="true"
        className={cn("h-5 w-5", className)}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.436H7.078v-3.491h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.972h-1.513c-1.49 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.491h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        height="19"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
        width="19"
        x="2.5"
        y="2.5"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.7" fill="currentColor" r="1.25" />
    </svg>
  );
}
