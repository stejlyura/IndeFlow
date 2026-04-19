export async function onRequestPost(context) {
    try {
        const formData = await context.request.formData();
        const data = Object.fromEntries(formData);
        
        // Build HTML message
        let message = `<b>🚀 New Form Submission</b>\n\n`;
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                message += `<b>${key}:</b> ${value}\n`;
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
