<task type="auto" effort="high">
  <name>Fix UI components to match the landing page reference</name>
  <files>
    - @prymer.html
    - @component/
  </files>
  <action>
    Step 3: Fix Disclaimer and UILab components
    - Disclaimer.svelte: Change wrapper to section py-12. Recreate the full flexbox layout (icon circle, title, text) matching the HTML disclaimer-box.
    - UILab.svelte: Replace placeholder with the complete UI grid from prymer.html (Button, Input, Status Tag) including the title section with the theme preview dropdown.

    Step 4: Fix Comparison and Pricing components
    - Comparison.svelte: Update h2 to text-3xl md:text-6xl mb-16. Rewrite table structure using .table-wrap, min-w-[700px], and py-10 px-8 padding for cells. Use exact typography classes from HTML (e.g., text-[10px] uppercase opacity-40 for th).
    - Pricing.svelte: Fix standard buttons to use hover:bg-black hover:text-white transition. Check grid borders match prymer.html.

    Step 5: Fix FAQ, CallbackForm, and Footer components
    - FAQ.svelte: Restructure accordion from <details> to the flat border-b design. Update padding to py-10 and typography to text-sm font-bold uppercase tracking-[0.2em].
    - CallbackForm.svelte: Enforce dark theme classes (bg-zinc-950, text-white). Add missing text-xs uppercase font-bold classes to inputs. Use invert on date input.
    - Footer.svelte: Rebuild the flex container. Add "INDEXFLOW" logo, social links (Telegram, Instagram, Behance), and typography (opacity-50 text-[9px] uppercase tracking-[0.3em] font-bold italic).
  </action>
  <verify>
    npm run build
  </verify>
  <done>All components in the directory perfectly match the visual design, layout, and styling of the prymer.html reference.</done>
</task>