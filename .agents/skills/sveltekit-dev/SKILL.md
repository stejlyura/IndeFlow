name: sveltekit-dev
description: Use for SvelteKit-specific tasks: file-based routing, SSR/SSG configuration, load functions (+page.server.ts), form actions, and hooks (hooks.server.ts).

SvelteKit Architecture & Routing

Goal

Ensure efficient data loading, robust server-side rendering, and seamless client-side navigation.

Checklists

Data Loading: Use +page.server.ts for database interactions and secrets. Use +page.ts only when fetching data from external public APIs directly to the client.

Form Actions: Handle all mutations via SvelteKit Form Actions (export const actions).

Progressive Enhancement: Always use use:enhance on forms to ensure they work without JavaScript while providing a SPA-like experience when JS is available.

Error Handling: Use SvelteKit's built-in error() helper for HTTP errors. Handle expected failures gracefully using action fail().

Validation Loop

Test forms with JavaScript disabled in the browser to verify progressive enhancement.

Ensure no sensitive environment variables ($env/static/private) are imported into .svelte or +page.ts files.

Constraints

FORBIDDEN to fetch local API endpoints from within server load functions (call the underlying database/service function directly instead).