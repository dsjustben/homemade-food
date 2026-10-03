/** Optional Telegram notify. Set TELEGRAM_BOT_TOKEN (+ optional TELEGRAM_CHAT_ID). */
export async function notifyTelegram(text: string, chatId?: string) {
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
  } catch (e: any) {
    return { ok: false, error: String(e?.message || e) };
  }
}
