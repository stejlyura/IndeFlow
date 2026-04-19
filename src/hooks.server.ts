import { redirect, type Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// 1. Skip static files and internal SvelteKit paths
	if (pathname.includes('.') || pathname.startsWith('/_app')) {
		return resolve(event);
	}

	// 2. Root redirect: / -> /en (Simplified)
	if (pathname === '/' || pathname === '') {
		throw redirect(301, '/en');
	}

	// 3. Paraglide middleware for i18n
	return paraglideMiddleware(event.request, async ({ request, locale }) => {
		event.request = request;

		const response = await resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});

        // 4. Edge Caching & Security Headers (OPS-02 / SEC-01)
        response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=31536000');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        
        // Content Security Policy
        response.headers.set('Content-Security-Policy', 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https://www.google-analytics.com; " +
            "connect-src 'self' https://www.google-analytics.com;"
        );

        return response;
	});
};

/**
 * Global Error Handler (OPS-04)
 * Captures server-side errors for monitoring and debugging.
 */
export const handleError = ({ error, event }) => {
    // In a production environment, send this to Sentry or New Relic
    console.error('[ServerError]', {
        message: (error as Error).message,
        path: event.url.pathname,
        timestamp: new Date().toISOString()
    });

    return {
        message: 'A technical error occurred. Our team has been notified.',
        code: (error as any)?.code ?? 'INTERNAL_ERROR'
    };
};
