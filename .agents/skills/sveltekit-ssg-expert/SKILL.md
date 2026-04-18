name: sveltekit-ssg-expert
description: Use for routing, +page.server.ts data loading, SSG build configuration, i18n logic, and Cloudflare Pages deployment adjustments.

SvelteKit SSG & Cloudflare Architecture

Goal

Ensure robust static site generation, seamless i18n routing, and hyper-optimized edge delivery.

Checklists

Zero-JS Mandate: Ensure public routes explicitly export export const csr = false; and export const hydrate = false; in +page.ts or +page.server.ts.

Data Loading: +page.server.ts must read from /messages/[lang]/[slug].json.

Error Handling: If import() fails to find a localized JSON file in the load function, it MUST throw a 404 SvelteKit error immediately to prevent SSG build failures.

Edge Compatibility: Ensure server-side code relies only on APIs available in the Cloudflare Workers/Pages environment (no Node.js built-ins like fs at runtime, only at build time).

Validation Loop

Verify npm run build generates pre-rendered HTML files for the defined dynamic routes.

Confirm 404 pages render correctly when requesting non-existent JSON slugs.

Constraints

FORBIDDEN to use dynamic Node.js imports at runtime; resolve JSON strictly during the build step or handle edge boundaries correctly.