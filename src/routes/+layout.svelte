<script lang="ts">
    import { Header, Footer, Seo } from '$lib';
	import './layout.css';
	import { generateSeoConfig } from '$lib/functions/generateSeoParams';
    import { page } from '$app/state';
    import type { LayoutData } from './$types';
    
    let { data, children }: { data: LayoutData & { pages?: string[] }, children: any } = $props();

    // Use page.data for page-specific SEO as layout data is empty
    let seoConfig = $derived(generateSeoConfig(page.data.pageConfig, page.url.pathname, page.data.lang));
    
    $effect(() => {
        if (page.data.lang) {
            document.documentElement.lang = page.data.lang;
        }
    });
</script>

<Seo config={seoConfig} />

<div class="min-h-screen flex flex-col" data-region={page.data.region} data-lang={page.data.lang}>
    <Header pages={data.pages} />
    <main class="grow">
        {@render children()}
    </main>
    <Footer />
</div>