# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the static marketing website for Plus Ultra Software, hosted on GitHub Pages. It is a single-page application with no build step, no package manager, and no framework — just plain HTML, CSS, and vanilla JavaScript.

## Development

Open `index.html` directly in a browser, or use any local static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

There are no build, lint, or test commands. Deployment happens automatically via GitHub Pages on push to `main`.

## Architecture

The site is a single HTML page (`index.html`) with four anchor-linked sections: `#home`, `#services`, `#about`, `#contact`. A separate `404.html` handles GitHub Pages not-found routing.

**Key files:**
- `index.html` — all markup and section structure
- `css/styles.css` — all styling; uses CSS custom properties defined in `:root` for the design token system
- `js/main.js` — all interactivity, wrapped in an IIFE
- `assets/orbit-mark.svg` — the brand logo mark

**Design tokens** (defined in `css/styles.css` `:root`):
- Palette: `--navy` (#0D1B2E), `--blue` (#2B7DE9), `--white` (#FFFFFF) and their variants
- Layout: `--nav-h` (68px), `--drawer-w` (300px), `--radius`, `--radius-lg`

**`js/main.js` responsibilities:**
- **i18n** — inline `i18n` object holds all EN and IS (Icelandic) string translations; `applyLang()` updates all `[data-i18n]` elements and persists the choice to `localStorage` under key `pus_lang`
- **Hamburger/drawer** — slide-out nav panel toggled by `.pus-hamburger`; controlled via `is-open` CSS classes
- **Cookie consent** — banner shown once if `pus_cookies` is absent from `localStorage`; stores `accepted` or `rejected`
- **Scroll-spy** — highlights the active drawer link based on scroll position
- **Navbar shadow** — adds `.scrolled` to `#navbar` after 10px scroll

**i18n pattern:** All user-visible strings in the HTML use `data-i18n="key"` attributes. To add or modify copy, update the string in both `i18n.en` and `i18n.is` in `main.js`, and add/update the corresponding `data-i18n` attribute in `index.html`.
