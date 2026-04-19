<script lang="ts">
    import { Header, Footer, Seo } from '$lib';
	import './layout.css';
	import { generateSeoConfig } from '$lib/functions/generateSeoParams';
	import { setContext } from 'svelte';
    
    let { data, children } = $props();

    let seoConfig = $derived(generateSeoConfig(data.pageConfig));
    
    $effect(() => {
        if (data.lang) {
            document.documentElement.lang = data.lang;
        }
    });
</script>

<Seo 
	seo_title={seoConfig.title} 
	seo_desc={seoConfig.description} 
	seo_keywords={seoConfig.keywords}
/>

<div class="min-h-screen flex flex-col" data-region={data.region} data-lang={data.lang}>
    <Header />
    <main class="grow">
        {@render children()}
    </main>
    <Footer />
</div>