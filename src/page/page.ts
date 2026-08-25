import { getAdvancedConfig, getBackendConfig, getProtocolConfig, getRemoteConfig, getShortServeConfig, getTargetConfig } from './config';
import { getDefaultBackend } from './config/backendConfig';
import { getExcludeConfig } from './config/getExcludeConfig';

export { showShortUrlPage } from './views/shortUrl/index';

/**
 * 主页面：视觉复刻 sub-web-modify (SUB WEB / NEXT)。
 * 仅改动前端，后端功能完全不变：
 *  - 保留原有字段：订阅链接 / 生成类型 / 远程配置 / 后端地址 / 节点协议 / 排除节点 / 高级选项 / 短链地址
 *  - 保留原有生成与短链接口逻辑（/sub 与 POST /api/add）
 *  - 新增项目2拥有的功能：后端版本检测、高级功能折叠面板、更多选项弹层、
 *    包含节点/节点命名/远程设备/更新间隔/订阅命名、从URL解析、订阅短链可编辑、主题自动/手动切换、右下角快捷入口
 */
export function showPage(request: Request, env: Env): Response {
    const remoteConfig = getRemoteConfig(env);
    const backendConfig = getBackendConfig(request, env);
    const shortServeConfig = getShortServeConfig(request, env);
    const targetConfig = getTargetConfig();
    const advancedConfig = getAdvancedConfig();
    const protocolConfig = getProtocolConfig();
    const excludeConfig = getExcludeConfig();
    const defaultBackend = getDefaultBackend(request, env);

    const hasDBConfig = env.SHORT_URL_ENABLED === true;
    const githubUrl = 'https://github.com/yjhup/sub-convert';

    const html = `
    <!DOCTYPE html>
        <html lang="zh-CN">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="color-scheme" content="light dark" />
                <title>在线订阅转换工具</title>
                <style>
                    :root {
                        color-scheme: light dark;
                    }
                    /*
                     * 主题变量：沿用 sub-web-modify 的设计令牌。
                     * 通过 body.light-mode / body.dark-mode 切换。
                     */
                    body.light-mode .subconverter-page {
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

                    body.dark-mode .subconverter-page {
                        --page-surface: transparent;
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

                    * { box-sizing: border-box; }

                    /* 移除点击/聚焦时的浏览器默认蓝色焦点框 */
                    button:focus, a:focus, input:focus, textarea:focus, select:focus, [tabindex]:focus { outline: none; }
                    .ctl__box:focus, .sub-ghost-btn:focus, .subconverter-main-btn:focus, .sub-checkbox:focus,
                    .subconverter-topbar__link:focus, .subconverter-social-btn:focus, .sub-dialog__close:focus,
                    .subconverter-advanced__trigger:focus { outline: none; box-shadow: none; }

                    html, body { margin: 0; padding: 0; }
                    body.light-mode, body.dark-mode {
                        background: var(--page-surface, #0b1120);
                    }

                    .subconverter-page {
                        position: relative;
                        min-height: 100vh;
                        padding: 28px 18px 104px;
                        color: var(--text);
                        font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
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
                        justify-content: flex-end;
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

                    .subconverter-hero { display: flex; flex-direction: column; gap: 18px; }
                    .subconverter-hero__eyebrow {
                        display: inline-flex;
                        font: 700 12px/1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: 0.24em;
                        text-transform: uppercase;
                        color: var(--accent);
                    }
                    .subconverter-hero__topline { display: flex; justify-content: space-between; gap: 16px; align-items: stretch; margin-top: 10px; }
                    .subconverter-hero__title {
                        margin: 0;
                        display: flex;
                        flex: 1 1 auto;
                        align-items: center;
                        min-height: 88px;
                        font: 700 clamp(2.8rem, 6vw, 5.4rem)/0.92 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: -0.04em;
                        color: var(--text) !important;
                    }
                    .subconverter-hero__desc { margin: 14px 0 0; color: var(--muted); line-height: 1.7; }
                    .subconverter-hero__stats { flex: 0 0 clamp(320px, 34vw, 420px); width: clamp(320px, 34vw, 420px); min-width: clamp(320px, 34vw, 420px); max-width: clamp(320px, 34vw, 420px); }
                    .subconverter-stat {
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 100%;
                        height: 88px;
                        padding: 16px 18px;
                        overflow: hidden;
                        border: 1px solid var(--line);
                        border-radius: 20px;
                        background: linear-gradient(135deg, var(--accent-fog), transparent 60%), var(--panel);
                    }
                    .subconverter-stat span { display: block; font-size: 12px; color: var(--muted); }
                    .subconverter-stat strong { display: block; width: 100%; margin-top: 8px; font: 700 15px/1.4 "Space Grotesk", "Noto Sans SC", sans-serif; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .subconverter-stat--backend strong { font-size: 18px; letter-spacing: 0.01em; }
                    .subconverter-stat strong.is-off { font-size: 14px; color: var(--muted); font-weight: 500; }

                    /* 表单 */
                    .subconverter-field { margin-bottom: 18px; }
                    .subconverter-field__label {
                        display: block;
                        text-align: left;
                        color: var(--text);
                        font-weight: 700;
                        padding-bottom: 8px;
                        font-size: 14px;
                    }
                    .subconverter-field__label .req { color: #e5484d; margin-right: 2px; }

                    .subconverter-textarea, .subconverter-input {
                        width: 100%;
                        border: 1px solid transparent;
                        border-radius: 16px;
                        background: var(--soft);
                        color: var(--text);
                        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
                        outline: none;
                    }
                    .subconverter-textarea { padding: 14px 16px; resize: vertical; min-height: 90px; line-height: 1.6; }
                    .subconverter-input { height: 46px; padding: 0 16px; }
                    .subconverter-textarea::placeholder, .subconverter-input::placeholder { color: var(--muted); }
                    .subconverter-textarea:focus, .subconverter-input:focus {
                        border-color: var(--accent-outline);
                        box-shadow: 0 0 0 4px var(--accent-ring);
                    }

                    /* 下拉控件 */
                    .ctl {
                        position: relative;
                        width: 100%;
                    }
                    .ctl__box {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 46px;
                        padding: 0 38px 0 16px;
                        border: 1px solid transparent;
                        border-radius: 16px;
                        background: var(--soft);
                        color: var(--text);
                        cursor: pointer;
                        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .ctl__box.is-open, .ctl__box:hover { border-color: var(--accent-outline); box-shadow: 0 0 0 4px var(--accent-ring); }
                    .ctl__box.is-disabled { cursor: not-allowed; opacity: 0.6; }
                    .ctl__box input {
                        flex: 1;
                        min-width: 0;
                        border: 0;
                        background: transparent;
                        color: var(--text);
                        font: inherit;
                        outline: none;
                    }
                    .ctl__box input::placeholder { color: var(--muted); }
                    .ctl__box input[readonly] { cursor: pointer; }
                    .ctl__value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .ctl__arrow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%) rotate(0deg); transition: transform 0.25s ease; color: var(--muted); display: flex; }
                    .ctl.is-open .ctl__arrow { transform: translateY(-50%) rotate(180deg); }
                    .ctl__dropdown {
                        position: absolute;
                        top: calc(100% + 8px);
                        left: 0;
                        right: 0;
                        max-height: 274px;
                        padding: 6px;
                        overflow-y: auto;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 16px;
                        box-shadow: var(--shadow);
                        z-index: 50;
                        display: none;
                    }
                    .ctl.is-open .ctl__dropdown { display: block; }
                    .ctl__opt {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 9px 12px;
                        border-radius: 10px;
                        color: var(--text);
                        font-size: 14px;
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .ctl__opt:hover { background: var(--accent-fog); }
                    .ctl__opt.is-selected { color: var(--accent); font-weight: 600; }
                    .ctl__opt.is-create { color: var(--accent); }
                    .ctl__opt .ck {
                        width: 16px; height: 16px; flex: none;
                        border: 1.5px solid var(--accent-outline);
                        border-radius: 5px; position: relative;
                    }
                    .ctl__opt.is-selected .ck { background: var(--accent); border-color: var(--accent); }
                    .ctl__opt.is-selected .ck::after {
                        content: ''; position: absolute; top: 2px; left: 5px;
                        width: 4px; height: 8px;
                        border: solid #fff; border-width: 0 2px 2px 0;
                        transform: rotate(45deg);
                    }
                    .ctl__empty { padding: 24px 0; text-align: center; color: var(--muted); font-size: 13px; }

                    /* 高级功能折叠区 */
                    .subconverter-advanced__wrap {
                        margin-top: 10px;
                        padding: 14px 16px 0;
                        border: 1px solid var(--line);
                        border-radius: 24px;
                        background: linear-gradient(180deg, var(--accent-fog), transparent 86%);
                    }
                    .subconverter-advanced__trigger {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        padding: 4px 2px 14px;
                        border: 0;
                        background: transparent;
                        cursor: pointer;
                        color: var(--text);
                        font: 700 14px/1 "Noto Sans SC", sans-serif;
                    }
                    .subconverter-advanced__trigger .arrow { transition: transform 0.25s ease; color: var(--muted); display: flex; }
                    .subconverter-advanced__trigger.is-open .arrow { transform: rotate(180deg); }
                    .subconverter-advanced__body { display: none; padding-bottom: 14px; }
                    .subconverter-advanced__wrap.is-open .subconverter-advanced__body { display: block; }
                    .subconverter-advanced__body .subconverter-field:first-child { margin-top: 4px; }

                    /* 复选框行 */
                    .subconverter-extras {
                        display: flex;
                        align-items: center;
                        gap: 18px;
                        flex-wrap: wrap;
                        margin-top: 6px;
                    }
                    .sub-checkbox {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        cursor: pointer;
                        user-select: none;
                        color: var(--text);
                        font-size: 14px;
                    }
                    .sub-checkbox input { display: none; }
                    .sub-checkbox .box {
                        width: 18px; height: 18px;
                        border: 1.5px solid var(--accent-outline);
                        border-radius: 6px;
                        display: inline-flex; align-items: center; justify-content: center;
                        transition: background 0.15s ease, border-color 0.15s ease;
                        flex: none;
                    }
                    .sub-checkbox input:checked + .box { background: var(--accent); border-color: var(--accent); }
                    .sub-checkbox input:checked + .box::after {
                        content: ''; width: 5px; height: 9px;
                        border: solid #fff; border-width: 0 2px 2px 0;
                        transform: rotate(45deg) translate(-1px, -1px);
                    }
                    .sub-checkbox--border .box { border-width: 2px; }
                    .sub-ghost-btn {
                        height: 40px;
                        padding: 0 16px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--panel);
                        color: var(--text);
                        font-size: 13px;
                        cursor: pointer;
                        transition: border-color 0.18s ease, color 0.18s ease;
                    }
                    .sub-ghost-btn:hover { border-color: var(--accent-outline); color: var(--accent); }

                    /* 更多选项弹层 */
                    .sub-popover { position: relative; display: inline-block; }
                    .sub-popover__panel {
                        position: absolute;
                        z-index: 60;
                        left: 0;
                        bottom: calc(100% + 10px);
                        width: 420px;
                        max-width: 82vw;
                        padding: 16px;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 20px;
                        box-shadow: var(--shadow);
                        display: none;
                    }
                    .sub-popover.is-open .sub-popover__panel { display: block; }
                    .sub-popover__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                    .sub-popover__backdrop {
                        position: fixed; inset: 0; z-index: 55; background: transparent;
                    }

                    /* 输出框 */
                    .subconverter-output {
                        margin-bottom: 18px;
                        padding: 16px;
                        border: 1px solid var(--line);
                        border-radius: 22px;
                        background: var(--panel);
                    }
                    .subconverter-output .subconverter-field__label { padding-bottom: 8px; }
                    .output-group { display: flex; gap: 10px; align-items: stretch; }
                    .output-group .subconverter-input { flex: 1; min-width: 0; }
                    .output-group .output-copy {
                        flex: none;
                        height: 46px;
                        padding: 0 20px;
                        border: 0;
                        border-radius: 12px;
                        background: #0f172a;
                        color: #fff;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        transition: opacity 0.18s ease, transform 0.12s ease;
                    }
                    body.dark-mode .output-group .output-copy { background: #e2e8f0; color: #020617; }
                    .output-group .output-copy:hover { opacity: 0.88; }
                    .output-group .output-copy:active { transform: scale(0.97); }
                    .output-group .output-copy svg { width: 16px; height: 16px; }

                    /* 操作按钮 */
                    .subconverter-action-row { margin-top: 34px; text-align: center; }
                    .action-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
                    .subconverter-main-btn {
                        width: 160px;
                        height: 48px;
                        border: 0;
                        border-radius: 16px;
                        cursor: pointer;
                        font: 700 15px/1 "Noto Sans SC", sans-serif;
                        color: #fff;
                        background: linear-gradient(135deg, var(--accent-strong) 0, var(--accent) 100%);
                        transition: opacity 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
                    }
                    .subconverter-main-btn--alt { background: linear-gradient(135deg, rgba(15,23,42,0.92) 0, rgba(51,65,85,0.92) 100%); }
                    .subconverter-main-btn--parse { background: linear-gradient(135deg, #0369a1 0, #0ea5e9 100%); }
                    .subconverter-main-btn:hover:not(:disabled) { box-shadow: 0 8px 24px var(--shadow); transform: translateY(-1px); }
                    .subconverter-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
                    .subconverter-main-btn.is-loading { opacity: 0.7; pointer-events: none; }

                    /* 右下角快捷入口 */
                    .subconverter-social-dock {
                        position: fixed;
                        right: 20px;
                        bottom: 20px;
                        z-index: 40;
                        display: flex;
                        gap: 10px;
                        padding: 9px;
                        border: 1px solid var(--line);
                        border-radius: 999px;
                        background: var(--bg);
                        box-shadow: 0 18px 42px rgba(15,23,42,0.12);
                        backdrop-filter: blur(18px) saturate(180%);
                    }
                    .subconverter-social-btn {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                        padding: 0;
                        border: 1px solid var(--line);
                        border-radius: 16px;
                        background: linear-gradient(135deg, var(--accent-fog), transparent 65%), var(--panel);
                        color: var(--text);
                        cursor: pointer;
                        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .subconverter-social-btn:hover { transform: translateY(-2px); border-color: var(--accent-outline); box-shadow: 0 12px 28px rgba(15,23,42,0.16); }
                    .subconverter-social-btn__icon { width: 20px; height: 20px; display: block; }
                    .subconverter-theme-toggle-icon { font-size: 20px; font-family: ui-monospace, monospace; font-weight: 700; line-height: 1; }

                    /* 弹窗 */
                    .sub-dialog { position: fixed; inset: 0; z-index: 100; display: none; }
                    .sub-dialog.is-open { display: flex; align-items: flex-start; justify-content: center; padding-top: 20vh; }
                    .sub-dialog__backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(2px); }
                    .sub-dialog__panel {
                        position: relative;
                        z-index: 1;
                        width: min(560px, 92vw);
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 24px;
                        box-shadow: var(--shadow);
                        overflow: hidden;
                        color: var(--text);
                    }
                    .sub-dialog__header {
                        display: flex; align-items: center; justify-content: space-between;
                        padding: 18px 22px;
                        border-bottom: 1px solid var(--line);
                        font: 700 17px/1.2 "Space Grotesk", "Noto Sans SC", sans-serif;
                    }
                    .sub-dialog__close { border: 0; background: transparent; color: var(--muted); font-size: 22px; cursor: pointer; line-height: 1; padding: 4px; }
                    .sub-dialog__close:hover { color: var(--text); }
                    .sub-dialog__body { padding: 20px 22px; }
                    .sub-dialog__footer { display: flex; justify-content: flex-end; gap: 10px; padding: 0 22px 20px; }
                    .sub-dialog__footer .sub-ghost-btn { height: 40px; }

                    /* 提示条 */
                    .sub-toast {
                        position: fixed;
                        top: 24px;
                        left: 50%;
                        transform: translateX(-50%) translateY(-12px);
                        z-index: 200;
                        padding: 11px 20px;
                        border-radius: 14px;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        box-shadow: var(--shadow);
                        color: var(--text);
                        font-size: 14px;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.25s ease, transform 0.25s ease;
                    }
                    .sub-toast.is-show { opacity: 1; transform: translateX(-50%) translateY(0); }
                    .sub-toast.is-error { border-color: rgba(232, 93, 78, 0.5); }
                    .sub-toast.is-error .dot, .sub-toast .dot { display:none }

                    @media (max-width: 760px) {
                        .subconverter-page { padding: 16px 10px 92px; }
                        .subconverter-card__header, .subconverter-card__body { padding-left: 18px; padding-right: 18px; }
                        .subconverter-layout { padding: 0; }
                        .subconverter-hero__topline { flex-direction: column; align-items: flex-start; }
                        .subconverter-hero__title { min-height: 0; }
                        .subconverter-hero__stats { flex-basis: min(100%, 420px); width: min(100%, 420px); min-width: 0; max-width: 100%; }
                        .action-btns { flex-direction: column; align-items: stretch; }
                        .subconverter-main-btn { width: 100%; }
                        .subconverter-social-dock { right: 12px; bottom: 12px; padding: 8px; gap: 8px; }
                        .subconverter-social-btn { width: 44px; height: 44px; }
                        .output-group { flex-direction: column; }
                        .output-group .output-copy { width: 100%; justify-content: center; }
                    }
                </style>
            </head>
            <body class="dark-mode">
                <div class="subconverter-page">
                    <div class="subconverter-glow subconverter-glow--one"></div>
                    <div class="subconverter-glow subconverter-glow--two"></div>

                    <div class="subconverter-topbar">
                        <a class="subconverter-topbar__link" href="/shortUrl">短链管理</a>
                    </div>

                    <div class="subconverter-layout">
                        <div class="subconverter-card">
                            <div class="subconverter-card__header">
                                <div class="subconverter-hero">
                                    <div class="subconverter-hero__copy">
                                        <span class="subconverter-hero__eyebrow">SUB WEB / NEXT</span>
                                        <div class="subconverter-hero__topline">
                                            <h1 class="subconverter-hero__title">订阅转换</h1>
                                            <div class="subconverter-hero__stats">
                                                <div class="subconverter-stat subconverter-stat--backend">
                                                    <span>后端版本</span>
                                                    <strong id="backend-version">等待检测</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="subconverter-hero__desc">
                                            在线订阅转换场景，适配 Clash、Sing-Box、V2Ray 等常见使用环境。
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="subconverter-card__body">
                                <form id="sub-convert-form" autocomplete="off">
                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label"><span class="req">*</span>订阅链接:</label>
                                        <textarea id="f-url" class="subconverter-textarea" rows="3" placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"></textarea>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label"><span class="req">*</span>生成类型:</label>
                                        <div class="ctl" id="f-target" data-single data-filterable="false" data-placeholder="请选择"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">后端地址:</label>
                                        <div class="ctl" id="f-backend" data-single data-filterable="true" data-placeholder="选择或输入后端地址"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">短链地址:</label>
                                        <div class="ctl" id="f-short" data-single data-filterable="false" data-placeholder="${hasDBConfig ? '请选择' : '未配置数据库'}"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">远程配置:</label>
                                        <div class="ctl" id="f-config" data-single data-filterable="true" data-placeholder="选择或输入配置链接"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">节点协议:</label>
                                        <div class="ctl" id="f-protocol" data-multi data-placeholder="请选择需要保留的协议"></div>
                                    </div>

                                    <div class="subconverter-field subconverter-advanced__wrap" id="adv-wrap">
                                        <button type="button" class="subconverter-advanced__trigger" id="adv-trigger">
                                            <span>高级功能:</span>
                                            <span class="arrow">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                                            </span>
                                        </button>
                                        <div class="subconverter-advanced__body">
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">包含节点:</label>
                                                <input id="f-include" class="subconverter-input" placeholder="要保留的节点，支持正则" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">排除节点:</label>
                                                <div class="ctl" id="f-exclude" data-multi data-placeholder="请选择要排除的节点规则"></div>
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">节点命名:</label>
                                                <input id="f-rename" class="subconverter-input" placeholder="举例：'a@b''1@2'，|符可用\\转义" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">远程设备:</label>
                                                <input id="f-devid" class="subconverter-input" placeholder="用于设置QuantumultX的远程设备ID" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">更新间隔:</label>
                                                <input id="f-interval" class="subconverter-input" type="number" min="0" placeholder="用于设置托管配置更新间隔，单位为天" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">订阅命名:</label>
                                                <input id="f-filename" class="subconverter-input" placeholder="返回的订阅文件名，可以在支持文件名的客户端中显示出来" />
                                            </div>
                                            <div class="subconverter-field">
                                                <div class="subconverter-extras">
                                                    <label class="sub-checkbox sub-checkbox--border">
                                                        <input type="checkbox" data-toggle="list" />
                                                        <span class="box"></span>
                                                        <span>仅输出节点信息</span>
                                                    </label>
                                                    <span class="sub-popover" id="more-popover">
                                                        <button type="button" class="sub-ghost-btn" id="more-btn">更多选项</button>
                                                        <div class="sub-popover__panel" id="more-panel">
                                                            <div class="sub-popover__grid" id="more-grid"></div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-output">
                                        <label class="subconverter-field__label">定制订阅:</label>
                                        <div class="output-group">
                                            <input id="form-subscribe" class="subconverter-input" readonly placeholder="生成后展示可复制的订阅链接" />
                                            <button type="button" class="output-copy" data-copy="form-subscribe">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                                                复制
                                            </button>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-output">
                                        <label class="subconverter-field__label">订阅短链:</label>
                                        <div class="output-group">
                                            <input id="form-short-url" class="subconverter-input" placeholder="输入自定义短链接后缀，点击生成短链可反复生成" />
                                            <button type="button" class="output-copy" data-copy="form-short-url">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                                                复制
                                            </button>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-action-row">
                                        <div class="action-btns">
                                            <button type="button" id="generate-sub-btn" class="subconverter-main-btn" disabled>生成订阅链接</button>
                                            <button type="button" id="generate-short-url-btn" class="subconverter-main-btn subconverter-main-btn--alt" disabled>生成短链接</button>
                                            <button type="button" id="parse-btn" class="subconverter-main-btn subconverter-main-btn--parse">从URL解析</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="subconverter-social-dock" aria-label="页面快捷入口">
                        <button class="subconverter-social-btn" type="button" id="social-github" aria-label="GitHub" title="GitHub">
                            <svg viewBox="0 0 24 24" fill="none" class="subconverter-social-btn__icon" aria-hidden="true">
                                <path d="M9.2 19.1v-3.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.9 1.4.9.4 1.8.3 2.5.1.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.1-3.1-.1-.3-.5-1.5.1-3 0 0 .9-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3.1 0 4.4-2.7 5.3-5.3 5.7.4.4.8 1 .8 2.1v3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.9 18.8c-3.5 1.1-6-1.4-6-1.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="subconverter-social-btn subconverter-social-btn--theme" type="button" id="theme-toggle" aria-label="切换主题" title="切换主题">
                            <span class="subconverter-theme-toggle-icon" id="theme-icon">☾</span>
                        </button>
                    </div>

                    <!-- 从URL解析 -->
                    <div class="sub-dialog" id="parse-dialog">
                        <div class="sub-dialog__backdrop" data-close="parse-dialog"></div>
                        <div class="sub-dialog__panel">
                            <div class="sub-dialog__header">
                                <span>从 URL 解析订阅信息</span>
                                <button type="button" class="sub-dialog__close" data-close="parse-dialog">&times;</button>
                            </div>
                            <div class="sub-dialog__body">
                                <p style="margin:0 0 12px;color:var(--muted);font-size:13px;">可以从生成的长/短链接中解析信息，自动填入页面。</p>
                                <textarea id="parse-input" class="subconverter-textarea" rows="6" placeholder="将订阅长链接或短链接粘贴到此处"></textarea>
                            </div>
                            <div class="sub-dialog__footer">
                                <button type="button" class="sub-ghost-btn" data-close="parse-dialog">取 消</button>
                                <button type="button" class="sub-ghost-btn" id="parse-confirm">确 定</button>
                            </div>
                        </div>
                    </div>

                    <div class="sub-toast" id="toast"></div>
                </div>

                <script>
                    (function () {
                        'use strict';

                        var CONFIG = {
                            target: ${JSON.stringify(targetConfig)},
                            backend: ${JSON.stringify(backendConfig)},
                            short: ${JSON.stringify(shortServeConfig)},
                            config: ${JSON.stringify(remoteConfig)},
                            protocol: ${JSON.stringify(protocolConfig)},
                            exclude: ${JSON.stringify(excludeConfig)}
                        };
                        var DEFAULT_BACKEND = ${JSON.stringify(defaultBackend)};
                        var HAS_DB = ${hasDBConfig};
                        var GITHUB_URL = ${JSON.stringify(githubUrl)};
                        var ADVANCED = ${JSON.stringify(advancedConfig.map(function (o) { return { label: o.label, value: o.value }; }))};

                        // 自定义逻辑映射：更多选项（覆盖 project1 高级选项 + project2 扩展项）
                        var TOGGLES = {
                            emoji: { label: 'Emoji', def: true },
                            new_name: { label: 'Clash新字段', def: true },
                            udp: { label: '启用 UDP', def: true },
                            sort: { label: '基础节点排序', def: false },
                            tfo: { label: '启用 TFO', def: false },
                            scv: { label: '跳过证书验证', def: false },
                            append_type: { label: '插入节点类型', def: false },
                            tls13: { label: '开启TLS_1.3', def: false },
                            xudp: { label: '启用 XUDP', def: false },
                            fdn: { label: '过滤不支持节点', def: false },
                            expand: { label: '展开规则全文', def: true },
                            clash_doh: { label: 'Clash.DoH', def: false },
                            surge_doh: { label: 'Surge.DoH', def: false },
                            singbox_ipv6: { label: 'Sing-Box支持IPV6', def: false }
                        };
                        // project1 始终写入 true/false 的高级参数（保持原生成逻辑不变）
                        var P1_ALWAYS = ['emoji', 'new_name', 'udp', 'sort', 'tfo', 'scv', 'append_type', 'list'];
                        // 仅当开启时才附加的参数 -> 请求参数名
                        var EXTRA_MAP = {
                            tls13: 'tls13',
                            xudp: 'xudp',
                            fdn: 'fdn',
                            expand: 'expand',
                            clash_doh: 'clash.doh',
                            surge_doh: 'surge.doh',
                            singbox_ipv6: 'singbox.ipv6'
                        };

                        var model = {
                            url: '',
                            target: '',
                            backend: DEFAULT_BACKEND,
                            shortServe: CONFIG.short.length ? CONFIG.short[0].value : '',
                            config: CONFIG.config.length ? CONFIG.config[0].value : '',
                            protocol: CONFIG.protocol.map(function (o) { return o.value; }),
                            exclude: [],
                            include: '',
                            rename: '',
                            devid: '',
                            interval: '',
                            filename: '',
                            list: false,
                            toggles: {},
                            subUrl: '',
                            shortUrl: ''
                        };
                        Object.keys(TOGGLES).forEach(function (k) { model.toggles[k] = TOGGLES[k].def; });

                        var el = {
                            url: document.getElementById('f-url'),
                            include: document.getElementById('f-include'),
                            rename: document.getElementById('f-rename'),
                            devid: document.getElementById('f-devid'),
                            interval: document.getElementById('f-interval'),
                            filename: document.getElementById('f-filename'),
                            formSubscribe: document.getElementById('form-subscribe'),
                            formShortUrl: document.getElementById('form-short-url'),
                            generateSub: document.getElementById('generate-sub-btn'),
                            generateShort: document.getElementById('generate-short-url-btn'),
                            parseBtn: document.getElementById('parse-btn'),
                            versionEl: document.getElementById('backend-version')
                        };

                        // ------- 提示 -------
                        var toastTimer = null;
                        function toast(msg, isError) {
                            var t = document.getElementById('toast');
                            t.textContent = msg;
                            t.classList.toggle('is-error', !!isError);
                            t.classList.add('is-show');
                            clearTimeout(toastTimer);
                            toastTimer = setTimeout(function () { t.classList.remove('is-show'); }, 2600);
                        }

                        // ------- 通用下拉控件（单选 + 可过滤 + 多选） -------
                        function closeAllCtl(except) {
                            document.querySelectorAll('.ctl.is-open').forEach(function (c) {
                                if (c !== except) {
                                    c.classList.remove('is-open');
                                    var inp = c.querySelector('input');
                                    if (inp && inp.dataset && inp.dataset.restore !== undefined) {
                                        try { inp.value = inp.dataset.restore; } catch (e) {}
                                    }
                                }
                            });
                        }
                        document.addEventListener('click', function (e) {
                            if (!e.target.closest || !e.target.closest('.ctl')) closeAllCtl(null);
                        });

                        var ctlState = {};
                        function initSingle(id, key, onPickImpl) {
                            var root = document.getElementById(id);
                            var valueKey = key;
                            var options = CONFIG[key];
                            var filterable = root.getAttribute('data-filterable') === 'true';
                            var placeholder = root.getAttribute('data-placeholder') || '请选择';
                            defaultVal(id, options);

                            var box = document.createElement('div');
                            box.className = 'ctl__box';
                            var input = document.createElement('input');
                            input.dataset.restore = '';
                            box.appendChild(input);
                            var arrow = document.createElement('span');
                            arrow.className = 'ctl__arrow';
                            arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
                            box.appendChild(arrow);
                            var drop = document.createElement('div');
                            drop.className = 'ctl__dropdown';
                            root.appendChild(box);
                            root.appendChild(drop);

                            var state = { options: options, filterable: filterable, placeholder: placeholder, picked: null };
                            ctlState[id] = state;

                            function setValue(val) {
                                state.picked = val;
                                var label = '';
                                var found = options.filter(function (o) { return o.value === val; })[0];
                                label = found ? found.label : val;
                                input.value = label;
                                input.dataset.restore = label;
                                input.classList.add('has-value');
                                model[key] = val;
                                if (onPickImpl) onPickImpl(val, label);
                                afterChange(key);
                            }

                            function open() {
                                closeAllCtl(root);
                                root.classList.toggle('is-open');
                                if (filterable) {
                                    input.dataset.restore = input.value || '';
                                    input.value = '';
                                    input.focus();
                                }
                                renderSelect();
                            }

                            function renderSelect() {
                                drop.innerHTML = '';
                                var q = filterable ? input.value : '';
                                options.forEach(function (opt) {
                                    if (q && opt.label.toLowerCase().indexOf(q.toLowerCase()) < 0 && opt.value.toLowerCase().indexOf(q.toLowerCase()) < 0) return;
                                    var d = document.createElement('div');
                                    d.className = 'ctl__opt' + (state.picked === opt.value ? ' is-selected' : '');
                                    d.textContent = opt.label;
                                    d.addEventListener('click', function (e) { e.stopPropagation(); onPick(opt.value, opt.label); });
                                    drop.appendChild(d);
                                });
                                if (filterable && q) {
                                    var cd = document.createElement('div');
                                    cd.className = 'ctl__opt is-create';
                                    cd.textContent = '直接使用：' + q;
                                    cd.addEventListener('click', function (e) { e.stopPropagation(); onPick(q, q); });
                                    drop.appendChild(cd);
                                }
                                if (drop.children.length === 0) {
                                    var empty = document.createElement('div');
                                    empty.className = 'ctl__empty';
                                    empty.textContent = filterable ? '无匹配项，可输入自定义值' : '暂无数据';
                                    drop.appendChild(empty);
                                }
                            }

                            function onPick(val, label) {
                                setValue(val);
                                root.classList.remove('is-open');
                                input.blur();
                            }

                            box.addEventListener('click', function (e) {
                                e.stopPropagation();
                                open();
                            });
                            if (filterable) {
                                input.addEventListener('input', function () {
                                    if (root.classList.contains('is-open')) renderSelect();
                                });
                            } else {
                                input.readOnly = true;
                            }
                            if (options.length === 0) {
                                box.classList.add('is-disabled');
                                input.placeholder = placeholder;
                                input.readOnly = true;
                            }
                            setValue(state.picked !== null ? state.picked : (options[0] ? options[0].value : (key === 'backend' ? DEFAULT_BACKEND : '')));
                        }

                        function defaultVal(id, options) {
                            if (!options.length) return;
                            if (ctlState[id] && ctlState[id].picked !== null) return;
                        }

                        function initMulti(id, key, isProtocol) {
                            var root = document.getElementById(id);
                            var options = CONFIG[key];
                            var placeholder = root.getAttribute('data-placeholder') || '请选择';
                            var box = document.createElement('div');
                            box.className = 'ctl__box';
                            box.style.height = 'auto';
                            box.style.minHeight = '46px';
                            box.style.flexWrap = 'wrap';
                            box.style.paddingTop = '6px';
                            box.style.paddingBottom = '6px';
                            box.style.gap = '6px';
                            var show = document.createElement('div');
                            show.className = 'ctl__value';
                            show.style.flex = '1';
                            var arrow = document.createElement('span');
                            arrow.className = 'ctl__arrow';
                            arrow.style.top = '50%';
                            arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
                            box.appendChild(show);
                            box.appendChild(arrow);
                            var drop = document.createElement('div');
                            drop.className = 'ctl__dropdown';
                            root.appendChild(box);
                            root.appendChild(drop);

                            var selected = isProtocol ? model.protocol.slice() : model.exclude.slice();

                            function renderValue() {
                                show.innerHTML = '';
                                if (selected.length === 0) {
                                    var p = document.createElement('span');
                                    p.textContent = placeholder;
                                    p.style.color = 'var(--muted)';
                                    show.appendChild(p);
                                    return;
                                }
                                selected.forEach(function (v) {
                                    var opt = options.filter(function (o) { return o.value === v; })[0];
                                    var tag = document.createElement('span');
                                    tag.style.cssText = 'display:inline-flex;align-items:center;gap:4px;background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:2px 8px;font-size:12px;line-height:22px;';
                                    tag.textContent = opt ? opt.label : v;
                                    show.appendChild(tag);
                                });
                            }

                            function commit() {
                                if (isProtocol) model.protocol = selected.slice();
                                else model.exclude = selected.slice();
                                afterChange(key);
                            }

                            function open() {
                                closeAllCtl(root);
                                root.classList.toggle('is-open');
                                renderOptionsList();
                            }

                            function renderOptionsList() {
                                drop.innerHTML = '';
                                options.forEach(function (opt) {
                                    var d = document.createElement('div');
                                    var on = selected.indexOf(opt.value) >= 0;
                                    d.className = 'ctl__opt' + (on ? ' is-selected' : '');
                                    var ck = document.createElement('span');
                                    ck.className = 'ck';
                                    d.insertBefore(ck, d.firstChild);
                                    d.appendChild(document.createTextNode(opt.label));
                                    d.addEventListener('click', function (e) {
                                        e.stopPropagation();
                                        var i = selected.indexOf(opt.value);
                                        if (i >= 0) selected.splice(i, 1); else selected.push(opt.value);
                                        renderValue();
                                        renderOptionsList();
                                        commit();
                                    });
                                    drop.appendChild(d);
                                });
                                if (options.length === 0) {
                                    var empty = document.createElement('div');
                                    empty.className = 'ctl__empty';
                                    empty.textContent = '暂无数据';
                                    drop.appendChild(empty);
                                }
                            }

                            box.addEventListener('click', function (e) { e.stopPropagation(); open(); });
                            renderValue();
                            if (options.length === 0) box.classList.add('is-disabled');
                            ctlState[id] = { options: options };
                        }

                        // ------- 变更后的响应处理 -------
                        function afterChange() {
                            if (model.url && model.target) {
                                el.generateSub.removeAttribute('disabled');
                            } else {
                                el.generateSub.setAttribute('disabled', '');
                            }
                            if (model.subUrl) {
                                el.generateShort.removeAttribute('disabled');
                            } else {
                                el.generateShort.setAttribute('disabled', '');
                            }
                        }

                        function buildSubUrl() {
                            var base = model.backend || DEFAULT_BACKEND;
                            var u = new URL(base.replace(/\\/+$/, '') + '/sub');
                            u.searchParams.set('target', model.target);
                            u.searchParams.set('url', model.url);
                            u.searchParams.set('insert', 'true');
                            u.searchParams.set('config', model.config || '');
                            u.searchParams.set('protocol', JSON.stringify(model.protocol));
                            u.searchParams.set('exclude', JSON.stringify(model.exclude));
                            P1_ALWAYS.forEach(function (k) {
                                var v = (k === 'list') ? model.list : model.toggles[k];
                                u.searchParams.set(k, v ? 'true' : 'false');
                            });
                            if (model.include) u.searchParams.set('include', model.include);
                            if (model.rename) u.searchParams.set('rename', model.rename);
                            if (model.devid) u.searchParams.set('dev_id', model.devid);
                            if (model.interval) u.searchParams.set('interval', String(Number(model.interval) * 86400));
                            if (model.filename) u.searchParams.set('filename', model.filename);
                            Object.keys(EXTRA_MAP).forEach(function (k) {
                                if (model.toggles[k]) u.searchParams.set(EXTRA_MAP[k], k === 'singbox_ipv6' ? '1' : 'true');
                            });
                            return u.toString();
                        }

                        // ------- 生成订阅链接 -------
                        el.generateSub.addEventListener('click', function () {
                            if (!model.url || !model.target) { toast('订阅链接与生成类型为必填项', true); return; }
                            model.subUrl = buildSubUrl();
                            el.formSubscribe.value = model.subUrl;
                            copyText(model.subUrl);
                            toast('定制订阅已复制到剪贴板');
                            afterChange();
                        });

                        // ------- 生成短链（保持 project1 原有的 /api/add 逻辑） -------
                        el.generateShort.addEventListener('click', async function () {
                            if (!model.shortServe) { toast('短链服务不存在', true); return; }
                            if (!model.subUrl) { toast('请先生成订阅链接', true); return; }
                            el.generateShort.classList.add('is-loading');
                            var requestData = { serve: model.shortServe, long_url: model.subUrl };
                            try {
                                var resp = await fetch(model.shortServe + '/api/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(requestData)
                                });
                                if (resp.ok) {
                                    var data = await resp.json();
                                    if (data && data.data && data.data.short_url) {
                                        el.formShortUrl.value = data.data.short_url;
                                        model.shortUrl = data.data.short_url;
                                        toast('生成短链接成功');
                                    } else {
                                        toast('生成短链接失败：返回数据异常', true);
                                    }
                                } else {
                                    toast('生成短链接失败', true);
                                }
                            } catch (err) {
                                toast('生成短链接失败：' + (err && err.message ? err.message : '网络错误'), true);
                            } finally {
                                el.generateShort.classList.remove('is-loading');
                            }
                        });

                        // ------- 复制 -------
                        function copyText(text) {
                            if (!text) { toast('复制内容不能为空', true); return; }
                            function fallback() {
                                var ta = document.createElement('textarea');
                                ta.value = text;
                                ta.style.position = 'fixed';
                                ta.style.left = '-999999px';
                                ta.style.top = '-999999px';
                                document.body.appendChild(ta);
                                ta.focus();
                                ta.select();
                                var ok = false;
                                try { ok = document.execCommand('copy'); } catch (e) {}
                                ta.remove();
                                return ok;
                            }
                            if (navigator.clipboard && window.isSecureContext) {
                                navigator.clipboard.writeText(text).then(function () {
                                    toast('复制成功');
                                }).catch(function () {
                                    if (fallback()) toast('复制成功'); else toast('复制失败', true);
                                });
                            } else {
                                toast(fallback() ? '复制成功' : '复制失败');
                            }
                        }
                        document.querySelectorAll('[data-copy]').forEach(function (btn) {
                            btn.addEventListener('click', function () {
                                copyText(document.getElementById(btn.getAttribute('data-copy')).value);
                            });
                        });

                        // ------- 输入绑定 -------
                        function bindInput(id, key) {
                            el[id].addEventListener('input', function () {
                                model[key] = el[id].value;
                                afterChange();
                            });
                            model[key] = el[id].value;
                        }
                        bindInput('url', 'url');
                        bindInput('include', 'include');
                        bindInput('rename', 'rename');
                        bindInput('devid', 'devid');
                        bindInput('interval', 'interval');
                        bindInput('filename', 'filename');
                        // 订阅短链输入框：既用于展示，也可手动输入后缀（可反复生成）
                        el.formShortUrl.addEventListener('input', function () {
                            model.shortUrl = el.formShortUrl.value;
                        });

                        // ------- 复选框：仅输出节点信息 -------
                        document.querySelectorAll('input[data-toggle]').forEach(function (cb) {
                            cb.addEventListener('change', function () {
                                model[cb.getAttribute('data-toggle')] = cb.checked;
                                afterChange();
                            });
                        });

                        // ------- 高级功能折叠 -------
                        var advWrap = document.getElementById('adv-wrap');
                        var advTrigger = document.getElementById('adv-trigger');
                        advTrigger.addEventListener('click', function () {
                            advWrap.classList.toggle('is-open');
                            advTrigger.classList.toggle('is-open');
                        });

                        // ------- 更多选项弹层 ----
                        (function () {
                            var pop = document.getElementById('more-popover');
                            var btn = document.getElementById('more-btn');
                            var grid = document.getElementById('more-grid');
                            var panel = document.getElementById('more-panel');
                            var list = Object.keys(TOGGLES);
                            list.forEach(function (k) {
                                var label = document.createElement('label');
                                label.className = 'sub-checkbox';
                                var cb = document.createElement('input');
                                cb.type = 'checkbox';
                                cb.checked = model.toggles[k];
                                var box = document.createElement('span');
                                box.className = 'box';
                                var txt = document.createElement('span');
                                txt.textContent = TOGGLES[k].label;
                                label.appendChild(cb);
                                label.appendChild(box);
                                label.appendChild(txt);
                                cb.addEventListener('change', function () {
                                    model.toggles[k] = cb.checked;
                                });
                                grid.appendChild(label);
                            });
                            btn.addEventListener('click', function (e) {
                                e.stopPropagation();
                                pop.classList.toggle('is-open');
                            });
                            document.addEventListener('click', function (e) {
                                if (!pop.contains(e.target)) pop.classList.remove('is-open');
                            });
                        })();

                        // ------- 后端版本检测（project1 /version 兼容） -------
                        function detectVersion(backend) {
                            var url = (backend || DEFAULT_BACKEND).replace(/\\/+$/, '') + '/version';
                            var strong = el.versionEl;
                            strong.textContent = '检测中…';
                            strong.classList.remove('is-off');
                            fetch(url, { redirect: 'follow' }).then(function (res) {
                                return res.text();
                            }).then(function (text) {
                                var v = (text || '').replace(/backend\\n$/gm, '').replace('subconverter', 'SubConverter').replace(/\\s+$/, '');
                                if (v) { strong.textContent = v; strong.classList.remove('is-off'); }
                                else { strong.textContent = '后端可用'; strong.classList.remove('is-off'); }
                            }).catch(function () {
                                strong.textContent = '后端不可用';
                                strong.classList.add('is-off');
                            });
                        }

                        // ------- 从URL解析 -------
                        var parseDialog = document.getElementById('parse-dialog');
                        el.parseBtn.addEventListener('click', function () {
                            parseDialog.classList.add('is-open');
                            var inp = document.getElementById('parse-input');
                            inp.value = '';
                            setTimeout(function () { inp.focus(); }, 50);
                        });
                        function closeDialog(id) { document.getElementById(id).classList.remove('is-open'); }
                        document.querySelectorAll('[data-close]').forEach(function (btn) {
                            btn.addEventListener('click', function () { closeDialog(btn.getAttribute('data-close')); });
                        });
                        document.getElementById('parse-confirm').addEventListener('click', function () {
                            var raw = document.getElementById('parse-input').value.trim();
                            if (!raw || raw.indexOf('http') < 0) { toast('待解析的订阅链接不合法', true); return; }
                            (async function () {
                                var target = raw;
                                if (target.indexOf('target') < 0) {
                                    try {
                                        el.parseBtn.classList.add('is-loading');
                                        var resp = await fetch(raw, { redirect: 'follow' });
                                        target = resp.url || raw;
                                    } catch (e) {
                                        toast('解析短链接失败：' + (e && e.message ? e.message : '网络错误'), true);
                                        return;
                                    } finally {
                                        el.parseBtn.classList.remove('is-loading');
                                    }
                                }
                                var u;
                                try { u = new URL(target); } catch (e) { toast('请输入正确的订阅地址', true); return; }
                                model.backend = u.origin;
                                setSelectValue('f-backend', u.origin);
                                var param = new URLSearchParams(u.search);
                                if (param.get('target')) model.target = param.get('target');
                                if (param.get('url')) { model.url = param.get('url'); el.url.value = param.get('url'); }
                                if (param.get('config')) { model.config = param.get('config'); setSelectValue('f-config', param.get('config')); }
                                if (param.get('exclude')) refreshExcludeFromJSON(param.get('exclude'));
                                if (param.get('protocol')) {
                                    try { model.protocol = JSON.parse(param.get('protocol')); setMultiValue('f-protocol', model.protocol); } catch (e) {}
                                }
                                if (param.get('include')) { model.include = param.get('include'); el.include.value = model.include; }
                                if (param.get('rename')) { model.rename = param.get('rename'); el.rename.value = model.rename; }
                                if (param.get('dev_id')) { model.devid = param.get('dev_id'); el.devid.value = model.devid; }
                                if (param.get('filename')) { model.filename = param.get('filename'); el.filename.value = model.filename; }
                                if (param.get('interval')) { model.interval = String(Math.ceil(Number(param.get('interval')) / 86400)); el.interval.value = model.interval; }
                                ['list','sort','tfo','scv','fdn','expand','tls13','xudp'].forEach(function (k) {
                                    if (param.get(k)) model.toggles[k] = param.get(k) === 'true';
                                });
                                if (param.get('emoji')) model.toggles.emoji = param.get('emoji') === 'true';
                                if (param.get('new_name')) model.toggles.new_name = param.get('new_name') === 'true';
                                if (param.get('udp')) model.toggles.udp = param.get('udp') === 'true';
                                if (param.get('append_type')) model.toggles.append_type = param.get('append_type') === 'true';
                                if (param.get('clash.doh')) model.toggles.clash_doh = param.get('clash.doh') === 'true';
                                if (param.get('surge.doh')) model.toggles.surge_doh = param.get('surge.doh') === 'true';
                                if (param.get('singbox.ipv6')) model.toggles.singbox_ipv6 = param.get('singbox.ipv6') === '1';
                                syncToggleCheckboxes();
                                closeDialog('parse-dialog');
                                toast('长/短链接已成功解析为订阅信息');
                                afterChange();
                            })();
                        });

                        function setSelectValue(id, val) {
                            var root = document.getElementById(id);
                            var cb = root.querySelector('.ctl__box input');
                            if (!cb) return;
                            var key = id.replace('f-', '');
                            model[key] = val;
                            cb.value = '';
                            cb.dataset.restore = val;
                            var found = (CONFIG[key] || []).filter(function (o) { return o.value === val; })[0];
                            cb.value = found ? found.label : val;
                            if (ctlState[id]) ctlState[id].picked = val;
                        }
                        function setMultiValue(id, arr) {
                            // 由刷新下拉实现（重写多选的状态）
                            var sv = arr;
                            var root = document.getElementById(id);
                            var show = root.querySelector('.ctl__value');
                            if (!show) return;
                            var key = id.replace('f-', '');
                            var ctl = ctlState[id];
                            var isProtocol = id === 'f-protocol';
                            if (isProtocol) model.protocol = sv.slice(); else model.exclude = sv.slice();
                            rerenderMulti(root, show, key, sv);
                        }
                        function rerenderMulti(root, show, key, selected) {
                            var options = CONFIG[key] || [];
                            show.innerHTML = '';
                            if (selected.length === 0) {
                                var p = document.createElement('span');
                                p.style.color = 'var(--muted)';
                                p.textContent = root.getAttribute('data-placeholder') || '请选择';
                                show.appendChild(p);
                                return;
                            }
                            selected.forEach(function (v) {
                                var opt = options.filter(function (o) { return o.value === v; })[0];
                                var tag = document.createElement('span');
                                tag.style.cssText = 'display:inline-flex;align-items:center;gap:4px;background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:2px 8px;font-size:12px;line-height:22px;';
                                tag.textContent = opt ? opt.label : v;
                                show.appendChild(tag);
                            });
                        }
                        function refreshExcludeFromJSON(str) {
                            var arr = [];
                            try { arr = JSON.parse(str); if (!Array.isArray(arr)) arr = String(arr).split(/\\|\\n/); } catch (e) { arr = String(str).split(/\\|\\n/); }
                            arr = arr.filter(Boolean);
                            model.exclude = arr.slice();
                            var root = document.getElementById('f-exclude');
                            var show = root.querySelector('.ctl__value');
                            if (show) rerenderMulti(root, show, 'exclude', arr);
                        }
                        function syncToggleCheckboxes() {
                            document.querySelectorAll('input[data-toggle]').forEach(function (cb) {
                                cb.checked = model[cb.getAttribute('data-toggle')];
                            });
                            document.querySelectorAll('#more-grid .sub-checkbox input').forEach(function (cb) {
                                var label = cb.parentElement.querySelector(':scope > span:last-child').textContent;
                                var key = Object.keys(TOGGLES).filter(function (k) { return TOGGLES[k].label === label; })[0];
                                if (key) cb.checked = model.toggles[key];
                            });
                        }

                        // ------- 初始化 -------
                        function init() {
                            initSingle('f-target', 'target', null);
                            initSingle('f-backend', 'backend', function (val) { detectVersion(val); });
                            initSingle('f-short', 'short', null);
                            initSingle('f-config', 'config', null);
                            initMulti('f-protocol', 'protocol', true);
                            initMulti('f-exclude', 'exclude', false);

                            // 未配置数据库时禁用短链地址
                            if (!HAS_DB) {
                                var shortBox = document.getElementById('f-short').querySelector('.ctl__box');
                                if (shortBox) shortBox.classList.add('is-disabled');
                            }

                            document.getElementById('social-github').addEventListener('click', function () {
                                window.open(GITHUB_URL, '_blank');
                            });

                            // 主题初始化
                            initTheme();

                            // 后端版本检测
                            detectVersion(model.backend);

                            afterChange();
                        }

                        // ------- 主题 ----
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
                                var cb = function () {
                                    if (!window.localStorage.getItem('localTheme')) detect();
                                };
                                if (mq.addEventListener) mq.addEventListener('change', cb);
                                else if (mq.addListener) mq.addListener(cb);
                            }
                            detect();
                        }

                        document.addEventListener('DOMContentLoaded', init);
                    })();
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