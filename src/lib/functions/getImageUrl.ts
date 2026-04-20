import { dev } from '$app/environment';

/**
 * IndxFlow Asset Delivery Utility
 * 
 * Automatically switches between local assets (development) and 
 * CloudFront CDN (production) to ensure maximum performance and SEO.
 * 
 * @param path The path to the asset (e.g., '/assets/hero.jpg')
 * @param options Optimization options (width, format)
 * @returns The optimized asset URL
 */
export function getImageUrl(path: string, options: { width?: number; format?: string } = {}) {
    // Replace with your actual CloudFront distribution domain
    const CLOUDFRONT_DOMAIN = 'https://assets.indxflow.com';
    
    if (dev) {
        return path;
    }

    const url = new URL(path, CLOUDFRONT_DOMAIN);
    
    // Support for Image Optimization via CloudFront Functions or Lambda@Edge
    if (options.width) url.searchParams.set('w', options.width.toString());
    if (options.format) url.searchParams.set('fmt', options.format);

    return url.toString();
}

