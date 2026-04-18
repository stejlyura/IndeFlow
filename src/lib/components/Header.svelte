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

<header class="fixed top-0 w-full z-[120] border-b backdrop-blur-md bg-opacity-90" style="background-color: var(--bg-card); border-color: var(--border-color);">
    <div class="container mx-auto px-4 md:px-8 h-16 md:h-24 flex items-center justify-between">
        <a href="/" class="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
            INDEX<span style="color: var(--primary);">FLOW</span>
        </a>
        
        <div class="flex items-center space-x-3 md:space-x-6">
            <!-- Theme Switcher -->
            <select 
                onchange={(e) => setTheme(e.currentTarget.value)} 
                class="bg-transparent border border-zinc-400 px-3 py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest sharp outline-none cursor-pointer"
            >
                <option value="berry">Berry Mint (Pulp)</option>
                <option value="apple">Liquid Glass (Apple)</option>
                <option value="heritage">Heritage (Rolex)</option>
                <option value="mercedes">Aero Mercedes</option>
                <option value="wordpress">Blueprint (WP)</option>
            </select>

            <!-- Language Switcher -->
            <details class="relative group">
                <summary class="cursor-pointer text-[9px] md:text-xs font-bold uppercase tracking-widest p-2 list-none">
                    Lang ▾
                </summary>
                <ul class="absolute right-0 mt-2 py-2 w-24 bg-[var(--bg-card)] border border-[var(--border-color)] sharp shadow-xl z-50">
                    {#each locales as locale}
                        <li>
                            <a 
                                href={resolve(localizeHref(currentPath, { locale }) as Pathname)} 
                                class="block px-4 py-2 text-[9px] md:text-xs hover:bg-[var(--primary)] hover:text-white transition-colors uppercase"
                            >
                                {locale}
                            </a>
                        </li>
                    {/each}
                </ul>
            </details>

            <button class="hidden sm:block btn-premium px-6 py-2.5 text-[9px] md:text-[10px] sharp">
                {m.nav_contact()}
            </button>
        </div>
    </div>
</header>
