<task type="auto" effort="medium">
  <name>Theme Switcher Implementation Plan</name>
  <files>
    @header.svelte
    @+layout.svelte
    @layout.css
  </files>
  <context>
    Current theme toggle in @header.svelte is not persisting or not applying classes to the body in @+layout.svelte.
  </context>
  <action>
    1. Analyze how theme state is shared between @header.svelte and @+layout.svelte.
    2. Find problem in theme swithcing and dont working themes into layoiut and templates.
    2. Provide a step-by-step plan to fix the theme switching logic.
    3. Check is all good with styles into layput.css
    STRICT: Do not generate code blocks. Only text-based implementation steps.
  </action>
</task>