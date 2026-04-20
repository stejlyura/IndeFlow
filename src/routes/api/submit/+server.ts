import { json } from '@sveltejs/kit';
import { TELEGRAM_TOKEN, MY_CHAT_ID } from '$env/static/private';

export const prerender = false;

export async function POST({ request }) {
    try {
        const formData = Object.fromEntries(await request.formData());
        
        let message = `<b>🚀 New Form Submission</b>\n\n`;
        for (const [key, value] of Object.entries(formData)) {
            if (value) {
                message += `<b>${key}:</b> ${value}\n`;
            }
        }
        message += `\n<i>Sent from IndxFlow</i>`;

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: MY_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API error:', errorData);
            return json({ success: false, error: 'Telegram API failure' }, { status: 500 });
        }

        return json({ type: 'success', success: true });
    } catch (err) {
        console.error('Form submission error:', err);
        return json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

