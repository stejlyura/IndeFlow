<script lang="ts">
    import { Header, Footer, } from '$lib';
	import './layout.css';
	import { generateSeoConfig } from '$lib/functions/generateSeoParams';
    
    let { children } = $props();

    let seoConfig = generateSeoConfig();
</script>

<div class="min-h-screen flex flex-col">
    <Header />
    <main class="grow">
        {@render children()}
    </main>
    <Footer />
</div>