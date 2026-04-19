<script lang="ts">
    import * as m from "$lib/paraglide/messages.js";
    import { page } from "$app/state";
    import { locales, localizeHref } from "$lib/paraglide/runtime";

    let { pages = [] } = $props();
    let currentPath = $derived(page.url.pathname);

    function formatPageName(name: string) {
        if (typeof name !== "string") return "Unknown";
        if (name === "home") return "Home";
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
    }
</script>

<header
    class="fixed top-0 w-full z-[120] border-b glass-effect"
    style="background-color: var(--bg-card); border-color: var(--border-color);"
>
    <div
        class="container mx-auto px-4 md:px-8 h-16 md:h-24 flex items-center justify-between"
    >
        <a
            href="/"
            class="text-xl md:text-2xl font-black tracking-tighter uppercase italic"
        >
            INDEX<span style="color: var(--primary);">FLOW</span>
        </a>

        <div class="flex items-center space-x-3 md:space-x-6">
            <!-- Pages Dropdown (Routing-based) -->
            <details class="relative group">
                <summary
                    class="cursor-pointer text-[9px] md:text-xs font-bold uppercase tracking-widest p-2 list-none border border-zinc-400 sharp"
                >
                    Menu ▾
                </summary>
                <ul
                    class="absolute right-0 mt-2 py-2 w-40 bg-[var(--bg-card)] border border-[var(--border-color)] sharp shadow-xl z-50"
                >
                    {#each pages as pageName}
                        <li>
                            <a
                                href={pageName === "home"
                                    ? "/"
                                    : `/${pageName}`}
                                class="block px-4 py-2 text-[9px] md:text-xs hover:bg-[var(--primary)] hover:text-white transition-colors uppercase font-bold"
                            >
                                {formatPageName(pageName)}
                            </a>
                        </li>
                    {/each}
                </ul>
            </details>

            <!-- Theme Switcher (Restored with Vanilla JS) -->
            <div class="relative group">
                <select
                    id="theme-switcher-select"
                    class="bg-transparent border border-zinc-400 px-3 py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest sharp outline-none cursor-pointer"
                >
                    <option value="apple">Apple Glass</option>
                    <option value="berry">Berry Mint</option>
                    <option value="heritage">Heritage</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="wordpress">Blueprint</option>
                </select>
                {@html `<script>
                    (function() {
                        var select = document.getElementById('theme-switcher-select');
                        var savedTheme = localStorage.getItem('if_theme_final') || 'apple';
                        if (select) {
                            select.value = savedTheme;
                            document.documentElement.setAttribute('data-theme', savedTheme);
                        }
                        
                        select.addEventListener('change', function(e) {
                            var theme = e.target.value;
                            document.documentElement.setAttribute('data-theme', theme);
                            localStorage.setItem('if_theme_final', theme);
                        });
                    })();
                </script>`}
            </div>

            <!-- Language Switcher -->
            <details class="relative group">
                <summary
                    class="cursor-pointer text-[9px] md:text-xs font-bold uppercase tracking-widest p-2 list-none border border-zinc-400 sharp"
                >
                    {page.data.lang?.toUpperCase() || "EN"} ▾
                </summary>
                <ul
                    class="absolute right-0 mt-2 py-2 w-24 bg-[var(--bg-card)] border border-[var(--border-color)] sharp shadow-xl z-50"
                >
                    {#each locales as locale}
                        <li>
                            <a
                                href={localizeHref(currentPath, { locale })}
                                class="block px-4 py-2 text-[9px] md:text-xs hover:bg-[var(--primary)] hover:text-white transition-colors uppercase"
                            >
                                {locale}
                            </a>
                        </li>
                    {/each}
                </ul>
            </details>

            <a
                href="/#contact"
                class="hidden sm:block btn-premium px-6 py-2.5 text-[9px] md:text-[10px] sharp"
            >
                {m.nav_contact()}
            </a>
        </div>
    </div>
</header>

<style>
    /* CSS-only dropdown fallback to avoid JS dependencies for interactions */
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>
