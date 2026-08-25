import { createApp } from '../app';
import { createD1Repository } from '../db/factory';

/**
 * Cloudflare Worker 入口。
 * 每次请求按当前 bindings 构造 App（Hono 实例足够轻量），
 * 保证短链服务按是否绑定 DB 动态启停。
 */
const SCHEMA_READY = '__sub_convert_d1_schema_ready__';

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const repo = createD1Repository(env.DB);

        // D1 不会自动建表，启用短链时首次自动初始化（幂等，每个 isolate 只跑一次）
        if (repo && !(globalThis as Record<string, unknown>)[SCHEMA_READY]) {
            await repo.ensureSchema();
            (globalThis as Record<string, unknown>)[SCHEMA_READY] = true;
        }

        const app = createApp({ repo });
        const boundEnv: Env = { ...env, SHORT_URL_ENABLED: repo !== null };
        return app.fetch(request, boundEnv, ctx);
    }
} satisfies ExportedHandler<Env>;
