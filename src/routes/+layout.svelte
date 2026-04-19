<script lang="ts">
    import { Header, Footer, Seo } from '$lib';
	import './layout.css';
	import { generateSeoConfig } from '$lib/functions/generateSeoParams';
    import { page } from '$app/state';
    import type { LayoutData } from './$types';
    
    let { data, children }: { data: LayoutData & { pages?: string[] }, children: any } = $props();

    // Use page.data for page-specific SEO as layout data is empty
    let seoConfig = $derived(generateSeoConfig(page.data.pageConfig, page.url.pathname, page.data.lang));
</script>

<Seo config={seoConfig} />

<div class="min-h-screen flex flex-col" data-region={page.data.region} data-lang={page.data.lang}>
    <Header pages={data.pages} />
    <main class="grow">
        {@render children()}
    </main>
    <Footer />
</div>

<!-- Raw JS for scroll reveal animations (Zero-JS compatible) -->
{@html `<script>
    (function() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(function(el) {
            observer.observe(el);
        });
    })();
</script>`}

<style>
    /* Ensure reveal class starts as invisible if JS is enabled, 
       otherwise it stays visible for accessibility if JS is totally blocked */
    :global(.reveal) {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    :global(.reveal-active) {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
</style>