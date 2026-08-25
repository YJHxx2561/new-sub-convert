# sub-convert

一个防止节点泄漏的订阅转换小工具，**同时支持 Cloudflare Worker / Pages 与 Docker 自托管** [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jwyGithub/sub-convert)

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/jwyGithub/sub-convert/cloudflare-release.yml?label=cloudflare" alt='cloudflare build'>
  <img src="https://img.shields.io/github/actions/workflow/status/jwyGithub/sub-convert/docker-release.yml?label=docker" alt='docker build'>
  <img src="https://img.shields.io/github/issues/jwyGithub/sub-convert" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/sub-convert" alt='license'>
</p>

## ✨ 功能特点

### 📌 在线体验

体验地址：[https://convert.looby.dpdns.org](https://convert.looby.dpdns.org)

### 📌 支持的协议类型

| 协议         | 状态 | url      | base64   | yaml/yml |
| ------------ | ---- | -------- | -------- | -------- |
| VLESS        | ✅   | 完全支持 | 完全支持 | 已测试   |
| VMess        | ✅   | 完全支持 | 完全支持 | 已测试   |
| Trojan       | ✅   | 完全支持 | 完全支持 | 已测试   |
| Shadowsocks  | ✅   | 完全支持 | 完全支持 | 已测试   |
| ShadowsocksR | ✅   | 完全支持 | 完全支持 | 已测试   |
| Hysteria     | ✅   | 完全支持 | 完全支持 | 已测试   |
| Hysteria2    | ✅   | 完全支持 | 完全支持 | 已测试   |
| HY2          | ✅   | 完全支持 | 完全支持 | 已测试   |
| TUIC         | ✅   | 完全支持 | 完全支持 | 已测试   |
| AnyTLS       | ✅   | 完全支持 | 完全支持 | 已测试   |

### 📦 订阅格式转换支持

- ✅ Base64 编码
- ✅ YAML 配置
- 🚧 JSON 配置

### 🔄 支持转换的客户端

- ✅ Clash
- ✅ sing-box
- ✅ v2ray

## 🏗 架构

项目采用 Hono 作为 HTTP 层，通过 **Adapter 模式**同时适配两套运行时：

```text
┌────────────────────────────────────────────────┐
│          src/app.ts  (Hono app factory)        │
│  routes · middleware · UrlService · IUrlRepo   │
└───────────────┬──────────────────┬─────────────┘
                │                  │
     ┌──────────▼───────┐   ┌──────▼──────────┐
     │  cloudflare.ts   │   │    node.ts      │
     │  (CF Worker)     │   │ @hono/node-server│
     │  D1 Repository   │   │ node:sqlite     │
     └──────────────────┘   └─────────────────┘
                │                  │
     ┌──────────▼───────┐   ┌──────▼──────────┐
     │ dist/worker/     │   │ dist/node/      │
     │   _worker.js     │   │   server.mjs    │
     └──────────────────┘   └─────────────────┘
```

构建产物统一输出到 `dist/`，由 tsdown 一个配置文件产出两套，详见 `tsdown.config.ts`。

## ⚙️ 配置说明

### 环境变量配置（通用）

| 变量名            | 说明                             | 默认值              | 必填 | 备注                            |
| ----------------- | -------------------------------- | ------------------- | ---- | ------------------------------- |
| `BACKEND`         | 转换时的后端服务地址             | `https://url.v1.mk` | ❌   | 真正执行转换的服务地址          |
| `DEFAULT_BACKEND` | 默认后端服务地址                 | worker服务地址      | ❌   |                                 |
| `LOCK_BACKEND`    | 是否锁定后端服务                 | `false`             | ❌   |                                 |
| `CUSTOM_BACKEND`  | 自定义后端服务地址(支持多行配置) | 无                  | ❌   | 每行填写一个                    |
| `REMOTE_CONFIG`   | 自定义远程配置<br>(支持多行配置) | `https://xxxxx1`    | ❌   |                                 |
| `CHUNK_COUNT`     | 节点批量处理分片大小             | `20`                | ❌   |                                 |
| `SHORT_URL_KEY`   | 短链管理页访问密钥               | 无                  | ❌\* | 进入 `/shortUrl` 管理页时必填\* |

> \* 主页「生成短链」只需启用短链服务即可，不依赖 `SHORT_URL_KEY`。访问管理页时则必须同时满足：短链服务已启用，且已配置 `SHORT_URL_KEY`。

### 短链服务开关

| 运行环境          | 开关方式                                | 数据库                 |
| ----------------- | --------------------------------------- | ---------------------- |
| Cloudflare Worker | 在 `wrangler.jsonc` 绑定 `DB`（D1）     | Cloudflare D1          |
| Docker / Node     | 设置 `DATABASE_DRIVER=sqlite`（默认值） | `node:sqlite` 本地文件 |

### Docker / Node 专属变量

| 变量名            | 说明                           | 默认值                     |
| ----------------- | ------------------------------ | -------------------------- |
| `DATABASE_DRIVER` | 数据库驱动，留空则关闭短链     | `sqlite`                   |
| `SQLITE_PATH`     | SQLite 数据库文件路径          | `/data/sub-convert.sqlite` |
| `PORT`            | HTTP 服务端口                  | `3000`                     |
| `HOST`            | 监听地址                       | `0.0.0.0`                  |
| `SHORT_URL_KEY`   | 短链管理页访问密钥（推荐配置） | 无                         |

## 📝 使用说明

### 🛠 本地开发

```bash
# 安装依赖
pnpm install

# Cloudflare Worker 本地开发
pnpm dev            # 等价于 wrangler dev

# Node/Docker 适配器本地开发（tsx watch）
pnpm dev:node
```

### 📦 构建

```bash
pnpm build          # 同时产出 dist/worker/_worker.js + dist/node/server.mjs
pnpm build:worker   # 仅 Cloudflare 产物
pnpm build:node     # 仅 Node 产物
```

| 产物                     | 用途                                              |
| ------------------------ | ------------------------------------------------- |
| `dist/worker/_worker.js` | Cloudflare Worker / Pages 自包含 bundle           |
| `dist/node/server.mjs`   | Node.js / Docker 入口，node_modules 保持 external |

### ☁️ 部署到 Cloudflare

下面三种方式任选其一，均可将本项目部署到 Cloudflare。构建产物统一为自包含的自定义 Worker bundle（`dist/worker/_worker.js`，约几百 KB，可直接作为 Worker 也能作为 Pages 部署）。

#### 方式一：直接上传文件

适合不想关联 Git、想快速上线的部署，全程在 Cloudflare 面板完成。

**① 本地构建 Worker 产物：**

```bash
pnpm install
pnpm build:worker   # 产出 dist/worker/_worker.js
```

**② 在 Dashboard 上传：**

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **创建** → **Worker** → 选择名称后点「部署」
2. 进入 Worker 的 **编辑代码** 页面
3. 将 `dist/worker/_worker.js` 的内容全选粘贴覆盖默认代码（或用 **上传** 直接上传该文件）
4. 点击「部署」，即可访问 `https://sub-convert.<你的子域>.workers.dev`

> 也可用 CLI 一步完成：`npx wrangler deploy`（需登录 Cloudflare）。
> 若未在本地构建，可直接从 `release` 分支（由 GitHub Action 产出）下载现成的 `_worker.js` / `_worker.zip`。

如需启用短链，在 Worker **设置 → 变量** 中配置下方环境变量，并在 **设置 → 绑定 → 添加 D1 数据库** 绑定数据库，变量名使用 `DB`。

#### 方式二：在 Cloudflare 面板连接 GitHub 账号（Pages）

全程在面板完成，无需本地环境，仓库更新后还可手动重新部署：

1. [Fork](https://github.com/yjhup/sub-convert) 本仓库
2. 登录 Cloudflare Dashboard → **Workers & Pages** → **创建** → **Pages → 连接到 Git**
3. 按提示授权 Cloudflare 连接你的 GitHub 账号，然后选择 Fork 后的仓库
4. 框架预设选择 **None**；**构建命令**与**构建输出目录**均留空
5. **部署分支**选择 `release`——该分支由 GitHub Action 每次发布（打 tag）自动产出已构建好的 `_worker.js`，可直接部署
6. 点击「保存并部署」，即获得 `https://<项目名>.pages.dev`

> 若选择 `main` 分支，则 Cloudflare 会自行构建（需在构建设置中填写依赖安装命令 `pnpm install` 与构建命令 `pnpm build:worker`，并将**构建输出目录**设为 `dist/worker`，确保 `_worker.js` 位于输出根目录）；选择 `release` 分支则免去构建步骤，更简单可靠。
> Pages 的短链功能需在 **设置 → 变量** 配置环境变量并绑定 D1 数据库。

#### 方式三：使用 GitHub Action 自动部署

仓库内置 [`cloudflare-deploy.yml`](.github/workflows/cloudflare-deploy.yml)，推送到 `main` 或手动触发时自动构建并部署，无需在面板操作。

**① 在 Cloudflare 创建 API Token**

进入 [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → **Edit Cloudflare Workers** 模板：

- **Account Resources**：Include → 你的账号
- **Permissions**：至少包含 **Worker Scripts → Edit**（部署 Worker），可按需补充 D1 / 其它权限
- 点击 Continue → Create，复制生成的 Token（只显示一次）

**② 在 GitHub 仓库配置 Secrets**

进入 GitHub 仓库 **Settings → Secrets and variables → Actions → New repository secret**：

| Secret | 说明 | 必填 |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | 上一步创建的 API Token | ✅ |
| `CLOUDFLARE_ACCOUNT_ID` | 你的 Cloudflare 账号 ID（右侧栏 Account ID） | 建议 |

**③ 触发部署**

- 推送代码到 `main` 分支会自动部署为 Cloudflare **Worker**；
- 也可在仓库 **Actions** 页面 → 左侧 **Deploy to Cloudflare** → **Run workflow**，手动选择部署到 **worker**（默认，`wrangler deploy`）或 **pages**（`wrangler pages deploy dist/worker`）。

> 完整发布自动化：推送标签 `v*.*.*` 时，现有 [`cloudflare-release`](.github/workflows/cloudflare-release.yml) 会构建并把产物推送到 `release` 分支，供「直接上传」或「连接 Git」使用。

### 🐳 部署方式四：Docker

仓库在打 tag 时会由 GitHub Actions 自动构建并推送 multi-arch 镜像（linux/amd64 + linux/arm64）到 GHCR：

```bash
ghcr.io/jwygithub/sub-convert:latest
ghcr.io/jwygithub/sub-convert:<tag>
```

#### docker run

```bash
docker run -d \
  --name sub-convert \
  --restart unless-stopped \
  -p 3000:3000 \
  -v sub-data:/data \
  -e BACKEND=https://url.v1.mk \
  -e DATABASE_DRIVER=sqlite \
  -e SQLITE_PATH=/data/sub-convert.sqlite \
  -e SHORT_URL_KEY=your-admin-key \
  ghcr.io/jwygithub/sub-convert:latest
```

#### docker-compose

仓库自带 `docker-compose.yml`，直接：

```bash
docker compose up -d
```

#### 本地自行构建

```bash
pnpm docker:build   # 等价于 docker build -t sub-convert .
pnpm docker:run     # 使用默认 env 启动一个临时容器
```

### 🔗 访问地址

- Worker 部署：`https://your-worker-name.your-subdomain.workers.dev`
- Pages 部署：`https://your-project-name.pages.dev`
- Docker 部署：`http://<host>:3000`

### 🔗 短链服务

短链服务用于将较长的订阅链接转换为简短的 URL，便于分享和使用。短链服务是否启用由运行环境自动判定：

- **Cloudflare**：`wrangler.jsonc` 中绑定了 D1（`DB`）→ 启用
- **Node / Docker**：`DATABASE_DRIVER=sqlite`（默认值）→ 启用；设为空字符串关闭

#### 🖥 短链管理页

访问路径：`/shortUrl`（主页 header 也提供「短链管理」入口）。

管理页能力：

- 按创建时间倒序查看短链列表（默认每页 20 条），支持复制 / 删除
- 列表区域内滚动，整页不滚动
- 通过弹窗手动生成短链

进入管理页的前置条件（需同时满足）：

1. 短链服务已启用（见上方开关说明）
2. 已配置环境变量 `SHORT_URL_KEY`

行为说明：

| 场景                           | 行为                                     |
| ------------------------------ | ---------------------------------------- |
| 短链服务未启用                 | 提示后返回主页                           |
| 已启用但未配置 `SHORT_URL_KEY` | 提示「请先配置 SHORT_URL_KEY」后返回主页 |
| 密钥正确                       | 进入管理列表                             |
| 密钥错误                       | 提示「密钥不正确」后返回主页             |

密钥校验通过后会缓存在浏览器 `sessionStorage`（键名 `short_url_admin_key`）：同一标签页内再次进入无需重复输入；关闭标签页后失效。

> 主页「生成短链」逻辑不变：只要短链服务启用即可生成，不要求配置或输入 `SHORT_URL_KEY`。
> 管理相关接口（列表 / 删除 / 按 code 查询）会校验请求头 `X-Admin-Key`；`POST /api/add` 与短链跳转不受影响。

配置方式：

- **Cloudflare**：在 Worker / Pages 的 Secrets 或变量中设置 `SHORT_URL_KEY`
- **Node / Docker**：在 `.env` 或容器环境变量中设置，例如 `SHORT_URL_KEY=your-admin-key`

#### 💾 数据库表

- 表名：`short_url`
- 字段：
    - `id`：自增主键
    - `short_code`：短链码
    - `short_url`：短链 URL
    - `long_url`：原始订阅链接
    - `created_at`：创建时间（ISO 字符串，可为空，兼容旧数据）

#### 💾 数据库结构

```sql
CREATE TABLE IF NOT EXISTS short_url (
    id INTEGER PRIMARY KEY,
    short_code TEXT,
    short_url TEXT,
    long_url TEXT,
    created_at TEXT
);
```

> Cloudflare D1 环境下表由 `schema.sql` 初始化；Node/Docker 环境下由 `SqliteUrlRepository` 启动时自动建表，并自动为旧表补充 `created_at` 列，挂载数据卷（如 `-v sub-data:/data`）持久化。

已有 D1 库若缺少 `created_at`，可执行一次迁移：

```bash
wrangler d1 execute <DB_NAME> --file=./migrations/001_add_created_at.sql
```

#### 💾 配置示例

![配置示例](./src/doc/screen/env.png)

#### 💾 数据库部署文档

[Cloudflare D1](https://developers.cloudflare.com/d1/get-started/)

#### 💾 工作原理

<p><img src="./src/doc/screen/flow.svg" width="200px" height="auto" alt="工作原理" /></p>

#### 💾 提示

- `只有使用部署的 Worker / Docker 服务，才有混淆的效果；使用其他第三方后端转换服务没有混淆效果`

## 🚀 发布流程

仓库采用 tag 驱动的统一发布模式，推送 `v*.*.*` 会并行触发两条流水线：

| 事件 | 触发的 GitHub Action | 产物 |
| --- | --- | --- |
| push tag `v*.*.*` | [`cloudflare-release`](.github/workflows/cloudflare-release.yml) | `release` 分支更新 `_worker.js` + `_worker.zip` |
| push tag `v*.*.*` | [`docker-release`](.github/workflows/docker-release.yml) | GHCR multi-arch 镜像 `ghcr.io/<owner>/<repo>:<tag>` + `latest` |

发布命令：

```bash
git tag v0.1.0
git push origin v0.1.0
```

两个 workflow 均支持 **`workflow_dispatch` 手动触发**，方便在不打 tag 的情况下重跑。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## ⚠️ 免责声明

在使用此项目时均被视为已经仔细阅读并完全同意以下条款：

- 此项目仅供个人学习与交流使用，严禁用于商业以及不良用途。
- 如有发现任何商业行为以及不良用途，此项目作者有权撤销使用权。
- 使用本软件所存在的风险将完全由其本人承担，此项目作者不承担任何责任。
- 此项目注明之服务条款外，其它因不当使用本软件而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，本软件作者概不负责，亦不承担任何法律责任。
- 对于因不可抗力或因黑客攻击、通讯线路中断等不能控制的原因造成的服务中断或其他缺陷，导致用户不能正常使用，此项目作者不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
- 本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
- 本软件相关声明版权及其修改权、更新权和最终解释权均属此项目作者所有。

## 📄 开源协议

本项目遵循 [LICENSE](./LICENSE) 开源协议。

