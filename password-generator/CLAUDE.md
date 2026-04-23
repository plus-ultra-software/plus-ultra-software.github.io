# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A pure static web app (no build tools, no package manager, no framework). Files are served directly from disk or a static host. There is no compile step, no `npm install`, and no test runner.

To develop locally, serve the directory with any static file server, e.g.:

```bash
npx serve .
# or
python -m http.server 8080
```

## Architecture

`index.html` has an empty `<body>` — it only loads `css/styles.css` and `js/main.js`. The entire UI is built by JavaScript at runtime. This means:

- **`js/main.js`** is the entry point; it constructs and mounts all DOM elements.
- **`css/styles.css`** holds all styling (does not yet exist — needs to be created alongside `js/main.js`).
- **`404.html`** is self-contained (inline styles, no external JS) and serves as the canonical reference for the design system.

## Design System

All new UI must follow the tokens established in `404.html`:

| Token | Value |
|---|---|
| `--navy` | `#0D1B2E` |
| `--navy-deep` | `#07111E` |
| `--navy-mid` | `#152338` |
| `--blue` | `#2B7DE9` |
| `--blue-light` | `#5499F0` |
| `--blue-dim` | `rgba(43,125,233,0.15)` |
| `--blue-glow` | `rgba(43,125,233,0.07)` |

- **Font:** Montserrat (weights 400, 500, 800) loaded from `https://cdn.jsdelivr.net/npm/@fontsource/montserrat/`.
- **Background pattern:** CSS grid lines using `--blue-glow` at 52 px × 52 px, applied via `body::before`.
- **Glow orb:** Radial gradient centered on the page, applied via `body::after`.
- **Brand asset:** `assets/orbit-mark.svg` — the Plus Ultra Software logo mark (orbit ring + crosshair + satellite dot).

## Conventions

- Uppercase + wide letter-spacing for headings and labels (`text-transform: uppercase; letter-spacing: ...`).
- Two button styles established in `404.html`: `.btn-primary` (solid blue) and `.btn-ghost` (transparent with border).
- Navbar height is `68px`; page content uses `padding-top: 68px` to clear it.
- Responsive breakpoint: `max-width: 640px`.
