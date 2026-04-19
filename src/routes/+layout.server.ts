import type { LayoutServerLoad } from './$types';

export const csr = false;
export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutServerLoad = async () => {
    // Dynamically get all pages from the en messages folder
    const modules = import.meta.glob('/messages/en/**/*.json');
    const pages = Object.keys(modules)
        .map(file => file.replace('/messages/en/', '').replace('.json', ''))
        .filter(p => p !== 'common'); // common is for translations, not a page
    
    return { pages };
};
