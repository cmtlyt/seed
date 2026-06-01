# Astro Multi-Framework Template

基于 [Astro 6](https://astro.build) 的多框架模板项目，在同一个 Astro 应用中集成 **Preact、React、Vue、Solid、Svelte、Alpine.js** 六大框架。

## ✨ 特性

- 🚀 **多框架共存** — 同一项目中混合使用 Preact / React / Vue / Solid / Svelte / Alpine.js
- 📦 **按功能分组** — 组件按功能目录组织，每个组件包含多框架实现
- 🔧 **现代工具链** — oxlint + oxfmt + Prettier，快速且严格的代码质量保障
- 🔒 **Git Hooks** — Husky + lint-staged + commitlint，规范提交流程
- 📝 **Content Collections** — 支持 Markdown / MDX 内容管理
- 🌐 **RSS Feed** — 内置 RSS 订阅端点

## 📋 环境要求

- **Node.js** >= 24.14.1（见 `.nvmrc`）
- **pnpm** >= 11

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🧞 Commands

| Command | Action |
| :--- | :--- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 `localhost:4321` |
| `pnpm build` | 构建生产产物到 `./dist/` |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm lint` | 运行 oxlint 代码检查 |
| `pnpm lint:fix` | 自动修复 lint 问题 |
| `pnpm fmt` | 格式化所有文件（oxfmt + Prettier） |
| `pnpm fmt:code` | 仅格式化 JS/TS 等（oxfmt） |
| `pnpm fmt:astro` | 仅格式化 `.astro` 文件（Prettier） |
| `pnpm fmt:check` | 检查格式是否正确（不修改文件） |

## 📁 项目结构

```
src/
├── components/          # UI 组件，按功能分组
│   ├── button/          # 按钮组件 (astro/preact/react/solid/svelte/vue)
│   ├── counter/         # 计数器组件 (含 alpine 变体)
│   ├── fetch-data/      # 数据请求示例
│   ├── tabs/            # 标签页组件
│   ├── timer/           # 定时器组件
│   └── todo-list/       # 待办列表组件
├── docs/                # Markdown/MDX 内容 (Content Collections)
├── endpoints/           # 框架入口点 (alpine.ts, vue.ts)
├── layouts/             # 页面布局 (base-layout.astro)
└── pages/               # 路由页面
    ├── comp-test/       # 组件测试页（每个组件一个页面）
    ├── env-test.astro   # 环境变量测试
    ├── index.astro      # 首页
    └── rss.xml.ts       # RSS 订阅端点
```

## 🎨 多框架约定

每个组件通过文件后缀区分框架实现：

| 后缀 | 框架 | 说明 |
| :--- | :--- | :--- |
| `.astro` | Astro | 服务端渲染 |
| `.preact.tsx` | Preact | 轻量 React 替代 |
| `.react.tsx` | React | 通过 `@preact/compat` 兼容 |
| `.solid.tsx` | Solid.js | 细粒度响应式 |
| `.svelte` | Svelte 5 | 编译时框架 |
| `.vue` | Vue 3 | 组合式 API |
| `.alpine.astro` | Alpine.js | 轻量交互（通过 Astro） |

> **注意**：React 通过 `package.json` 中的 `overrides` 别名到 `@preact/compat`，无需安装真实的 `react` / `react-dom`。

## 🔧 代码质量

### Linting

使用 [oxlint](https://oxc.rs/docs/guide/usage/linter) 进行代码检查，配置文件为 `.oxlintrc.json`。

### Formatting

| 工具 | 配置文件 | 负责范围 |
| :--- | :--- | :--- |
| [oxfmt](https://oxc.rs/docs/guide/usage/formatter) | `.oxfmtrc.json` | JS / TS / TSX / JSX / Svelte 等 |
| [Prettier](https://prettier.io) | `.prettierrc` | `.astro` 文件（通过 `prettier-plugin-astro`） |

### Git Hooks

| Hook | 触发时机 | 行为 |
| :--- | :--- | :--- |
| `pre-commit` | 提交前 | lint-staged 自动格式化 + lint |
| `commit-msg` | 提交时 | commitlint 校验 [Conventional Commits](https://www.conventionalcommits.org/) |
| `pre-push` | 推送前 | 构建检查 |

## 📚 参考

- [Astro 文档](https://docs.astro.build)
- [Astro AI 工具](https://docs.astro.build/zh-cn/guides/build-with-ai/)
- [Astro Discord](https://astro.build/chat)
