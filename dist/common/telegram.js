"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyTelegram = notifyTelegram;
async function notifyTelegram(text, chatId) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const target = chatId || process.env.TELEGRAM_CHAT_ID;
    if (!token || !target) {
        return { ok: false, skipped: true, reason: 'no token or chat id' };
    }
    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: target,
                text,
                parse_mode: 'HTML',
            }),
        });
        const data = await res.json().catch(() => ({}));
        return { ok: !!data.ok, data };
    }
    catch (e) {
        return { ok: false, error: String(e?.message || e) };
    }
}
//# sourceMappingURL=telegram.js.map