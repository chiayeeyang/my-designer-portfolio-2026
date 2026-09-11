# Kristin Yang — Portfolio

The finished portfolio exported as a standalone **React + Vite + Tailwind CSS** project. All application source is JavaScript/JSX; no Next.js, Vinext, Codex, or Sites account is needed to run it.

## Run locally

Install Node.js 22.13 or newer, then open a terminal in this folder:

```bash
npm install
npm run dev
```

Open the local address printed in the terminal (normally http://localhost:5173). Keep the terminal running while editing. Do not open index.html directly from the file system.

## Build and preview

```bash
npm run build
npm run preview
```

The production website is generated in **dist/**. Publish that folder with a static web host. This project uses normal links with pathname-based React rendering; your host must serve index.html for page routes such as /work/01. Netlify's _redirects and a Vercel rewrite configuration are included. For other hosts, enable an equivalent SPA fallback. It is configured for hosting at the domain root.

## Where to edit

- **src/App.jsx** — page routing, document titles, and not-found page.
- **src/pages/** — homepage, work project pages, Not Work gallery, and collection detail pages.
- **src/components/** — all original components and their CSS Modules, including animated covers, Poly showcases, tracking widgets, carousel, gallery, and video players.
- **src/lib/** — project text, collection metadata, image lists, and shared helpers.
- **src/hooks/** — shared React hooks.
- **src/index.css** — the portfolio's global styles and design tokens.
- **tailwind.config.js** — Tailwind configuration; loaded using Tailwind v4's @config directive.
- **public/** — original images, GIFs, local videos, fonts, favicon, and résumé PDF.

The completed design uses Tailwind utilities together with CSS Modules and custom CSS for precise layouts and motion. These have all been preserved.

## Included pages

- / — homepage, selected work, and about section.
- /work/01 through /work/05 — all five case studies.
- /not-work — six-collection asymmetric gallery.
- /not-work/carry-it, /not-work/hbd, /not-work/typography, /not-work/wear-it, /not-work/how-to-at-home, /not-work/dinner-project — collection pages.

## Assets and interactions

The archive contains the local artwork and videos, including the Not Work image/GIF collection. Existing external Squarespace video streams, Figma prototypes, original portfolio links, and the Adobe-hosted publication still require internet access. Video playback uses the included hls.js dependency when native HLS is unavailable.

The Poly App charts, water log, symptom selection, and chat are interactive presentation demos with sample data; they do not connect to a healthcare service or save personal information. Existing keyboard controls, touch gestures, and reduced-motion styles remain in place.

No credentials, private environment files, development caches, node_modules, or hosting account configuration are included. Original artwork and personal content belong to their respective owners; this export does not grant a new license to third-party media.
