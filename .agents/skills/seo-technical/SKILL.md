name: seo-technical
description: Use for optimizing Core Web Vitals, adding structured data (JSON-LD), configuring meta tags, and integrating 3rd-party scripts via Partytown.

Technical SEO & Edge Performance

Goal

Achieve perfect Lighthouse scores and ensure the main thread remains 100% free for the user.

Checklists

Partytown Compliance: ALL external scripts (Analytics, Tag Manager, Pixels) MUST be implemented using <script type="text/partytown">.

Meta & Structured Data: Inject precise <title>, Open Graph tags, and JSON-LD based on the localized JSON data inside <svelte:head>.

Asset Optimization: Ensure all CSS is extracted and optimized. Preload critical fonts or LCP (Largest Contentful Paint) images.

Validation Loop

Verify type="text/partytown" is present on all tracking scripts.

Check generated HTML source to confirm meta tags and JSON-LD are pre-rendered (SSG), not injected client-side.

Constraints

FORBIDDEN to add regular <script> tags for external trackers.

FORBIDDEN to cause layout shifts (CLS) with dynamically loaded fonts or unconstrained images.