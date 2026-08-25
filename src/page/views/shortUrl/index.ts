import { getConfiguredAdminKey } from '../../../shared/adminKey';
import { SubButton, SubForm, SubFormItem, SubMessage, SubModal, SubTable, SubTextarea } from '../../components';

export function showShortUrlPage(_request: Request, env: Env): Response {
    const hasDBConfig = env.SHORT_URL_ENABLED === true;
    const hasAdminKey = getConfiguredAdminKey(env) !== null;

    const columns = [
        { key: 'short_url', title: '短链' },
        { key: 'long_url', title: '长链', ellipsis: true },
        { key: 'created_at', title: '创建时间', width: '170px' },
        { type: 'actions', title: '操作', width: '120px' }
    ];

    const actions = [
        { key: 'copy', label: '复制' },
        { key: 'delete', label: '删除', danger: true }
    ];

    const html = `
    <!DOCTYPE html>
        <html lang="zh-CN" class="short-url-page">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>短链管理</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <style>
                    /*
                     * 主题变量：与首页（subconvert 转换页）保持一致的设计令牌。
                     * 通过 body.light-mode / body.dark-mode 切换。
                     */
                    body.light-mode {
                        --page-surface: #d8e0e5;
                        --page-grid: rgba(51, 65, 85, 0.05);
                        --bg: rgba(241, 245, 247, 0.84);
                        --panel: rgba(246, 249, 250, 0.92);
                        --soft: #e5ecef;
                        --text: #000;
                        --muted: rgba(15, 23, 42, 0.66);
                        --line: rgba(51, 65, 85, 0.12);
                        --accent: #2f6f68;
                        --accent-strong: #4e708b;
                        --accent-fog: rgba(78, 112, 139, 0.12);
                        --accent-ring: rgba(78, 112, 139, 0.16);
                        --accent-outline: rgba(78, 112, 139, 0.42);
                        --shadow: 0 24px 56px rgba(51, 65, 85, 0.12);
                    }

                    body.dark-mode {
                        --page-surface: #0b1120;
                        --page-grid: rgba(148, 163, 184, 0.05);
                        --bg: rgba(7, 16, 30, 0.78);
                        --panel: rgba(8, 20, 38, 0.92);
                        --soft: rgba(15, 23, 42, 0.7);
                        --text: #f8fbff;
                        --muted: rgba(226, 232, 240, 0.7);
                        --line: rgba(148, 163, 184, 0.16);
                        --accent: #38bdf8;
                        --accent-strong: #67e8f9;
                        --accent-fog: rgba(56, 189, 248, 0.16);
                        --accent-ring: rgba(56, 189, 248, 0.14);
                        --accent-outline: rgba(56, 189, 248, 0.45);
                        --shadow: 0 30px 80px rgba(2, 6, 23, 0.52);
                    }

                    /*
                     * 将旧设计系统（sub-* 组件）使用的令牌映射到首页主题令牌，
                     * 使 sub-table / sub-modal / sub-button / sub-form 等组件一套皮肤。
                     */
                    body {
                        --background: var(--bg);
                        --background-primary: var(--panel);
                        --background-secondary: var(--soft);
                        --background-disabled: var(--soft);
                        --border-color: var(--line);
                        --border-hover: var(--accent-outline);
                        --text-primary: var(--text);
                        --text-secondary: var(--muted);
                        --text-disabled: var(--muted);
                        --primary-color: var(--accent);
                        --primary-hover: var(--accent-strong);
                        --primary-active: var(--accent);
                        --radius: 12px;
                        --transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }

                    * { box-sizing: border-box; }

                    /* 移除点击/聚焦时的浏览器默认蓝色焦点框（含 focus-visible） */
                    *:focus,
                    *:focus-visible {
                        outline: none !important;
                        outline-offset: 0 !important;
                        box-shadow: none !important;
                        text-decoration: none !important;
                    }
                    a:focus, a:focus-visible { outline: none !important; }
                    /* 安卓 Chrome 触摸点击的一闪半透明蓝色蒙层 */
                    * { -webkit-tap-highlight-color: transparent; }

                    /* 兜底：页面内任意可聚焦元素点击/聚焦都不出现蓝框 */
                    .subconverter-page :focus, .subconverter-page :focus-visible,
                    .admin-key-input:focus, .admin-key-input:focus-visible,
                    .subconverter-theme-btn:focus, .subconverter-theme-btn:focus-visible,
                    .subconverter-topbar__link:focus, .subconverter-topbar__link:focus-visible { outline: none !important; box-shadow: none !important; }

                    html, body { margin: 0; padding: 0; }
                    body.light-mode, body.dark-mode {
                        background: var(--page-surface, #0b1120);
                        font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
                    }

                    .subconverter-page {
                        position: relative;
                        min-height: 100vh;
                        padding: 28px 18px 104px;
                        color: var(--text);
                        overflow-x: hidden;
                        background-color: var(--page-surface, #0b1120);
                        background-image:
                            linear-gradient(var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px),
                            linear-gradient(90deg, var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px);
                        background-size: 24px 24px;
                        transition: background-color 0.3s ease;
                    }

                    .subconverter-glow {
                        position: absolute;
                        border-radius: 999px;
                        filter: blur(18px);
                        pointer-events: none;
                    }
                    .subconverter-glow--one { left: -120px; top: 20px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(34,211,238,0.24) 0, rgba(34,211,238,0) 72%); }
                    .subconverter-glow--two { right: -120px; bottom: 40px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(16,185,129,0.18) 0, rgba(16,185,129,0) 72%); }
                    body.light-mode .subconverter-glow { display: none; }

                    .subconverter-topbar {
                        position: relative;
                        z-index: 2;
                        max-width: 1032px;
                        margin: 0 auto 0;
                        padding: 0 16px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 12px;
                    }
                    .subconverter-topbar__link {
                        color: var(--muted);
                        font-size: 13px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 8px 12px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--bg);
                        transition: color 0.18s ease, border-color 0.18s ease;
                    }
                    .subconverter-topbar__link:hover { color: var(--accent); border-color: var(--accent-outline); }

                    .subconverter-theme-btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--bg);
                        color: var(--text);
                        cursor: pointer;
                        font-size: 20px;
                        font-family: ui-monospace, monospace;
                        font-weight: 700;
                        line-height: 1;
                        transition: color 0.18s ease, border-color 0.18s ease;
                    }
                    .subconverter-theme-btn:hover { color: var(--accent); border-color: var(--accent-outline); }

                    .subconverter-layout {
                        position: relative;
                        z-index: 1;
                        width: 100%;
                        max-width: 1032px;
                        margin: 18px auto 0;
                        padding: 16px;
                    }

                    .subconverter-card {
                        border: 1px solid var(--line);
                        border-radius: 28px;
                        background: var(--bg);
                        box-shadow: var(--shadow);
                        backdrop-filter: blur(18px) saturate(180%);
                        overflow: hidden;
                    }
                    .subconverter-card__header {
                        padding: 28px 28px 20px;
                        border-bottom: 1px solid var(--line);
                    }
                    .subconverter-card__body { padding: 22px 28px 28px; }

                    .subconverter-hero { display: flex; flex-direction: column; gap: 10px; }
                    .subconverter-hero__eyebrow {
                        display: inline-flex;
                        font: 700 12px/1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: 0.24em;
                        text-transform: uppercase;
                        color: var(--accent);
                    }
                    .short-url-titlebar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 16px;
                        flex-wrap: wrap;
                    }
                    .short-url-title {
                        margin: 0;
                        font: 700 30px/1.1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: -0.02em;
                        color: var(--text);
                    }
                    .short-url-desc { margin: 8px 0 0; color: var(--muted); font-size: 14px; line-height: 1.7; }

                    .short-url-toolbar { margin: 0 0 18px; display: flex; justify-content: flex-end; }

                    /* 分页 */
                    .short-url-pagination {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        gap: 8px;
                        margin-top: 18px;
                        flex-wrap: wrap;
                    }
                    .short-url-pagination span { color: var(--muted); font-size: 13px; }
                    .short-url-pagination button {
                        padding: 6px 14px;
                        border: 1px solid var(--line);
                        border-radius: 10px;
                        background: var(--panel);
                        color: var(--text);
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: color 0.18s ease, border-color 0.18s ease, opacity 0.18s ease;
                    }
                    .short-url-pagination button:hover:not(:disabled) { color: var(--accent); border-color: var(--accent-outline); }
                    .short-url-pagination button:disabled { opacity: 0.4; cursor: not-allowed; }

                    .admin-key-input {
                        width: 100%;
                        min-height: 40px;
                        padding: 8px 14px;
                        border: 1px solid transparent;
                        border-radius: 14px;
                        background: var(--soft);
                        color: var(--text);
                        box-sizing: border-box;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .admin-key-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-ring); }
                    .admin-key-input::placeholder { color: var(--muted); }

                    .modal-form-actions {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        gap: 10px;
                    }

                    #short-url-main[hidden] { display: none !important; }

                    @media (max-width: 640px) {
                        .subconverter-page { padding: 16px 10px 92px; }
                        .subconverter-card__header, .subconverter-card__body { padding-left: 18px; padding-right: 18px; }
                        .subconverter-layout { padding: 0; }
                    }
                </style>
            </head>
            <body class="dark-mode">
                <div class="subconverter-page">
                    <div class="subconverter-glow subconverter-glow--one"></div>
                    <div class="subconverter-glow subconverter-glow--two"></div>

                    <div class="subconverter-topbar">
                        <span></span>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <a class="subconverter-topbar__link" href="/">订阅转换</a>
                            <button class="subconverter-theme-btn" type="button" id="theme-toggle" aria-label="切换主题" title="切换主题">
                                <span id="theme-icon">☾</span>
                            </button>
                        </div>
                    </div>

                    <div class="subconverter-layout">
                        <div class="subconverter-card" id="short-url-main" hidden>
                            <div class="subconverter-card__header">
                                <div class="subconverter-hero">
                                    <span class="subconverter-hero__eyebrow">Short Links</span>
                                    <div class="short-url-titlebar">
                                        <h2 class="short-url-title">短链管理</h2>
                                        <div class="short-url-toolbar">
                                            <sub-button id="open-create-modal-btn" type="primary">+ 生成短链</sub-button>
                                        </div>
                                    </div>
                                    <p class="short-url-desc">创建、复制与删除你的短链记录。</p>
                                </div>
                            </div>
                            <div class="subconverter-card__body">
                                <sub-table
                                    id="short-url-table"
                                    row-key="short_code"
                                    columns='${JSON.stringify(columns)}'
                                    actions='${JSON.stringify(actions)}'
                                    data="[]"
                                    empty-text="暂无数据"
                                ></sub-table>
                                <div class="short-url-pagination" id="short-url-pagination">
                                    <span id="pagination-total">共 0 条</span>
                                    <button type="button" id="pagination-prev" disabled>上一页</button>
                                    <span id="pagination-page">第 1/1 页</span>
                                    <button type="button" id="pagination-next" disabled>下一页</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <sub-modal id="auth-modal" title="管理验证">
                    <sub-form-item label="管理密钥">
                        <input
                            id="admin-key-input"
                            class="admin-key-input"
                            type="password"
                            placeholder="请输入管理密钥"
                            autocomplete="current-password"
                        />
                    </sub-form-item>
                    <div class="modal-form-actions" slot="footer">
                        <sub-button id="auth-cancel-btn" type="default">取消</sub-button>
                        <sub-button id="auth-submit-btn" type="default">进入</sub-button>
                    </div>
                </sub-modal>

                <sub-modal id="create-modal" title="生成短链">
                    <sub-form id="short-url-form" label-width="100px">
                        <sub-form-item label="长链地址">
                            <sub-textarea
                                key="long_url"
                                placeholder="输入需要缩短的完整 URL"
                                rows="4"
                            ></sub-textarea>
                        </sub-form-item>
                    </sub-form>
                    <div class="modal-form-actions" slot="footer">
                        <sub-button id="cancel-create-btn" type="default">取消</sub-button>
                        <sub-button id="create-short-url-btn" type="primary">生成短链</sub-button>
                    </div>
                </sub-modal>

                ${SubTextarea()}
                ${SubFormItem()}
                ${SubForm()}
                ${SubButton()}
                ${SubTable()}
                ${SubModal()}
                ${SubMessage()}

                <script>
                    // ---- 主题（与首页一致：手动 + 自动跟随系统） ----
                    function initTheme() {
                        var body = document.body;
                        var icon = document.getElementById('theme-icon');
                        function apply(theme) {
                            body.classList.remove('light-mode', 'dark-mode');
                            body.classList.add(theme);
                            icon.textContent = theme === 'dark-mode' ? '☾' : '☀';
                        }
                        function detect() {
                            var saved = window.localStorage.getItem('localTheme');
                            if (saved === 'light-mode' || saved === 'dark-mode') { apply(saved); return; }
                            var h = new Date().getHours();
                            var theme = (h >= 19 || h < 7) ? 'dark-mode' : 'light-mode';
                            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark-mode';
                            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light-mode';
                            apply(theme);
                        }
                        document.getElementById('theme-toggle').addEventListener('click', function () {
                            var isDark = body.classList.contains('dark-mode');
                            var next = isDark ? 'light-mode' : 'dark-mode';
                            window.localStorage.setItem('localTheme', next);
                            apply(next);
                        });
                        if (window.matchMedia) {
                            var mq = window.matchMedia('(prefers-color-scheme: dark)');
                            var cb = function () { if (!window.localStorage.getItem('localTheme')) detect(); };
                            if (mq.addEventListener) mq.addEventListener('change', cb);
                            else if (mq.addListener) mq.addListener(cb);
                        }
                        detect();
                    }

                    class ShortUrlManager {
                        #enabled = ${hasDBConfig};
                        #hasAdminKey = ${hasAdminKey};
                        #authenticated = false;
                        #adminKey = '';
                        #page = 1;
                        #pageSize = 20;
                        #total = 0;
                        #model = { long_url: '' };
                        #storageKey = 'short_url_admin_key';

                        #main = document.querySelector('#short-url-main');
                        #authModal = document.querySelector('#auth-modal');
                        #adminKeyInput = document.querySelector('#admin-key-input');
                        #authCancelBtn = document.querySelector('#auth-cancel-btn');
                        #authSubmitBtn = document.querySelector('#auth-submit-btn');
                        #form = document.querySelector('#short-url-form');
                        #modal = document.querySelector('#create-modal');
                        #openModalBtn = document.querySelector('#open-create-modal-btn');
                        #cancelBtn = document.querySelector('#cancel-create-btn');
                        #createBtn = document.querySelector('#create-short-url-btn');
                        #table = document.querySelector('#short-url-table');
                        #prevBtn = document.querySelector('#pagination-prev');
                        #nextBtn = document.querySelector('#pagination-next');
                        #totalEl = document.querySelector('#pagination-total');
                        #pageEl = document.querySelector('#pagination-page');

                        constructor() {
                            this.#bindEvents();
                            this.#bootstrap();
                        }

                        async #bootstrap() {
                            if (!this.#enabled) {
                                notification.error('短链服务未启用');
                                setTimeout(() => {
                                    location.href = '/';
                                }, 800);
                                return;
                            }

                            if (!this.#hasAdminKey) {
                                notification.error('请先配置 SHORT_URL_KEY');
                                setTimeout(() => {
                                    location.href = '/';
                                }, 1200);
                                return;
                            }

                            const cached = sessionStorage.getItem(this.#storageKey) || '';
                            if (cached) {
                                const ok = await this.#verifyKey(cached, false);
                                if (ok) {
                                    this.#enter(cached);
                                    return;
                                }
                                sessionStorage.removeItem(this.#storageKey);
                            }

                            this.#authModal.setAttribute('open', '');
                            setTimeout(() => this.#adminKeyInput?.focus(), 0);
                        }

                        #bindEvents() {
                            this.#form?.addEventListener('form:change', e => {
                                this.#model[e.detail.key] = e.detail.value;
                                this.#form.setAttribute('model', JSON.stringify(this.#model));
                            });

                            this.#form?.setAttribute('model', JSON.stringify(this.#model));

                            this.#authSubmitBtn?.addEventListener('click', () => this.#submitAuth());
                            this.#authCancelBtn?.addEventListener('click', () => this.#goHome());
                            this.#adminKeyInput?.addEventListener('keydown', e => {
                                if (e.key === 'Enter') this.#submitAuth();
                            });
                            this.#authModal?.addEventListener('modal:close', () => {
                                if (!this.#authenticated) this.#goHome();
                            });

                            this.#openModalBtn?.addEventListener('click', () => this.#openModal());
                            this.#cancelBtn?.addEventListener('click', () => this.#closeModal());
                            this.#createBtn?.addEventListener('click', () => this.#create());

                            this.#prevBtn?.addEventListener('click', () => {
                                if (this.#page > 1) {
                                    this.#page -= 1;
                                    this.#loadList();
                                }
                            });
                            this.#nextBtn?.addEventListener('click', () => {
                                if (this.#page < this.#totalPages()) {
                                    this.#page += 1;
                                    this.#loadList();
                                }
                            });

                            this.#table?.addEventListener('table:action', e => {
                                const { action, row } = e.detail;
                                if (action === 'copy') this.#copy(row.short_url);
                                if (action === 'delete') this.#delete(row.short_code);
                            });
                        }

                        #goHome() {
                            location.href = '/';
                        }

                        async #submitAuth() {
                            const key = (this.#adminKeyInput?.value || '').trim();
                            if (!key) {
                                notification.error('请输入管理密钥');
                                return;
                            }

                            const ok = await this.#verifyKey(key, true);
                            if (!ok) {
                                notification.error('密钥不正确');
                                setTimeout(() => this.#goHome(), 800);
                                return;
                            }

                            sessionStorage.setItem(this.#storageKey, key);
                            this.#enter(key);
                        }

                        async #verifyKey(key, silentNetworkError) {
                            try {
                                const res = await fetch('/api/admin/verify', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ key })
                                });
                                if (res.ok) return true;
                                if (res.status === 401) return false;
                                let message = '验证失败';
                                try {
                                    const err = await res.json();
                                    message = err.message || message;
                                } catch (_) {}
                                if (!silentNetworkError) notification.error(message);
                                return false;
                            } catch (error) {
                                if (!silentNetworkError) {
                                    notification.error(error.message || '验证失败');
                                }
                                return false;
                            }
                        }

                        #enter(key) {
                            this.#adminKey = key;
                            this.#authenticated = true;
                            this.#authModal.removeAttribute('open');
                            this.#main.hidden = false;
                            this.#loadList();
                        }

                        #adminHeaders(extra = {}) {
                            return {
                                ...extra,
                                'X-Admin-Key': this.#adminKey
                            };
                        }

                        #openModal() {
                            this.#modal.setAttribute('open', '');
                        }

                        #closeModal() {
                            this.#modal.removeAttribute('open');
                        }

                        #formatTime(value) {
                            if (!value) return '-';
                            const date = new Date(value);
                            if (Number.isNaN(date.getTime())) return String(value);
                            const pad = n => String(n).padStart(2, '0');
                            return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())} \${pad(date.getHours())}:\${pad(date.getMinutes())}:\${pad(date.getSeconds())}\`;
                        }

                        #totalPages() {
                            return Math.max(1, Math.ceil(this.#total / this.#pageSize) || 1);
                        }

                        #updatePagination() {
                            const totalPages = this.#totalPages();
                            this.#totalEl.textContent = \`共 \${this.#total} 条\`;
                            this.#pageEl.textContent = \`第 \${this.#page}/\${totalPages} 页\`;
                            this.#prevBtn.disabled = this.#page <= 1;
                            this.#nextBtn.disabled = this.#page >= totalPages;
                        }

                        async #loadList() {
                            if (!this.#authenticated) return;
                            this.#table.setAttribute('loading', '');
                            try {
                                const res = await fetch(\`/api/queryList?page=\${this.#page}&pageSize=\${this.#pageSize}\`, {
                                    headers: this.#adminHeaders()
                                });
                                if (!res.ok) throw new Error('加载失败');
                                const json = await res.json();
                                const data = json.data || { total: 0, items: [] };
                                this.#total = data.total || 0;
                                const totalPages = this.#totalPages();
                                if (this.#page > totalPages) {
                                    this.#page = totalPages;
                                    return this.#loadList();
                                }
                                this.#table.setAttribute(
                                    'data',
                                    JSON.stringify(
                                        (data.items || []).map(item => ({
                                            ...item,
                                            created_at: this.#formatTime(item.created_at)
                                        }))
                                    )
                                );
                                this.#updatePagination();
                            } catch (error) {
                                this.#table.setAttribute('data', '[]');
                                notification.error(error.message || '加载列表失败');
                            } finally {
                                this.#table.removeAttribute('loading');
                            }
                        }

                        async #create() {
                            const longUrl = (this.#model.long_url || '').trim();
                            if (!longUrl) {
                                notification.error('请输入长链地址');
                                return;
                            }

                            const serve = \`\${location.protocol}//\${location.host}\`;
                            try {
                                const res = await fetch('/api/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ long_url: longUrl, serve })
                                });
                                if (!res.ok) {
                                    let message = '生成短链失败';
                                    try {
                                        const err = await res.json();
                                        message = err.message || message;
                                    } catch (_) {}
                                    throw new Error(message);
                                }
                                notification.success('生成短链成功');
                                this.#model.long_url = '';
                                this.#form.setAttribute('model', JSON.stringify(this.#model));
                                this.#closeModal();
                                this.#page = 1;
                                await this.#loadList();
                            } catch (error) {
                                notification.error(error.message || '生成短链失败');
                            }
                        }

                        async #copy(text) {
                            if (!text) {
                                notification.error('复制内容不能为空');
                                return;
                            }
                            try {
                                if (navigator.clipboard && window.isSecureContext) {
                                    await navigator.clipboard.writeText(text);
                                } else {
                                    const textArea = document.createElement('textarea');
                                    textArea.value = text;
                                    textArea.style.position = 'fixed';
                                    textArea.style.left = '-999999px';
                                    document.body.appendChild(textArea);
                                    textArea.select();
                                    const ok = document.execCommand('copy');
                                    textArea.remove();
                                    if (!ok) throw new Error('复制失败');
                                }
                                notification.success('复制成功');
                            } catch (error) {
                                notification.error('复制失败: ' + (error.message || '未知错误'));
                            }
                        }

                        async #delete(code) {
                            if (!code) return;
                            if (!confirm('确认删除该短链？')) return;
                            try {
                                const res = await fetch(\`/api/delete?code=\${encodeURIComponent(code)}\`, {
                                    method: 'DELETE',
                                    headers: this.#adminHeaders()
                                });
                                if (!res.ok) throw new Error('删除失败');
                                notification.success('删除成功');
                                await this.#loadList();
                            } catch (error) {
                                notification.error(error.message || '删除失败');
                            }
                        }
                    }

                    document.addEventListener('DOMContentLoaded', () => {
                        initTheme();
                        new ShortUrlManager();
                    });
                </script>
            </body>
        </html>
    `;

    return new Response(html, {
        headers: new Headers({
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        })
    });
}