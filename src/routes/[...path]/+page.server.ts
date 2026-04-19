import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import type { PageConfig } from '$lib/types';

export const entries: EntryGenerator = () => {
	// Dynamically generate entries based on JSON files in /messages/{lang}/
	const modules = import.meta.glob('/messages/**/*.json');
	const paths: { path: string }[] = [];
	const locales = ['en', 'ru', 'uk'];

	for (const file of Object.keys(modules)) {
		// e.g., /messages/en/home.json or /messages/en/technical.json
		const cleanPath = file.replace('/messages/', '').replace('.json', '');
		const parts = cleanPath.split('/');
		
		if (parts.length >= 2) {
			const lang = parts[0];
			const page = parts.slice(1).join('/');

			if (page === 'common') continue; // Skip common translations

			// Generate path: lang/page
			paths.push({ path: `${lang}/${page}` });

			// If it's the home page, also allow just the language code
			if (page === 'home') {
				paths.push({ path: `${lang}` });
			}
		}
	}

	// Add root path
	paths.push({ path: '' });

	return paths;
};

export const load: PageServerLoad = async ({ params }) => {
	const pathParts = params.path ? params.path.split('/').filter(Boolean) : [];

	let lang = 'en';
	let page = 'home';

	const knownRegions = ['europe', 'cis', 'asia', 'usa', 'eu'];

	if (pathParts.length > 0) {
		// Ignore legacy region prefixes
		if (knownRegions.includes(pathParts[0])) {
			pathParts.shift();
		}
		
		// Parse language
		if (pathParts.length > 0 && ['en', 'ru', 'uk'].includes(pathParts[0])) {
			lang = pathParts.shift()!;
		}
		
		if (pathParts.length > 0) {
			page = pathParts.join('/');
		}
	}

	try {
		const modules = import.meta.glob('/messages/**/*.json');
		let importPath = `/messages/${lang}/${page}.json`;
		
		if (!modules[importPath]) {
			console.warn(`Module ${importPath} not found, falling back to English`);
			importPath = `/messages/en/${page}.json`;
		}
		
		if (!modules[importPath]) {
			throw error(404, `Page content not found for ${page}`);
		}
		
		const data = await modules[importPath]() as { default: PageConfig };
		return {
			pageConfig: data.default,
			lang,
			region: 'europe' // Default region for the new structure
		};
	} catch (err) {
		console.error(`Error loading page config for lang: ${lang}, page: ${page}`, err);
		throw error(404, 'Not found');
	}
};

