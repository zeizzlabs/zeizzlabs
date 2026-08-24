# Brand assets

The official ZeizzLabs artwork lives here and drives the whole site.

| File | Size | Used for |
| --- | --- | --- |
| `zeizzlabs-mark.png` | 1024×1024, transparent | **Primary mark.** Navbar, footer, mobile menu, closing CTA, favicon |
| `zeizzlabs-logo.png` | 1536×1024 | Full brand board — social/OG image |
| `zeizzlabs-emblem.png` | 1254×1254 | Legacy circular badge (no longer used in the UI) |
| `zeizzlabs-wordmark.png` | — | **Optional.** See below |

## Using the real wordmark image

The site currently type-sets "ZeizzLabs" next to the mark. To use the actual
wordmark artwork instead:

1. Export the wordmark with a **transparent background** (a white-on-white PNG
   will not work — the letters are white, so keying out the background erases
   the letters too). A PNG with real alpha, or a light-on-dark export, is fine.
2. Save it here as `zeizzlabs-wordmark.png`.
3. In [`components/brand/Logo.tsx`](../../components/brand/Logo.tsx), set
   `USE_WORDMARK_IMAGE = true`.

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
