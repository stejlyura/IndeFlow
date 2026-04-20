export const prerender = true;
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Dynamically generate entries based on existing JSON files in /messages/{lang}/
	const modules = import.meta.glob('/messages/**/*.json');
	const baseUrl = 'https://indxflow.com';
	const locales = ['en', 'ru', 'uk'];
	
	// Map pages to their available locales
	// Key: page path (e.g. "home", "technical")
	// Value: Set of locales
	const pagesMap = new Map<string, Set<string>>();

	for (const file of Object.keys(modules)) {
		// e.g., /messages/en/home.json
		const cleanPath = file.replace('/messages/', '').replace('.json', '');
		const parts = cleanPath.split('/');
		
		if (parts.length >= 2) {
			const lang = parts[0];
			const page = parts.slice(1).join('/');

			if (page === 'common') continue;
			if (!locales.includes(lang)) continue;

			if (!pagesMap.has(page)) {
				pagesMap.set(page, new Set());
			}
			pagesMap.get(page)!.add(lang);
		}
	}

	const urls: string[] = [];

	for (const [page, pageLocales] of pagesMap.entries()) {
		for (const lang of pageLocales) {
			// URL generation logic matching the new SEO-friendly structure: /[lang]/[page]
			// For home page, we use /[lang]
			const path = page === 'home' ? lang : `${lang}/${page}`;
			const loc = `${baseUrl}/${path}`;
			
			let alternateLinks = '';
			
			// 1. Add alternate links for each available language version of this specific page
			for (const altLang of locales) {
				if (pageLocales.has(altLang)) {
					const altPath = page === 'home' ? altLang : `${altLang}/${page}`;
					alternateLinks += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${baseUrl}/${altPath}" />\n`;
				}
			}

			// 2. Add x-default (pointing to English version)
			if (pageLocales.has('en')) {
				const defaultPath = page === 'home' ? 'en' : `en/${page}`;
				alternateLinks += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/${defaultPath}" />\n`;
			}

			urls.push(`  <url>
    <loc>${loc}</loc>
${alternateLinks}    <changefreq>weekly</changefreq>
    <priority>${page === 'home' ? '1.0' : '0.8'}</priority>
  </url>`);
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};


