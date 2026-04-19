import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { notifyGoogleIndexing } from '$lib/server/indexing';

/**
 * POST /api/index
 * Trigger Google Indexing for a specific URL.
 * Secure this endpoint with an API key in production.
 */
export const POST: RequestHandler = async ({ request, url: requestUrl }) => {
    try {
        const { url, type, apiKey } = await request.json();

        // Basic security check (Optional: implement a real API key check)
        const MASTER_KEY = process.env.INDEXING_API_KEY;
        if (MASTER_KEY && apiKey !== MASTER_KEY) {
            throw error(401, 'Unauthorized');
        }

        if (!url) {
            throw error(400, 'Missing URL parameter');
        }

        const result = await notifyGoogleIndexing(url, type || 'URL_UPDATED');

        return json(result);
    } catch (err) {
        console.error('[API/Index] Error:', err);
        return json({ success: false, message: (err as Error).message }, { status: 500 });
    }
};
