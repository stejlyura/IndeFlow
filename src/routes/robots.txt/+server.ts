export const prerender = true;
import type { RequestHandler } from './$types';

/**
 * Dynamically generate robots.txt for IndxFlow.
 * Ensures search engines can find the sitemap and crawl the site efficiently.
 */
export const GET: RequestHandler = () => {
    const robots = `
User-agent: *
Allow: /

# Host
Host: https://indxflow.com

# Sitemaps
Sitemap: https://indxflow.com/sitemap.xml
`.trim();

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};

