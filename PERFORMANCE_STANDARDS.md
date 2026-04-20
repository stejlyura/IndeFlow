# IndxFlow Performance & JS Optimization Standards

This document defines the strict performance standards maintained by IndxFlow to ensure 100/100 Lighthouse scores and zero memory leaks.

## 1. Zero-JS Architecture (CSR: False)
All pages are configured with `export const csr = false;` in `+layout.js`.
*   **Result**: No Svelte runtime is sent to the client.
*   **Benefit**: Elimination of hydration overhead and common SPA memory leaks.

## 2. Third-Party Script Management (Partytown)
We strictly prohibit placing third-party scripts directly on the main thread.
*   **Standard**: Use `type="text/partytown"` for all external scripts (Analytics, Ads, Tracking).
*   **Location**: Configured in `src/app.html` via the Partytown web worker shim.
*   **Benefit**: Scripts run in a background thread, preventing them from blocking the UI or degrading TBT (Total Blocking Time).

## 3. DOM-Native Interactivity
Interactivity is achieved through lightweight, native methods:
*   **State Management**: Native Checkbox Hack for mobile menus.
*   **Animations**: CSS-only animations and `IntersectionObserver` via raw scripts in `+layout.svelte`.
*   **Forms**: Standard HTML forms with server-side processing.

## 4. Resource Preloading
Critical assets are preloaded in the `<head>`:
*   **Fonts**: Local WOFF2 files with `font-display: swap`.
*   **CDN**: Offloading media to AWS CloudFront.

## 5. Automated Enforcement
Performance is guarded by **Lighthouse CI** (`lighthouserc.json`).
*   **Threshold**: Any PR that drops performance below 95/100 is automatically blocked.

