/**
 * IndexFlow: Google Indexing & IndexNow (Bing/Yandex) Integration Script
 * This script can be triggered in CI/CD (GitHub Actions) after a successful build.
 */

async function pingIndexNow(urlList) {
    const key = process.env.INDEXNOW_KEY;
    const keyLocation = `https://indexflow.agency/${key}.txt`;
    const host = 'indexflow.agency';

    if (!key) {
        console.log('[IndexNow] Missing INDEXNOW_KEY. Skipping...');
        return;
    }

    try {
        const response = await fetch('https://api.indexnow.org/IndexNow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                host,
                key,
                keyLocation,
                urlList
            })
        });

        if (response.ok) {
            console.log('[IndexNow] Successfully notified search engines.');
        } else {
            console.error('[IndexNow] Failed to notify search engines:', await response.text());
        }
    } catch (err) {
        console.error('[IndexNow] Error:', err);
    }
}

async function pingGoogle(url) {
    // Note: Google Indexing API requires a service account key and the 'googleapis' package.
    // This is a placeholder for the integration logic.
    console.log(`[GoogleIndexing] Requesting crawl for: ${url}`);
    console.log('[GoogleIndexing] Service account required for production use.');
}

// Example usage
const urlsToPing = [
    'https://indexflow.agency/en',
    'https://indexflow.agency/en/technical'
];

if (process.env.CI) {
    pingIndexNow(urlsToPing);
    urlsToPing.forEach(pingGoogle);
} else {
    console.log('[Indexing] Running in local mode. No pings sent.');
}
