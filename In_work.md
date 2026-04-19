# Technical Specification: SvelteKit SEO & Performance (Lighthouse 100/100)

> **Agent Instructions (For AI Model / Flash):**
> This is a strict step-by-step technical checklist. Your goal is to execute these tasks precisely and efficiently. For each step, provide complete code or directly modify the files. Do not skip any steps. Provide complete, drop-in replacement code for any file you modify. Pay special attention to configuring the project for a Multi-Page Application (MPA) environment without client-side Svelte hydration.

## 1. Architecture and Configuration (Foundation)
These settings ensure the site is statically generated and optimal for bots.
- [ ] **Switch to MPA:** Open the root `src/routes/+layout.server.ts` (or `+layout.js` / `+layout.ts`) and add `export const csr = false;` to globally disable Svelte client hydration.
- [ ] **Enable SSG:** In the same layout file, set `export const prerender = true;`.
- [ ] **Clean URLs:** Add `export const trailingSlash = 'always';` in the layout configuration (standard for many hosts and SEO best practices).
- [ ] **Adapter Validation:** Ensure `svelte.config.js` is correctly configured with `@sveltejs/adapter-static`.
- [ ] **Entry Paths:** Verify that the `entries` function in `src/routes/[...path]/+page.server.ts` exports all possible routes (all languages and pages) for full pre-rendering.

## 2. Technical SEO (Google Bot Optimization)
Ensure search consoles display perfect metrics without duplicates.
- [ ] **Dynamic Meta Tags (SEO Component):** Create or update an `SEO.svelte` component that accepts `title`, `description`, and `og:image`. Inject it into `<svelte:head>` on all pages.
- [ ] **JSON-LD Schema:** Add `Service` or `Organization` JSON-LD markup to the main landing page.
- [ ] **Sitemap.xml:** Set up automatic `sitemap.xml` generation during the build step (via a script or `sveltekit-sitemap`).
- [ ] **Robots.txt:** Verify `static/robots.txt` exists, allows crawling, and correctly links to the sitemap.
- [ ] **Improve `generateSeoParams.ts` (Canonical & Hreflang):**
  - Remove hardcoded generic placeholders (like `PLACEHOLDER_META_TITLE`) and replace them with actual project defaults.
  - Implement language-aware routing logic for canonical URLs. The `canonical` tag MUST always point to the English (`en`) version of the page (e.g., `https://domain.com/en/page/`).
  - Generate `<link rel="alternate" hreflang="xx" href="...">` tags for all localized versions (e.g., `ru`) to correctly link them to the canonical English page.

## 3. Performance & Resources (Lighthouse 100/100)
Optimize loading speed to pass Google's Core Web Vitals.
- [ ] **Image Optimization:** Convert all images to `WebP` or `AVIF` format. Always explicitly set `width` and `height` attributes on `<img>` tags to eliminate Cumulative Layout Shift (CLS).
- [ ] **Local Fonts:** Store all custom fonts locally in `static/fonts/`. Preload them using `<link rel="preload" as="font" ...>` in `src/app.html` and use `font-display: swap;` in your CSS.
- [ ] **Critical CSS:** Rely on SvelteKit's built-in CSS scoping. Do not import heavy, unoptimized global CSS frameworks (like the full Bootstrap library).
- [ ] **Third-party JS:** If using analytics or external scripts, load them via Partytown or with `defer`/`async` attributes to prevent blocking the main thread.
- [ ] **Favicon & Manifest Validation:** The `static` folder already contains the required favicons (`favicon.ico`, 16x16, 32x32, `apple-touch-icon`, `android-chrome`) and `site.webmanifest`. Ensure `src/lib/functions/generateSeoParams.ts` and `src/app.html` correctly reference all of them.

## 4. Refactoring Client Interactivity (No-JS Fallbacks)
Since `csr = false` disables Svelte reactivity on the client, interactive elements need vanilla solutions:
- [ ] **Theme Switcher:** Refactor the theme switcher component to use a vanilla JavaScript `<script>` tag so it functions without hydration.
- [ ] **Burger / Mobile Menu:** Re-implement the mobile menu using a CSS-only checkbox hack or lightweight vanilla JS.
- [ ] **Other Interactive Elements:** Convert components like accordions or carousels to use native HTML tags (e.g., `<details>`/`<summary>`) or minimal vanilla JS.

## 5. Build and Verification
- [ ] **Run Build:** Execute `npm run build`.
- [ ] **Verify Output:** Check the `build` directory to confirm the absence of large Svelte JS bundles and that all paths are generated as static `.html` files.
- [ ] **Preview Check:** Start `npm run preview` and manually verify that page transitions, styles, and interactivity work correctly serving only HTML and CSS.
