# SOLLUX Landing Page

Landing page for **SOLLUX**, a Polish lighting brand ("lampy w kolorze i formie"). A static site built with plain HTML, CSS and ES modules. It has no framework, no bundler and no runtime dependencies.

**Live:** https://sollux-five.vercel.app/

## Features

- **Hero slider** with an auto-advance progress bar, animated lamps (staggered entrance, flicker and "breathing" halo) and reveal transitions.
- **Benefits**, **product tiles** (hover zoom) and a **shader** promo section.
- **Responsive header** with a burger menu on narrow viewports, and a content-rich footer.
- **SEO-ready:** content is prerendered into `index.html`, with canonical and hreflang links, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml`.
- **Motion rules:** transitions and animations use only `transform` and `opacity`, with durations of 800 ms or less. Decorative loops are the exception. `prefers-reduced-motion` is respected.

## Tech stack

| Area      | Choice                                      |
| --------- | ------------------------------------------- |
| Markup    | HTML5, `lang="pl"`                          |
| Styles    | Vanilla CSS split by section, design tokens in `root.css` |
| Scripts   | Native ES modules (no build step)           |
| Prerender | Node.js script (`scripts/prerender.mjs`)    |
| Hosting   | Vercel (static)                             |

## Project structure

```
.
├── index.html            # Page shell with prerendered section content
├── main.js               # Entry point: initialises every section
├── styles.css            # Imports all stylesheets in order
├── robots.txt
├── sitemap.xml
├── scripts/
│   └── prerender.mjs     # Renders section markup into index.html
└── assets/
    ├── css/              # root (tokens), reset, utilities, header, hero,
    │                     # benefits, tiles, shader, footer
    ├── data/             # Content for each section (*-data.js)
    ├── js/               # Section modules (init + markup getters)
    └── images/           # brand, hero, tiles, footer, icons
```

Each section has three parts:

1. **Data** in `assets/data/<section>-data.js`.
2. **Module** in `assets/js/<section>.js`. It exports `get<Section>Sections()`, which returns markup and is used by the prerenderer. It also exports `init<Section>()`, which adds behaviour in the browser.
3. **Styles** in `assets/css/<section>.css`.

## Getting started

Requirements: **Node.js 18+** (only needed for prerendering).

ES modules do not load over `file://`, so serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed local URL.

### Prerender content

After editing any file in `assets/data/` or the markup getters in `assets/js/`, regenerate the static content in `index.html`:

```bash
npm run prerender
```

This keeps the HTML crawlable without JavaScript. Commit the updated `index.html` together with your changes.

## Customisation

- **Design tokens** (colours, easing, timings, fluid type sizes, spacing) live in `assets/css/root.css`. Change them there rather than in section files.
- **Copy and links** are edited in `assets/data/*.js`, followed by `npm run prerender`.
- **SEO metadata and the site URL** are in the `<head>` of `index.html`, `robots.txt` and `sitemap.xml`. Update all three if the domain changes.

## Deployment

The site is fully static. Connect the repository to Vercel (or any static host) and deploy the repository root. There is no build command and no output directory. Run `npm run prerender` before committing.

## Conventions

- Tabs for indentation in HTML and CSS.
- Animate only `transform` and `opacity`. Keep durations between 500 and 800 ms for entrances, and use the shared `--ease` curve. `linear` is for progress indicators only.
- Gate hover effects behind `@media (hover: hover)`.
