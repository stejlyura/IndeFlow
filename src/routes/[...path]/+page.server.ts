import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { loadPageContent } from '$lib/server/content';
import { TELEGRAM_TOKEN, MY_CHAT_ID } from '$env/static/private';

export const entries: EntryGenerator = () => {
	// Dynamically generate entries based on JSON files in /messages/{lang}/
	const modules = import.meta.glob('/messages/**/*.json');
	const paths: { path: string }[] = [];
	const locales = ['en', 'ru', 'uk'];

	for (const file of Object.keys(modules)) {
		const cleanPath = file.replace('/messages/', '').replace('.json', '');
		const parts = cleanPath.split('/');
		
		if (parts.length >= 2) {
			const lang = parts[0];
			const page = parts.slice(1).join('/');
			
			if (page === 'common') continue; 

			paths.push({ path: `${lang}/${page}` });

			if (page === 'home') {
				paths.push({ path: `${lang}` });
			}
		}
	}

	paths.push({ path: '' });
	return paths;
};

export const load: PageServerLoad = async ({ params }) => {
	const pathParts = params.path ? params.path.split('/').filter(Boolean) : [];

	let lang = 'en';
	let page = 'home';

	const knownRegions = ['europe', 'cis', 'asia', 'usa', 'eu'];

	if (pathParts.length > 0) {
		if (knownRegions.includes(pathParts[0])) {
			pathParts.shift();
		}
		
		if (pathParts.length > 0 && ['en', 'ru', 'uk'].includes(pathParts[0])) {
			lang = pathParts.shift()!;
		}
		
		if (pathParts.length > 0) {
			page = pathParts.join('/');
		}
	}

	try {
		const pageConfig = await loadPageContent(lang, page);
		
		return {
			pageConfig,
			lang,
			region: 'europe' 
		};
	} catch (err) {
		console.error(`Error loading page config for lang: ${lang}, page: ${page}`, err);
		throw error(404, 'Not found');
	}
};

