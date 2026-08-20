import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { systemNodes } from "@/content/products";

// Label placement pushes each node's text OUTWARD from the brain, so the
// connector line to the icon is never crossed by the label and the layout
// stays symmetric: top→above, bottom→below, left column→left, right column→right.
const labelPlacement = {
  top: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "absolute top-full left-1/2 -translate-x-1/2 mt-2",
  left: "absolute right-full top-1/2 -translate-y-1/2 mr-2",
  right: "absolute left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

export function AiAutomation() {
  // Six nodes around a central brain (desktop radial layout). `label` is the
  // side the text sits on, matched to the node's position for symmetry.
  const positions = [
    { top: "6%", left: "50%", label: "top" }, // AI — top centre
    { top: "28%", left: "90%", label: "right" }, // Data — top right
    { top: "72%", left: "90%", label: "right" }, // APIs — bottom right
    { top: "94%", left: "50%", label: "bottom" }, // Automation — bottom centre
    { top: "72%", left: "10%", label: "left" }, // Apps — bottom left
    { top: "28%", left: "10%", label: "left" }, // Users — top left
  ] as const;

  return (
    <Section id="ai">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="AI & Automation"
            title={
              <>
                One brain, wired to <span className="text-gradient">everything.</span>
              </>
            }
            intro="We connect AI, data, APIs, apps, and people into systems that actually do the work — retrieval-grounded answers, automated workflows, and tools that talk to each other."
          />
          <ul className="mt-8 flex flex-col gap-3">
            {[
              "AI agents grounded in your own data and docs",
              "Automations that remove manual steps between tools",
              "APIs and databases wired into one coherent system",
            ].map((line, i) => (
              <Reveal as="li" key={line} delay={i * 70} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.06] text-status-live">
                  <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                <span className="text-sm leading-relaxed text-muted">{line}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Desktop radial diagram */}
        <Reveal className="hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* connectors */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                {/* userSpaceOnUse is essential: with the default
                    objectBoundingBox units, a perfectly vertical or horizontal
                    line has a zero-area bounding box, the gradient degenerates,
                    and the stroke renders as nothing — which is exactly why the
                    AI (top) and Automation (bottom) connectors were invisible. */}
                <linearGradient
                  id="conn"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                >
                  <stop stopColor="#149bff" />
                  <stop offset="1" stopColor="#d52bff" />
                </linearGradient>
              </defs>
              {positions.map((p, i) => {
                const x = parseFloat(p.left);
                const y = parseFloat(p.top);
                return (
                  <g key={i}>
                    {/* faint static rail so the connection always reads, even
                        between dashes of the animated line */}
                    <line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="url(#conn)"
                      strokeWidth="1.4"
                      vectorEffect="non-scaling-stroke"
                      opacity="0.22"
                    />
                    {/* animated dashed line — non-scaling stroke keeps the
                        vertical lines (AI top / Automation bottom) as visible
                        as the diagonal ones */}
                    <line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="url(#conn)"
                      strokeWidth="1.4"
                      vectorEffect="non-scaling-stroke"
                      className="animate-dash"
                      opacity="0.9"
                    />
                    {/* endpoint dot at each node */}
                    <circle cx={x} cy={y} r="1.1" fill="#149bff" opacity="0.9" />
                  </g>
                );
              })}
            </svg>

            {/* central brain */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-24 w-24 place-items-center rounded-2xl border border-line-strong glass">
                <div className="absolute inset-0 -z-10 rounded-2xl blur-xl [background:radial-gradient(circle,rgba(108,53,255,0.5),transparent_70%)]" />
                <Icon name="BrainCircuit" className="h-9 w-9 text-ink" />
              </div>
            </div>

            {/* orbit nodes — the icon box is centred exactly on the connector
                endpoint; the label sits on the outward side (see labelPlacement) */}
            {systemNodes.map((node, i) => (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: positions[i].top, left: positions[i].left }}
              >
                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-blue">
                    <Icon name={node.icon} className="h-5 w-5" />
                  </span>
                  <span
                    className={`${labelPlacement[positions[i].label]} whitespace-nowrap text-[11px] font-medium text-muted`}
                  >
                    {node.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile / tablet fallback — a clean chip grid, no absolute positioning */}
        <div className="grid grid-cols-3 gap-3 lg:hidden">
          <div className="col-span-3 mb-1 flex items-center justify-center gap-2 rounded-card border border-line-strong glass py-4">
            <Icon name="BrainCircuit" className="h-6 w-6 text-ink" />
            <span className="font-display font-semibold text-ink">Digital brain</span>
          </div>
          {systemNodes.map((node) => (
            <div
              key={node.id}
              className="flex flex-col items-center gap-2 rounded-card border border-line bg-surface/60 py-4"
            >
              <Icon name={node.icon} className="h-5 w-5 text-blue" />
              <span className="text-xs font-medium text-muted">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
