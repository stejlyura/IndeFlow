import { error } from '@sveltejs/kit';
import type { PageConfig } from '$lib/types';

// Load all JSON files from the messages directory
const modules = import.meta.glob('/messages/**/*.json');

/**
 * Content delivery pipeline for IndxFlow.
 * Handles localization, fallbacks, and common data merging.
 */
export async function loadPageContent(lang: string, page: string): Promise<PageConfig> {
    const importPath = `/messages/${lang}/${page}.json`;
    const commonPath = `/messages/${lang}/common.json`;
    const fallbackPath = `/messages/en/${page}.json`;

    let content: any = {};

    try {
        // 1. Load common data (globals like header/footer text)
        if (modules[commonPath]) {
            const commonData = await modules[commonPath]() as { default: any };
            content = { ...commonData.default };
        }

        // 2. Load page-specific data
        let pageData: any = {};
        if (modules[importPath]) {
            pageData = (await modules[importPath]() as { default: any }).default;
        } else if (modules[fallbackPath]) {
            console.warn(`[ContentPipeline] Fallback to EN for: ${importPath}`);
            pageData = (await modules[fallbackPath]() as { default: any }).default;
        } else {
            throw error(404, `Page configuration not found for: ${page}`);
        }

        // 3. Merge data (Page data overrides common data)
        const finalConfig = { ...content, ...pageData };

        return finalConfig as PageConfig;
    } catch (err) {
        if ((err as any).status === 404) throw err;
        console.error(`[ContentPipeline] Unexpected error:`, err);
        throw error(500, 'Internal server error during content loading');
    }
}

