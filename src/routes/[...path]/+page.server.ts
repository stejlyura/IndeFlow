import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import type { PageConfig } from '$lib/types';

export const entries: EntryGenerator = () => {
	// Dynamically generate entries based on existing JSON files
	const modules = import.meta.glob('/messages/**/*.json');
	const paths: { path: string }[] = [{ path: '' }];

	for (const file of Object.keys(modules)) {
		// e.g., /messages/europe/en/home.json
		const cleanPath = file.replace('/messages/', '').replace('.json', '');
		const parts = cleanPath.split('/');
		if (parts.length >= 3) {
			const region = parts[0];
			const lang = parts[1];
			const page = parts.slice(2).join('/');

			// Make message/europe/en/home exclusively the main route '/'
			if (region === 'europe' && lang === 'en' && page === 'home') {
				continue;
			}

			// Add full path
			paths.push({ path: `${region}/${lang}/${page}` });

			// Add short variants for defaults
			if (region === 'europe') {
				paths.push({ path: `${lang}/${page}` });
				if (page === 'home') {
					paths.push({ path: `${region}/${lang}` });
					paths.push({ path: `${lang}` });
				}
			}
		}
	}

	return paths;
};

export const load: PageServerLoad = async ({ params }) => {
    // Игнорируем запросы к служебным скриптам (Partytown) и файлам (favicon.ico и т.д.)
    if (params.path && (params.path.includes('.') || params.path.startsWith('~'))) {
        throw error(404, 'Not found');
    }

    let region = 'europe';
    let lang = 'en';
    let page = 'home';
    const pathParts = params.path ? params.path.split('/').filter(Boolean) : [];

    // Определяем известные регионы
    const knownRegions = ['europe', 'cis', 'asia', 'usa'];

    if (pathParts.length > 0) {
        if (knownRegions.includes(pathParts[0])) {
            region = pathParts.shift()!;
        }
        
        if (pathParts.length > 0 && pathParts[0].length === 2) {
            lang = pathParts.shift()!;
        }

        if (pathParts.length > 0) {
            page = pathParts.join('/');
        }
    }

    // Prevent direct access to the default route components through full path
    if (params.path && region === 'europe' && lang === 'en' && page === 'home') {
        throw error(404, 'Not found');
    }

    try {
        const modules = import.meta.glob('/messages/**/*.json');
        const importPath = `/messages/${region}/${lang}/${page}.json`;
        
        if (!modules[importPath]) {
            console.error(`Available modules:`, Object.keys(modules));
            throw new Error(`Module ${importPath} not found in import.meta.glob`);
        }
        
        const data = await modules[importPath]() as { default: PageConfig };
        return {
            pageConfig: data.default,
            region,
            lang
        };
    } catch (err) {
        console.error(`Error loading page config for region: ${region}, lang: ${lang}, page: ${page}`, err);
        throw error(404, 'Not found');
    }
};