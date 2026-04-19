import { redirect, type Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

export const handle: Handle = ({ event, resolve }) => {
	const { pathname } = event.url;

	// 1. Skip static files and internal SvelteKit paths
	if (pathname.includes('.') || pathname.startsWith('/_app')) {
		return resolve(event);
	}

	// 2. Root redirect: / -> /eu/en
	if (pathname === '/' || pathname === '') {
		throw redirect(301, '/eu/en');
	}

	// 3. Paraglide middleware for i18n
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};
