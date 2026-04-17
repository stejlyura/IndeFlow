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
    [key: string]: any;
}

// Функция для генерации всевозможных SEO настроек с плейсхолдерами
export function generateSeoConfig(custom?: SeoSettings) {
    return {
        title: custom?.title || 'PLACEHOLDER_META_TITLE',
        description: custom?.description || 'PLACEHOLDER_META_DESCRIPTION',
        canonical: custom?.canonical || 'https://placeholder.domain.com',
        keywords: custom?.keywords || 'placeholder, seo, keywords, sveltekit',
        author: custom?.author || 'PLACEHOLDER_AUTHOR_NAME',
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: custom?.canonical || 'https://placeholder.domain.com',
            site_name: 'PLACEHOLDER_SITE_NAME',
            title: custom?.ogTitle || custom?.title || 'PLACEHOLDER_OG_TITLE',
            description: custom?.ogDescription || custom?.description || 'PLACEHOLDER_OG_DESCRIPTION',
            images: [
                {
                    url: custom?.ogImage || 'https://placeholder.domain.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'PLACEHOLDER_OG_IMAGE_ALT'
                }
            ]
        },
        twitter: {
            handle: custom?.twitterHandle || '@PLACEHOLDER_TWITTER_HANDLE',
            site: '@PLACEHOLDER_TWITTER_SITE',
            cardType: 'summary_large_image',
            title: custom?.ogTitle || custom?.title || 'PLACEHOLDER_TWITTER_TITLE',
            description: custom?.ogDescription || custom?.description || 'PLACEHOLDER_TWITTER_DESCRIPTION',
            image: custom?.ogImage || 'https://placeholder.domain.com/twitter-image.jpg',
            imageAlt: 'PLACEHOLDER_TWITTER_IMAGE_ALT'
        },
        additionalMetaTags: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { name: 'theme-color', content: '#0071e3' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
        ],
        additionalLinkTags: [
            { rel: 'icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
            { rel: 'manifest', href: '/site.webmanifest' }
        ]
    };
}
