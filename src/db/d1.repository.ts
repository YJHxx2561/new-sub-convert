import type { ShortUrl } from '../types';
import type { IUrlRepository } from './types';
import { generateShortCode } from './types';

export class D1UrlRepository implements IUrlRepository {
    constructor(private readonly db: D1Database) {}

    /**
     * 确保 short_url 表存在（含 created_at 列）。
     * D1 不会像 Node 端那样在启动时自动建表，这里在入口调用一次，
     * 避免未先执行 schema.sql/migration 就报 "no such table: short_url"。
     * 该方法幂等，可安全重复调用。
     */
    async ensureSchema(): Promise<void> {
        await this.db
            .prepare(
                `CREATE TABLE IF NOT EXISTS short_url (
                    id INTEGER PRIMARY KEY,
                    short_code TEXT,
                    short_url TEXT,
                    long_url TEXT,
                    created_at TEXT
                )`
            )
            .run();

        // 兼容旧表：缺少 created_at 列时补齐
        const col = await this.db
            .prepare(`SELECT COUNT(*) as c FROM pragma_table_info('short_url') WHERE name = 'created_at'`)
            .first<{ c: number }>();
        if (!col?.c) {
            await this.db.prepare('ALTER TABLE short_url ADD COLUMN created_at TEXT').run();
        }
    }

    async add(long_url: string, baseUrl: string): Promise<ShortUrl> {
        const code = generateShortCode();
        const short_url = `${baseUrl}/${code}`;
        const created_at = new Date().toISOString();

        const result = await this.db
            .prepare(
                'INSERT INTO short_url (short_code, short_url, long_url, created_at) VALUES (?, ?, ?, ?) RETURNING id'
            )
            .bind(code, short_url, long_url, created_at)
            .first<{ id: number }>();

        if (!result?.id) {
            throw new Error('Failed to create short URL');
        }

        return { id: result.id, short_code: code, short_url, long_url, created_at };
    }

    async deleteByCode(code: string): Promise<void> {
        await this.db.prepare('DELETE FROM short_url WHERE short_code = ?').bind(code).run();
    }

    async getByCode(code: string): Promise<ShortUrl | null> {
        return await this.db
            .prepare('SELECT id, short_code, short_url, long_url, created_at FROM short_url WHERE short_code = ?')
            .bind(code)
            .first<ShortUrl>();
    }

    async getList(page: number, pageSize: number): Promise<{ total: number; items: ShortUrl[] }> {
        const offset = (page - 1) * pageSize;
        const [total, items] = await Promise.all([
            this.db.prepare('SELECT COUNT(*) as count FROM short_url').first<{ count: number }>(),
            this.db
                .prepare(
                    `SELECT id, short_code, short_url, long_url, created_at
                     FROM short_url
                     ORDER BY created_at IS NULL, created_at DESC, id DESC
                     LIMIT ? OFFSET ?`
                )
                .bind(pageSize, offset)
                .all<ShortUrl>()
        ]);

        return {
            total: total?.count || 0,
            items: items?.results || []
        };
    }
}
