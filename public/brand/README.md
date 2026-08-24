# Brand assets

The official ZeizzLabs artwork lives here and drives the whole site.

| File | Size | Used for |
| --- | --- | --- |
| `zeizzlabs-mark.png` | 1024×1024, transparent | **Primary mark.** Navbar, footer, mobile menu, closing CTA, favicon |
| `zeizzlabs-logo.png` | 1536×1024 | Full brand board — social/OG image |
| `zeizzlabs-emblem.png` | 1254×1254 | Legacy circular badge (no longer used in the UI) |
| `zeizzlabs-wordmark.png` | 1200×349, transparent | **The wordmark.** Header lockup + footer sign-off |
| `zeizzlabs-mark-alt.png` | 1183×946, transparent | Spare copy of the monogram — safe to delete |

## The wordmark

`zeizzlabs-wordmark.png` is auto-detected — if the file is present it is used,
and if it is removed the site falls back to type-setting the name in Poppins
ExtraBold with a metallic gradient. No code change either way.

Replacing it: the export **must have a real alpha channel**, and should be
trimmed of transparent margin (the layout controls the spacing, not the file).
To re-optimise any new export, run:

```bash
npm run brand:wordmark -- path/to/export.png
```

That trims, resizes to 1200px wide and writes it here. If the ratio changes
noticeably from 3.438:1, update `WORDMARK_W` / `WORDMARK_H` in
[`components/brand/Logo.tsx`](../../components/brand/Logo.tsx) so Next.js
reserves the right box.

## Swapping any artwork (zero code changes)

Overwrite a file keeping the **exact same filename**. To change the file type or
path, update the constants at the top of `components/brand/Logo.tsx`:

```ts
const MARK_SRC     = "/brand/zeizzlabs-mark.png";
const WORDMARK_SRC = "/brand/zeizzlabs-wordmark.png";
const BOARD_SRC    = "/brand/zeizzlabs-logo.png";
```

## Favicons

`app/icon.png` and `app/apple-icon.png` are the mark composited onto the site's
`#04060c` ground. Regenerate them if the mark changes — a transparent favicon
disappears on light browser chrome.
