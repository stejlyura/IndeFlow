export interface SeoSettings {
    title?: string;
    description?: string;
    canonical?: string;
    keywords?: string;
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterHandle?: string;
    jsonLd?: any;
    [key: string]: any;
}

const SITE_URL = 'https://indexflow.agency';
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ru', 'uk']; 
const REGIONS = ['europe', 'eu', 'cis', 'asia', 'usa'];

// Extract seo properties from the new JSON format
function extractSeoFromConfig(config: any): SeoSettings {
    if (!config || typeof config !== 'object') return {};
    
    const seo: SeoSettings = {};
    for (const key of Object.keys(config)) {
        if (config[key]?.props?.seo) {
            Object.assign(seo, config[key].props.seo);
        }
    }
    return seo;
}

/**
 * Generates SEO configuration with localized canonicals and hreflang tags.
 * @param customOrConfig Custom SEO settings or component config
 * @param currentPath Current URL path (e.g., /en/services or /europe/en/services)
 * @param currentLang Current language code
 */
export function generateSeoConfig(
    customOrConfig?: SeoSettings | Record<string, any>, 
    currentPath: string = '', 
    currentLang: string = DEFAULT_LANG
) {
    // If it's a pageConfig (dictionary of components), extract seo
    let custom: SeoSettings = {};
    if (customOrConfig) {
        if (Object.values(customOrConfig).some(v => typeof v === 'object' && v !== null && 'props' in v)) {
            custom = extractSeoFromConfig(customOrConfig);
        } else {
            custom = customOrConfig as SeoSettings;
        }
    }

    // Clean up current path
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove region if present
    if (pathParts.length > 0 && REGIONS.includes(pathParts[0])) {
        pathParts.shift();
    }
    
    // Remove language if present
    if (pathParts.length > 0 && pathParts[0].length === 2) {
        pathParts.shift();
    }

    const pagePath = pathParts.join('/');
    const canonicalUrl = `${SITE_URL}/${DEFAULT_LANG}${pagePath ? '/' + pagePath : ''}`;

    // Hreflang tags for all localized versions
    const hreflangs = SUPPORTED_LANGS.map(lang => ({
        rel: 'alternate',
        hreflang: lang,
        href: `${SITE_URL}/${lang}${pagePath ? '/' + pagePath : ''}`
    }));

    // Add x-default pointing to the default language (en)
    hreflangs.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${SITE_URL}/${DEFAULT_LANG}${pagePath ? '/' + pagePath : ''}`
    });

    return {
        title: custom?.title || 'IndexFlow Agency | Premium Web Development & Automation',
        description: custom?.description || 'IndexFlow Agency provides high-end web development, automation, and technical SEO services for modern businesses.',
        canonical: custom?.canonical || canonicalUrl,
        keywords: custom?.keywords || 'web development, automation, sveltekit, technical seo, indexflow',
        author: custom?.author || 'IndexFlow Agency',
        hreflangs,
        openGraph: {
            type: 'website',
            locale: currentLang === 'ru' ? 'ru_RU' : 'en_US',
            url: `${SITE_URL}/${currentPath.replace(/^\//, '')}`,
            site_name: 'IndexFlow',
            title: custom?.ogTitle || custom?.title || 'IndexFlow Agency',
            description: custom?.ogDescription || custom?.description || 'Premium Web Development & Automation',
            images: [
                {
                    url: custom?.ogImage || `${SITE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'IndexFlow Agency'
                }
            ]
        },
        twitter: {
            handle: custom?.twitterHandle || '@indexflow',
            site: '@indexflow',
            cardType: 'summary_large_image',
            title: custom?.ogTitle || custom?.title || 'IndexFlow Agency',
            description: custom?.ogDescription || custom?.description || 'Premium Web Development & Automation',
            image: custom?.ogImage || `${SITE_URL}/twitter-image.jpg`,
            imageAlt: 'IndexFlow Agency'
        },
        additionalMetaTags: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'theme-color', content: '#000000' },
            { name: 'robots', content: 'index, follow' }
        ],
        additionalLinkTags: [
            { rel: 'icon', href: '/favicon.ico' },
            { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
            { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
            { rel: 'manifest', href: '/site.webmanifest' }
        ],
        jsonLd: custom?.jsonLd || {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IndexFlow Agency",
            "url": SITE_URL,
            "logo": `${SITE_URL}/logo.png`,
            "sameAs": [
                "https://twitter.com/indexflow",
                "https://github.com/indexflow"
            ]
        }
    };
}

