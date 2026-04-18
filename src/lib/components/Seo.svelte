<script lang="ts">
    import { page } from '$app/state';

    let {
        seo_title = '',
        seo_desc = '',
        seo_keywords = '',
        og_site_name = 'IndexFlow Agency'
    } = $props<{
        seo_title?: string;
        seo_desc?: string;
        seo_keywords?: string;
        og_site_name?: string;
    }>();

    // Base URL could be dynamically determined, using a placeholder for now
    const siteUrl = 'https://indexflow.agency';
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{seo_title}</title>
    <meta name="title" content={seo_title} />
    <meta name="description" content={seo_desc} />
    <meta name="keywords" content={seo_keywords} />
    <meta name="author" content="IndexFlow Agency" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{siteUrl}{page.url.pathname}" />
    <meta property="og:title" content={seo_title} />
    <meta property="og:description" content={seo_desc} />
    <meta property="og:site_name" content={og_site_name} />
    <meta property="og:image" content="{siteUrl}/og-image.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{siteUrl}{page.url.pathname}" />
    <meta property="twitter:title" content={seo_title} />
    <meta property="twitter:description" content={seo_desc} />
    <meta property="twitter:image" content="{siteUrl}/og-image.jpg" />

    <!-- Canonical URL -->
    <link rel="canonical" href="{siteUrl}{page.url.pathname}" />

    <!-- Theme Color for mobile browsers -->
    <meta name="theme-color" content="#000000" />
</svelte:head>
