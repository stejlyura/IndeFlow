name: svelte-dev
description: Use exclusively for writing Svelte component logic, state management (Runes/Stores), DOM interactions, and UI reactivity. Do not use for server-side routing or data loading.

Svelte Component Development Guidelines

Goal

Develop highly reactive, strictly typed, and isolated UI components with minimal re-renders.

Checklists

State Management: Prioritize Svelte 5 Runes ($state, $derived, $effect, $props) for local state. Use external stores only for app-wide global state.

Component API: Expose clear and strictly typed interfaces using TypeScript. Use snippets (#snippet) instead of legacy slots where applicable.

Event Handling: Use standard DOM events. Keep event handlers pure and predictable.

Lifecycle: Minimize the use of $effect or legacy lifecycle hooks (onMount). State derivation ($derived) should handle most synchronous updates.

Validation Loop

Check for infinite loops in reactive statements or effects.

Verify that component unmounting properly cleans up listeners or intervals.

Constraints

FORBIDDEN to mutate props directly. Props are readonly.

FORBIDDEN to use non-scoped CSS unless explicitly required by a global utility class system (like Tailwind).