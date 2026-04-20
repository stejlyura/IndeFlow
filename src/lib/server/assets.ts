/**
 * Asset Delivery Utility (OPS-03).
 * Integrates with AWS CloudFront for high-availability media delivery.
 */

const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || 'https://assets.indxflow.com';

/**
 * Returns a CloudFront URL for a given asset path.
 * In production, this offloads traffic from the main server to the CDN.
 */
export function getAssetUrl(path: string): string {
    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;
    
    // In local development, we might want to serve from /static
    if (process.env.NODE_ENV !== 'production') {
        return path.startsWith('/') ? path : `/${path}`;
    }

    // Production CloudFront path
    const cleanPath = path.replace(/^\//, '');
    return `${CLOUDFRONT_DOMAIN}/${cleanPath}`;
}

