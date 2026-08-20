import Link from "next/link";
import { site, nav } from "@/content/site";
import { Logo } from "@/components/brand/Logo";

const socials: Array<{ key: keyof typeof site.social; label: string }> = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X" },
  { key: "facebook", label: "Facebook" },
  { key: "github", label: "GitHub" },
  { key: "whatsapp", label: "WhatsApp" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = socials.filter((s) => site.social[s.key]);
  return (
    <footer className="relative mt-24 border-t border-line">
      {/* Animated gradient hairline */}
      <div className="h-px w-full [background:var(--gradient-brand)] bg-[length:200%_auto] animate-sweep opacity-70" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div
          className={
            activeSocials.length
              ? "grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]"
              : "grid gap-12 md:grid-cols-[1.6fr_1fr]"
          }
        >
          <div className="flex flex-col gap-4">
            <Logo variant="emblem" size={44} />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              <span className="uppercase tracking-[0.18em] text-faint">
                {site.positioning}
              </span>
              <br />
              {site.tagline}
            </p>
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${site.email}`}
                className="w-fit text-sm font-medium text-ink transition-colors hover:text-blue"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="w-fit text-sm font-medium text-ink tabular-nums transition-colors hover:text-blue"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              Explore
            </span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {activeSocials.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                Connect
              </span>
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={site.social[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-sm text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {site.brandName}. Everything digital. Endless possibilities.
          </p>
          <p className="text-faint/80">Built in the lab.</p>
        </div>
      </div>
    </footer>
  );
}
