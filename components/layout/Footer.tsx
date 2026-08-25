import { TransitionLink } from "@/components/motion/PageTransition";
import { site, nav, whatsappLink, telLink, mailLink } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";

const socialIcons: Record<string, string> = {
  whatsapp: "MessageCircle",
  instagram: "Sparkles",
  facebook: "Users",
  linkedin: "Users",
  x: "X",
  github: "Code2",
};

export function Footer() {
  const year = new Date().getFullYear();
  // WhatsApp, email and phone already appear as labelled links above, so the
  // icon row only earns its place once there are other profiles to show.
  // Without this it renders as a single unexplained bubble under the links.
  const socials = Object.entries(site.social).filter(
    ([key, url]) => Boolean(url) && key !== "whatsapp"
  );

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      {/* The brand gradient hairline that starts the footer. */}
      <div className="h-px w-full [background:var(--gradient-brand)] opacity-70" />
      <div className="dot-matrix pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-6 sm:pb-10 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo size={48} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.subline}. We build websites, apps, AI agents and automation
              for businesses that want to grow online.
            </p>
            <p className="mt-5 font-display text-lg font-semibold tracking-tight text-gradient">
              {site.tagline}
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Services</h3>
            <ul className="space-y-1">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <TransitionLink
                    href={`/services/${s.id}`}
                    className="-my-1 inline-flex min-h-[36px] items-center text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.short}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Company</h3>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.label}>
                  <TransitionLink
                    href={n.href}
                    className="-my-1 inline-flex min-h-[36px] items-center text-sm text-muted transition-colors hover:text-ink"
                  >
                    {n.label}
                  </TransitionLink>
                </li>
              ))}

            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={mailLink} className="group flex min-h-[40px] items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink">
                  <Icon name="Mail" className="h-4 w-4 text-blue-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={telLink} className="group flex min-h-[40px] items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink">
                  <Icon name="Phone" className="h-4 w-4 text-blue-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[40px] items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Icon name="MessageCircle" className="h-4 w-4 text-status-live" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-all hover:border-gold-500/50 hover:text-gold-300"
                  >
                    <Icon name={socialIcons[key] ?? "Sparkles"} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brandName}. All rights reserved.
          </p>
          <p className="font-mono tracking-wider">{site.subline.toUpperCase()}</p>
        </div>
      </div>
    </footer>
  );
}
