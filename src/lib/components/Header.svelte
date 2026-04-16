<script lang="ts">
    import * as m from '$lib/paraglide/messages';
    import { page } from '$app/state';
    import { locales, localizeHref } from '$lib/paraglide/runtime';
    import { resolve } from '$app/paths';
    import type { Pathname } from '$app/types';

    let currentPath = $derived(page.url.pathname);

    function setTheme(theme: string) {
        if (typeof document !== 'undefined') {
            if (theme) {
                document.body.setAttribute('data-theme', theme);
            } else {
                document.body.removeAttribute('data-theme');
            }
        }
    }
</script>

<style>
    /* CSS-only dropdown fallback to avoid JS dependencies for interactions */
    details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    
    /* Close details on outside click (if using CSS-only, it requires focus trick, but we keep it simple here) */
</style>

<header class="w-full fixed top-0 z-50 glass-effect border-b border-[var(--border-color)]">
    <div class="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-black italic uppercase tracking-tighter">IndexFlow</a>
        
        <nav class="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="/" class="hover:text-[var(--primary)] transition-colors">{m.nav_home()}</a>
            <a href="#services" class="hover:text-[var(--primary)] transition-colors">{m.nav_services()}</a>
            <a href="#portfolio" class="hover:text-[var(--primary)] transition-colors">{m.nav_portfolio()}</a>
            <a href="#contact" class="hover:text-[var(--primary)] transition-colors">{m.nav_contact()}</a>
        </nav>

        <div class="flex items-center gap-4">
            <!-- Theme Switcher -->
            <details class="relative group">
                <summary class="cursor-pointer text-xs font-bold uppercase tracking-widest p-2">
                    Theme ▾
                </summary>
                <ul class="absolute right-0 mt-2 py-2 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] sharp shadow-xl z-50">
                    <li><button onclick={() => setTheme('')} class="w-full text-left px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors">{m.theme_default()}</button></li>
                    <li><button onclick={() => setTheme('heritage')} class="w-full text-left px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors">{m.theme_heritage()}</button></li>
                    <li><button onclick={() => setTheme('berry')} class="w-full text-left px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors">{m.theme_berry()}</button></li>
                    <li><button onclick={() => setTheme('mercedes')} class="w-full text-left px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors">{m.theme_mercedes()}</button></li>
                    <li><button onclick={() => setTheme('wordpress')} class="w-full text-left px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors">{m.theme_wordpress()}</button></li>
                </ul>
            </details>

            <!-- Language Switcher -->
            <details class="relative group">
                <summary class="cursor-pointer text-xs font-bold uppercase tracking-widest p-2">
                    Lang ▾
                </summary>
                <ul class="absolute right-0 mt-2 py-2 w-24 bg-[var(--bg-card)] border border-[var(--border-color)] sharp shadow-xl z-50">
                    {#each locales as locale}
                        <li>
                            <a 
                                href={resolve(localizeHref(currentPath, { locale }) as Pathname)} 
                                class="block px-4 py-2 text-xs hover:bg-[var(--primary)] hover:text-white transition-colors uppercase"
                            >
                                {locale}
                            </a>
                        </li>
                    {/each}
                </ul>
            </details>
        </div>
    </div>
</header>
