export declare function notifyTelegram(text: string, chatId?: string): Promise<{
    ok: boolean;
    skipped: boolean;
    reason: string;
    data?: undefined;
    error?: undefined;
} | {
    ok: boolean;
    data: any;
    skipped?: undefined;
    reason?: undefined;
    error?: undefined;
} | {
    ok: boolean;
    error: string;
    skipped?: undefined;
    reason?: undefined;
    data?: undefined;
}>;
