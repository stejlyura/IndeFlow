import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import type { PageConfig } from '$lib/types';

export const entries: EntryGenerator = () => {
	// SvelteKit needs to know all paths for pure SSG prerendering.
	return [
		{ path: '' },
		{ path: 'uk' },
		{ path: 'production' },
		{ path: 'uk/production' },
		{ path: 'techindex' },
		{ path: 'uk/techindex' },
		{ path: 'supportoptimization' },
		{ path: 'uk/supportoptimization' },
		{ path: 'ads-anlitic' },
		{ path: 'uk/ads-anlitic' }
	];
};

export const load: PageServerLoad = async ({ params }) => {
    // Игнорируем запросы к служебным скриптам (Partytown) и файлам (favicon.ico и т.д.)
    if (params.path && (params.path.includes('.') || params.path.startsWith('~'))) {
        throw error(404, 'Not found');
    }

    let lang = 'en';
    let page = 'home';
    const pathParts = params.path ? params.path.split('/') : [];

    if (pathParts.length > 0 && pathParts[0] !== '') {
        if (pathParts[0].length === 2) {
            lang = pathParts[0];
            page = pathParts.length > 1 ? pathParts.slice(1).join('/') : 'home';
        } else {
            page = pathParts.join('/');
        }
    }

    try {
        const modules = import.meta.glob('/messages/**/*.json');
        const importPath = `/messages/${lang}/${page}.json`;
        
        if (!modules[importPath]) {
            console.error(`Available modules:`, Object.keys(modules));
            throw new Error(`Module ${importPath} not found in import.meta.glob`);
        }
        
        const data = await modules[importPath]() as { default: PageConfig };
        return {
            pageConfig: data.default
        };
    } catch (err) {
        console.error(`Error loading page config for lang: ${lang}, page: ${page}`, err);
        throw error(404, 'Not found');
    }
};