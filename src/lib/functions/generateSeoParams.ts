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

const SITE_URL = 'https://indxflow.com';
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ru', 'uk']; 
const REGIONS = ['europe', 'eu', 'cis', 'asia', 'usa'];

// Extract seo properties from the new JSON format
function extractSeoFromConfig(config: any): SeoSettings {
    if (!config || typeof config !== 'object') return {};
    
    const seo: SeoSettings = {};
    const jsonLdList: any[] = [];

    for (const key of Object.keys(config)) {
        if (config[key]?.props?.seo) {
            const componentSeo = config[key].props.seo;
            // Merge all props, last one wins for simple fields
            Object.assign(seo, componentSeo);
            
            // Collect all jsonLd objects
            if (componentSeo.jsonLd) {
                if (Array.isArray(componentSeo.jsonLd)) {
                    jsonLdList.push(...componentSeo.jsonLd);
                } else {
                    jsonLdList.push(componentSeo.jsonLd);
                }
            }
        }
    }

    if (jsonLdList.length > 0) {
        seo.jsonLd = jsonLdList;
    }

    return seo;
}

/**
 * Generates BreadcrumbList schema based on the current path.
 */
function generateBreadcrumbs(currentPath: string, currentLang: string) {
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Clean segments (remove region/lang)
    const segments = [...pathParts];
    if (segments.length > 0 && REGIONS.includes(segments[0])) segments.shift();
    if (segments.length > 0 && segments[0].length === 2) segments.shift();

    const breadcrumbs = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": currentLang === 'ru' ? 'Главная' : (currentLang === 'uk' ? 'Головна' : 'Home'),
            "item": `${SITE_URL}/${currentLang}`
        }
    ];

    let currentUrl = `${SITE_URL}/${currentLang}`;
    segments.forEach((segment, index) => {
        currentUrl += `/${segment}`;
        breadcrumbs.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            "item": currentUrl
        });
    });

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
    };
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
    const originalParts = [...pathParts];
    
    // Remove region if present
    if (pathParts.length > 0 && REGIONS.includes(pathParts[0])) {
        pathParts.shift();
    }
    
    // Remove language if present
    if (pathParts.length > 0 && pathParts[0].length === 2) {
        pathParts.shift();
    }

    const pagePath = pathParts.join('/');
    const canonicalUrl = `${SITE_URL}/${currentLang}${pagePath ? '/' + pagePath : ''}`;

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

    // Handle JSON-LD merging
    const jsonLdList: any[] = [];
    
    // 1. Add Breadcrumbs (always)
    jsonLdList.push(generateBreadcrumbs(currentPath, currentLang));

    // 2. Add Organization (default or custom)
    const orgData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "indxflow.com",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`,
        "sameAs": [
            "https://twitter.com/IndxFlow",
            "https://github.com/IndxFlow"
        ]
    };

    // 3. Add custom JSON-LD from page/components
    if (custom.jsonLd) {
        if (Array.isArray(custom.jsonLd)) {
            jsonLdList.push(...custom.jsonLd);
        } else {
            jsonLdList.push(custom.jsonLd);
        }
    } else {
        jsonLdList.push(orgData);
    }

    // Wrap in @graph if multiple objects
    const finalJsonLd = jsonLdList.length > 1 
        ? { "@context": "https://schema.org", "@graph": jsonLdList }
        : jsonLdList[0];

    return {
        title: custom?.title || 'indxflow.com | Premium Web Development & Automation',
        description: custom?.description || 'indxflow.com provides high-end web development, automation, and technical SEO services for modern businesses.',
        canonical: custom?.canonical || canonicalUrl,
        keywords: custom?.keywords || 'web development, automation, sveltekit, technical seo, IndxFlow',
        author: custom?.author || 'indxflow.com',
        hreflangs,
        openGraph: {
            type: 'website',
            locale: currentLang === 'ru' ? 'ru_RU' : 'en_US',
            url: `${SITE_URL}/${currentPath.replace(/^\//, '')}`,
            site_name: 'IndxFlow',
            title: custom?.ogTitle || custom?.title || 'indxflow.com',
            description: custom?.ogDescription || custom?.description || 'Premium Web Development & Automation',
            images: [
                {
                    url: custom?.ogImage || `${SITE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'indxflow.com'
                }
            ]
        },
        twitter: {
            handle: custom?.twitterHandle || '@IndxFlow',
            site: '@IndxFlow',
            cardType: 'summary_large_image',
            title: custom?.ogTitle || custom?.title || 'indxflow.com',
            description: custom?.ogDescription || custom?.description || 'Premium Web Development & Automation',
            image: custom?.ogImage || `${SITE_URL}/twitter-image.jpg`,
            imageAlt: 'indxflow.com'
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
        jsonLd: finalJsonLd
    };
}



