name: seo-content
description: Use for writing or structuring textual content, defining i18n JSON architectures in /messages/, and ensuring EEAT compliance.

Content Architecture & JSON Definition

Goal

Create strictly structured, highly relevant, and EEAT-compliant content directly within the JSON localization files (/messages/[lang]/).

Checklists

Strict Typing: All generated JSON files MUST strictly adhere to the PageConfig and PageSection interfaces defined in /src/lib/types.ts. Do not hallucinate properties.

Content Quality: Write concise, authoritative content. Avoid fluff. Serve the user's search intent instantly.

Formatting: Use structured data within the JSON (e.g., arrays for lists, nested objects for structured blocks) so the PageBuilder.svelte can render it without complex client-side parsing.

Validation Loop

Run TS validation to ensure the generated JSON matches the SvelteKit application's TypeScript interfaces.

Verify content contains exact-match and semantic keywords without artificial keyword stuffing.

Constraints

FORBIDDEN to create Markdown or HTML content files. All textual content must reside in /messages/[lang]/[file].json.

FORBIDDEN to hallucinate JSON keys that are not supported by the current PageBuilder.svelte schema.