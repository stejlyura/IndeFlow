<script lang="ts">
    import * as m from '$lib/paraglide/messages';
    import { page } from '$app/state';

    // Base URL could be dynamically determined, using a placeholder for now
    const siteUrl = 'https://indexflow.agency';
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{m.seo_title()}</title>
    <meta name="title" content={m.seo_title()} />
    <meta name="description" content={m.seo_desc()} />
    <meta name="keywords" content={m.seo_keywords()} />
    <meta name="author" content="IndexFlow Agency" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{siteUrl}{page.url.pathname}" />
    <meta property="og:title" content={m.seo_title()} />
    <meta property="og:description" content={m.seo_desc()} />
    <meta property="og:site_name" content={m.og_site_name()} />
    <meta property="og:image" content="{siteUrl}/og-image.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{siteUrl}{page.url.pathname}" />
    <meta property="twitter:title" content={m.seo_title()} />
    <meta property="twitter:description" content={m.seo_desc()} />
    <meta property="twitter:image" content="{siteUrl}/og-image.jpg" />

    <!-- Canonical URL -->
    <link rel="canonical" href="{siteUrl}{page.url.pathname}" />

    <!-- Theme Color for mobile browsers -->
    <meta name="theme-color" content="#000000" />
</svelte:head>
