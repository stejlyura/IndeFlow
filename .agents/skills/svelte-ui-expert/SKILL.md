name: svelte-ui-expert
description: Use for creating Svelte UI components in /src/lib/components/blocks/. Focuses on Zero-JS, CSS-first interactions, and strict 60-line limits.

Zero-Bundle UI Component Guidelines

Goal

Build visually complex but computationally free Svelte components using HTML and CSS natively, adhering to the Zero-JS by default mandate.

Checklists

CSS-First: Handle UI states (accordions, tabs, modals, hover states) using native HTML elements (<details>, <summary>, hidden checkboxes) and CSS (:target, :has(), :focus-within, @layer).

Styling: Use Tailwind CSS combined with Native CSS Variables.

Interactivity: Do NOT use client-side JavaScript (on:click, $state, onMount) in block components unless explicitly requested and csr is enabled for that specific route.

Atomicity: Keep components under 60 lines of code. Extract complex markup into smaller sub-components or logic into /src/lib/utils/.

Validation Loop

Check if component relies on JS for basic visibility or layout. If yes, rewrite to use CSS.

Ensure component accepts strictly typed props defined in /src/lib/types.ts.

Constraints

FORBIDDEN to use client-side event listeners.

FORBIDDEN to exceed 60 lines per Svelte file.