# Brand assets

The official ZeizzLabs artwork lives here and drives the whole site.

| File | Used for |
| --- | --- |
| `zeizzlabs-logo.png` | Full brand board — the hero centerpiece (1536×1024) |
| `zeizzlabs-emblem.png` | Circular badge — navbar, mobile menu, footer, favicon (1254×1254) |

## Swapping the artwork (zero code changes)

Overwrite either file, keeping the **exact same filename**. To change file type
or path, update the two constants at the top of
[`components/brand/Logo.tsx`](../../components/brand/Logo.tsx):

```ts
const EMBLEM_SRC = "/brand/zeizzlabs-emblem.png";
const BOARD_SRC  = "/brand/zeizzlabs-logo.png";
```

### Tips
- The badge is clipped to a circle in the UI, so its black canvas corners never
  show. A transparent-background export is nice-to-have but not required.
- These sources are ~1.2 MB each; Next.js optimizes and resizes them per use, so
  the browser never downloads the full file. For best Lighthouse scores you can
  export smaller/transparent versions later — no code change needed.
