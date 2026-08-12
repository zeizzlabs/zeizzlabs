# ZeizzLabs — Digital Creation & Innovation

The ZeizzLabs studio website. Dark, premium, built around the official brand
identity. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

**Everything digital. Endless possibilities.**

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| Path | What |
| --- | --- |
| `content/site.ts` | Brand config + navigation |
| `content/capabilities.ts` | "What We Create" universe (add categories freely) |
| `content/lab.ts` | THE LAB experiments |
| `content/work.ts` | Case-study projects (labelled honestly) |
| `content/products.ts` | Product ecosystem, process steps, AI system nodes |
| `components/sections/*` | One file per homepage section |
| `components/ui/*` | Reusable primitives (Button, SectionHeading, Reveal, …) |
| `components/brand/Logo.tsx` | Logo — swap artwork in `public/brand/` |
| `lib/types.ts` | Single source of truth for all content shapes |

**The site is a data layer + component system.** To add a capability, an
experiment, a project, or a product, push an object into the relevant array in
`content/` — no component changes needed.

## Brand assets

The official artwork is in `public/brand/`. See
[`public/brand/README.md`](public/brand/README.md) to swap it (zero code
changes if you keep the filenames).

## Contact form

`POST /api/contact` validates with the shared Zod schema and is Resend-ready.
Without env vars it validates + logs (so the form works in dev). To send email:

```bash
RESEND_API_KEY=...        # enables delivery
CONTACT_TO=you@domain     # optional, defaults to hello@zeizzlabs.com
CONTACT_FROM="ZeizzLabs <hello@yourdomain>"  # optional, must be a verified sender
```

Swap the delivery block in `app/api/contact/route.ts` for a CRM, database, or
webhook without touching the client.

## Optional environment variables

Set these to override brand defaults (all have safe fallbacks):
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and the social URLs
(`NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, etc.).

## Accessibility & performance

Semantic HTML, skip-link, keyboard-navigable, visible focus rings, `alt` text,
and full `prefers-reduced-motion` support. Motion is CSS + a small
IntersectionObserver — no animation library — to keep the bundle lean.
