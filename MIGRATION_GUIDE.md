# IndexFlow: Migration Blueprint (Legacy CMS to SvelteKit Headless)

This document outlines the strategic process for migrating client data and SEO authority from legacy systems (WordPress, Joomla, etc.) to the high-performance IndexFlow engine.

## Phase 1: Technical Discovery & SEO Audit
1. **Crawl & Mapping**: Extract all existing URLs, metadata, and heading structures from the legacy site.
2. **Backlink Protection**: Identify top-performing pages to ensure strict 1:1 redirection mapping.
3. **Database Inspection**: Analyze legacy table structures (wp_posts, wp_postmeta) for content extraction.

## Phase 2: Content Extraction (The "Heart Transplant")
1. **Export to JSON**: Use WP-CLI or custom SQL scripts to export content into structured JSON formats compatible with IndexFlow's `messages/` pipeline.
2. **Media Migration**: Batch upload legacy `/wp-content/uploads/` to AWS S3 and rewrite paths to use the CloudFront CDN utility (`getAssetUrl`).
3. **Sanitization**: Strip legacy inline styles and bloated HTML tags (e.g., `&nbsp;`, multiple `<span>`) during the transition.

## Phase 3: Headless Re-Architecture
1. **Component Mapping**: Map legacy "Page Templates" to IndexFlow Svelte components.
2. **Schema Reconstruction**: Rebuild `Organization`, `Product`, and `FAQ` JSON-LD schemas based on extracted data.
3. **Internal Linking**: Update internal links to follow the new localized URL patterns (`/en/`, `/ua/`).

## Phase 4: Zero-JS Optimization
1. **Eliminate Plugins**: Replace legacy PHP-based plugin functionality (e.g., contact forms, sliders) with "Zero-JS" Svelte components or Partytown-optimized scripts.
2. **Partytown Implementation**: Move essential third-party scripts (GA4, GTM, Pixel) to background web workers.

## Phase 5: Go-Live & Indexing
1. **DNS Cutover**: Switch to Cloudflare with Edge Caching rules enabled.
2. **Instant Discovery**: Trigger the **Google Indexing API** for all migrated URLs to ensure Google recognizes the transition immediately.
3. **Post-Launch Audit**: Monitor Search Console for 404 errors and confirm 100/100 Lighthouse scores.
