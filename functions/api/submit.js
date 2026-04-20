function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return String(unsafe);
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function onRequestPost(context) {
    try {
        // CORS & CSRF Protection
        const origin = context.request.headers.get('Origin') || context.request.headers.get('Referer');
        if (!origin) {
            return new Response('Forbidden: Missing Origin', { status: 403 });
        }

        try {
            const originUrl = new URL(origin);
            const hostname = originUrl.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            
            // Allow production domain and Cloudflare Pages dev domains
            const isProduction = hostname.includes('indexflow.agency') || hostname.endsWith('pages.dev');
            
            if (!isLocalhost && !isProduction) {
                return new Response('Forbidden: Invalid Origin', { status: 403 });
            }
        } catch (e) {
            return new Response('Forbidden: Invalid Origin', { status: 403 });
        }

        const formData = await context.request.formData();
        
        // Turnstile Validation
        const turnstileResponse = formData.get('cf-turnstile-response');
        if (!turnstileResponse) {
            return Response.redirect(new URL('/?error=bot', context.request.url).toString(), 303);
        }

        const turnstileSecret = context.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
        const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: new URLSearchParams({
                secret: turnstileSecret,
                response: turnstileResponse
            })
        });

        const verifyOutcome = await verifyResponse.json();
        if (!verifyOutcome.success) {
            return Response.redirect(new URL('/?error=bot', context.request.url).toString(), 303);
        }

        const data = Object.fromEntries(formData);
        
        const ALLOWED_KEYS = ["Name", "Email", "Company Name", "Budget", "Currency", "Deadline", "Project Description"];
        const MAX_LENGTH = 500;

        // Build HTML message
        let message = `<b>🚀 New Form Submission</b>\n\n`;
        for (const [key, value] of Object.entries(data)) {
            if (!ALLOWED_KEYS.includes(key)) continue;
            
            if (typeof value === 'string' && value.length > MAX_LENGTH) {
                return Response.redirect(new URL('/?error=validation', context.request.url).toString(), 303);
            }

            if (value) {
                message += `<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}\n`;
            }
        }
        message += `\n<i>Sent from IndexFlow</i>`;

        // Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${context.env.TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: context.env.MY_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            return Response.redirect(new URL('/?error=telegram', context.request.url).toString(), 303);
        }

        // Return a redirect back to the home page with a success parameter
        return Response.redirect(new URL('/?success=true', context.request.url).toString(), 303);
    } catch (err) {
        return Response.redirect(new URL('/?error=internal', context.request.url).toString(), 303);
    }
}
