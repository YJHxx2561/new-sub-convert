import type { ShortUrl } from '../types';

export interface IUrlRepository {
    add: (long_url: string, baseUrl: string) => Promise<ShortUrl>;
    deleteByCode: (code: string) => Promise<void>;
    getByCode: (code: string) => Promise<ShortUrl | null>;
    getList: (page: number, pageSize: number) => Promise<{ total: number; items: ShortUrl[] }>;
    /** 确保数据表存在（幂等）。Cloudflare D1 端需要，Node 端已在启动时自动建表。 */
    ensureSchema?: () => Promise<void>;
}

export function generateShortCode(): string {
    return crypto.randomUUID().substring(0, 8);
}
