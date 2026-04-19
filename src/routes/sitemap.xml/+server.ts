export const prerender = true;
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Dynamically generate entries based on existing JSON files
	const modules = import.meta.glob('/messages/**/*.json');
	const baseUrl = 'https://indexflow.io'; // Change to your actual domain
	const paths: string[] = [];

	for (const file of Object.keys(modules)) {
		// e.g., /messages/europe/en/home.json
		const cleanPath = file.replace('/messages/', '').replace('.json', '');
		const parts = cleanPath.split('/');
		
		if (parts.length >= 3) {
			const region = parts[0];
			const lang = parts[1];
			const page = parts.slice(2).join('/');

			// Add full path
			paths.push(`${region}/${lang}/${page}`);

			// Add short variants for defaults (matching logic in +page.server.ts)
			if (region === 'europe') {
				paths.push(`eu/${lang}/${page}`);
				paths.push(`${lang}/${page}`);
				
				if (page === 'home') {
					paths.push(`eu/${lang}`);
					paths.push(`${region}/${lang}`);
					paths.push(`${lang}`);
				}
			}
		}
	}

	// Filter unique paths and clean up 'home' suffixes for cleaner URLs
	const uniquePaths = [...new Set(paths.map(p => p.replace(/\/home$/, '').replace(/^home$/, '')))];
	
	// Ensure root is included if desired, but here we redirect to /eu/en
	// so /eu/en is the primary entry point.

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths
	.map(
		(path) => `  <url>
    <loc>${baseUrl}/${path ? path : ''}</loc>
    <changefreq>daily</changefreq>
    <priority>${path === 'eu/en' || path === '' ? '1.0' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
