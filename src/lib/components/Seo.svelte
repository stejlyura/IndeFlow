<script lang="ts">
    import { page } from '$app/state';

    let {
        seo_title = '',
        seo_desc = '',
        seo_keywords = '',
        og_image = '',
        og_site_name = 'IndexFlow Agency',
        hreflangs = [],
        canonical = '',
        jsonLd = null,
        config = null
    } = $props<{
        seo_title?: string;
        seo_desc?: string;
        seo_keywords?: string;
        og_image?: string;
        og_site_name?: string;
        hreflangs?: Array<{ rel: string, hreflang: string, href: string }>;
        canonical?: string;
        jsonLd?: any;
        config?: any;
    }>();

    // Use values from config if provided, otherwise use individual props
    const title = $derived(config?.title || seo_title);
    const description = $derived(config?.description || seo_desc);
    const keywords = $derived(config?.keywords || seo_keywords);
    const siteName = $derived(config?.openGraph?.site_name || og_site_name);
    const image = $derived(config?.openGraph?.images?.[0]?.url || og_image || 'https://indexflow.agency/og-image.jpg');
    const finalCanonical = $derived(config?.canonical || canonical || `https://indexflow.agency${page.url.pathname}`);
    const finalHreflangs = $derived(config?.hreflangs || hreflangs || []);
    const finalJsonLd = $derived(config?.jsonLd || jsonLd);
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content="IndexFlow Agency" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://indexflow.agency{page.url.pathname}" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:image" content={image} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://indexflow.agency{page.url.pathname}" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    <!-- Canonical URL -->
    <link rel="canonical" href={finalCanonical} />

    <!-- Hreflang Tags -->
    {#each finalHreflangs as link}
        <link rel={link.rel} hreflang={link.hreflang} href={link.href} />
    {/each}

    <!-- Theme Color for mobile browsers -->
    <meta name="theme-color" content="#000000" />

    <!-- JSON-LD Schema -->
    {#if finalJsonLd}
        {@html `<script type="application/ld+json">${JSON.stringify(finalJsonLd)}<\/script>`}
    {/if}
</svelte:head>
