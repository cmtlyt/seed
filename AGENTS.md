# AGENTS.md

## Project Overview

This is an Astro multi-framework template project that demonstrates how to use **multiple UI frameworks** (Preact, React, Vue, Solid, Svelte, Alpine.js) within a single Astro application.

- **Runtime**: Node.js >= 24.14.1 (`.nvmrc`: `24`)
- **Package Manager**: pnpm >= 11
- **Build Tool**: Astro 6.x (Vite-based)
- **Output Mode**: `static` (pre-rendered at build time by default, with `@astrojs/node` standalone adapter for opt-in SSR)
- **Additional Integrations**: MDX, Partytown, Sitemap, RSS

## Multi-Framework Conventions

Components are organized by **framework directory** under `src/components/`:

| Directory | Framework | File Extension | Include Pattern |
|---|---|---|---|
| `astro/` | Astro (server-rendered) | `.astro` | N/A |
| `preact/` | Preact | `.tsx` | `**/components/preact/**` |
| `react/` | React (aliased to @preact/compat) | `.tsx` | `**/components/react/**` |
| `solid/` | Solid.js | `.tsx` | `**/components/solid/**` |
| `svelte/` | Svelte 5 | `.svelte` | All `*.svelte` files |
| `vue/` | Vue 3 | `.vue` | `**/components/vue/**` |
| `alpine/` | Alpine.js (via Astro) | `.astro` | N/A |

**Directory structure**: `src/components/{framework}/{component-name}/index.{ext}`

Example:
```
src/components/
├── react/button/index.tsx
├── preact/button/index.tsx
├── solid/button/index.tsx
├── svelte/button/index.svelte
├── vue/button/index.vue
├── astro/button/index.astro
└── alpine/counter/index.astro
```

**Vue integration** has an `appEntrypoint` configured at `src/endpoints/vue.ts` for global Vue app plugins/directives.

**Important**: React is aliased to `@preact/compat` via `overrides` in `package.json`. Do not install real `react`/`react-dom`.

## TypeScript Configuration

- Base config extends `astro/tsconfigs/strict`
- Path aliases:
  - `@/*` → `./src/*`
  - `~/*` → `./*`
  - `@logger` → `./src/libs/logger/index.ts`
  - `@logger/*` → `./src/libs/logger/*`
- Plugin: `@astrojs/ts-plugin`
- Framework-specific JSX tsconfigs live **inside** each component directory (not at project root):
  - `src/components/preact/tsconfig.json` — `jsxImportSource: "preact"`
  - `src/components/react/tsconfig.json` — `jsxImportSource: "react"` (jsx: `react-jsx`)
  - `src/components/solid/tsconfig.json` — `jsxImportSource: "solid-js"`

## Code Quality & Formatting

### Linting: oxlint

- Config: `.oxlintrc.json`
- Plugins: import, jest, jsx-a11y, oxc, react, typescript, unicorn, vue
- Run: `pnpm run lint` / `pnpm run lint:fix` / `pnpm run lint:github` (GitHub Actions format)

### Formatting: oxfmt + Prettier

Two formatters with distinct responsibilities:

| Tool | Config | Scope |
|---|---|---|
| **oxfmt** | `.oxfmtrc.json` | JS/TS/TSX/JSX/Svelte etc. |
| **Prettier** | `.prettierrc` | `.astro` files only (via `prettier-plugin-astro`) |

- `pnpm run fmt` — format all files (runs both)
- `pnpm run fmt:code` — oxfmt only
- `pnpm run fmt:astro` — Prettier for `.astro` only
- `pnpm run fmt:check` — check without writing

### Git Hooks (Husky)

- **pre-commit**: `lint-staged` — auto format + lint staged files
  - `*.{js,jsx,ts,tsx,mjs,cjs,svelte}` → `fmt:code` + `lint`
  - `*.astro` → `fmt:astro` + `lint`
- **commit-msg**: `commitlint` (extends `@commitlint/config-conventional`) — enforce [Conventional Commits](https://www.conventionalcommits.org/)
- **pre-push**: `pnpm run build` — build verification before push

### CI (GitHub Actions)

- Workflow: `.github/workflows/oxlint.yml`
- Triggers: push to `main`, pull requests
- All actions pinned to commit SHA for supply chain security

## Lint Verification Rule

**After every code change, you MUST run `pnpm run lint` via shell to verify there are no errors.** Always trust the output of the `pnpm run lint` command over `read_lints` — the CLI result is the source of truth. Do not consider a task complete until `pnpm run lint` passes with zero errors.

## Hydration & Interactivity Rules

### Client Directives

Framework components default to **static HTML** (no JS). Add a `client:*` directive to make them interactive:

| Directive | When JS loads | Use case |
|---|---|---|
| _(none)_ | Never | Static content, no interactivity |
| `client:load` | Immediately on page load | Must be interactive ASAP (CTA buttons, nav) |
| `client:idle` | After page idle (`requestIdleCallback`) | Medium-priority (comments, sidebar) |
| `client:idle={{ timeout: N }}` | After idle or N ms, whichever first | Time-bounded idle hydration |
| `client:visible` | When entering viewport (`IntersectionObserver`) | Below-the-fold content (carousels, footers) |
| `client:visible={{ rootMargin: 'Npx' }}` | When within N px of viewport | Preload heavy components slightly early |
| `client:media="(query)"` | When CSS media query matches | Mobile-only toggles, responsive widgets |
| `client:only="framework"` | Immediately, **skips SSR entirely** | Components using browser APIs (`window`, `document`) |

### `client:only` Framework Values

The value must match the **integration name**, not the file suffix:

| Framework | Value |
|---|---|
| Preact (`.preact.tsx`) | `client:only="preact"` |
| React (`.react.tsx`) | `client:only="react"` |
| Solid (`.solid.tsx`) | `client:only="solid-js"` |
| Vue (`.vue`) | `client:only="vue"` |
| Svelte (`.svelte`) | `client:only="svelte"` |

`client:only` supports a `slot="fallback"` for loading placeholder:

```astro
<Counter client:only="vue">
  <div slot="fallback">Loading...</div>
</Counter>
```

### Known SSR Limitations (This Project)

Preact compat + Solid coexist in this project, causing JSX renderer conflicts during SSR. As a result:

- **Preact/React**: only `client:only` works for hydrated interactivity. Static rendering (no directive) also works.
- **Vue / Svelte / Solid**: all `client:*` directives work normally.
- **Alpine / Astro**: use their own `<script>` mechanism, not Astro hydration directives.

### Passing Props to Hydrated Components

Props passed to hydrated components must be **serializable** (transferred over the network). Supported types:

- Primitives: `string`, `number`, `boolean`, `BigInt`, `Infinity`
- Objects: plain `object`, `Array`, `Map`, `Set`, `Date`, `RegExp`, `URL`
- Typed arrays: `Uint8Array`, `Uint16Array`, `Uint32Array`

**Not supported**: functions, class instances, DOM nodes. Functions cannot be passed as props to hydrated components — handle events inside the component itself.

### Passing Children / Slots

```astro
<!-- React/Preact/Solid: use `children` prop -->
<ReactComponent client:load>
  <p>This becomes props.children</p>
</ReactComponent>

<!-- Named slots → camelCase props in React/Preact/Solid -->
<ReactComponent client:load>
  <h2 slot="title">Header</h2>
  <p>Default children</p>
</ReactComponent>
<!-- In React: props.title and props.children -->

<!-- Vue/Svelte: use <slot /> / <slot name="x" /> inside component -->
<VueComponent client:load>
  <h2 slot="title">Header</h2>
  <p>Default slot</p>
</VueComponent>
```

### Cross-Island Communication

Islands are **isolated** — they don't share React/Vue/Svelte context. Options for inter-island communication:

1. **Nano Stores** (recommended): framework-agnostic reactive store, works across all frameworks
2. **Custom DOM Events**: `dispatchEvent` / `addEventListener` on shared DOM elements
3. **Framework-specific exports**: Solid signals or Svelte stores exported from shared files

### Nesting Framework Components

You can nest hydrated components inside other hydrated components in `.astro` files:

```astro
<ReactSidebar client:load>
  <SvelteButton client:idle />  <!-- different framework OK -->
</ReactSidebar>
```

**Restriction**: inside a framework component file (`.jsx`, `.vue`, etc.), you cannot import `.astro` components or components from other frameworks. Use slots to compose them from `.astro` files instead.

## Prerender Rules

This project uses `output: 'static'` with `@astrojs/node` adapter — **all pages are pre-rendered at build time by default**, but individual pages/endpoints can opt out to SSR.

### If adapter is enabled (`adapter: node(...)` configured)

- All pages default to `prerender = true` (static generation at build time).
- Individual pages/endpoints can **opt out** to SSR by adding `export const prerender = false` in the frontmatter — these pages will be rendered on each request at runtime.
- **Dynamic routes** with `prerender = true` (default) must export `getStaticPaths()`. Dynamic routes with `prerender = false` do **not** need `getStaticPaths()` — params come from the live request.
- API routes with `prerender = false` handle **live requests** at runtime. API routes without it produce static JSON files at build time.
- Middleware runs at build time for prerendered pages, and at **runtime** for SSR pages.

### If adapter is NOT enabled (no `adapter` configured)

- **All** pages and endpoints are statically generated — no SSR is possible.
- `export const prerender = false` is **not allowed** and will cause a build error.
- **All dynamic routes** must export `getStaticPaths()`.
- API routes produce **static files only** at build time.
- Middleware runs at build time only.

### Dynamic route example

```astro
---
// src/pages/docs/[slug].astro — prerendered (default)
export function getStaticPaths() {
  return [
    { params: { slug: 'getting-started' } },
    { params: { slug: 'advanced' } },
  ];
}

const { slug } = Astro.params;
---
<h1>{slug}</h1>
```

```astro
---
// src/pages/user/[id].astro — SSR (requires adapter)
export const prerender = false;

const { id } = Astro.params;
const user = await fetchUser(id);
---
<h1>{user.name}</h1>
```

## API Routes

Server endpoints live in `src/pages/api/`. Export named HTTP method functions (`GET`, `POST`, `PUT`, `DELETE`, etc.):

```ts
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const name = context.url.searchParams.get('name') || 'World';
  return new Response(JSON.stringify({ message: `Hello, ${name}!` }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

- **If adapter is enabled**: endpoints with `export const prerender = false` handle **live requests** at runtime. Endpoints without it produce static files at build time.
- **If adapter is NOT enabled**: all endpoints produce **static files only** at build time.

## Middleware

`src/middleware.ts` exports an `onRequest` function that intercepts every request. Use `defineMiddleware()` for type safety:

```ts
import { defineMiddleware } from 'astro:middleware';
import { logger } from '@logger/node-logger';

export const onRequest = defineMiddleware((context, next) => {
  context.locals.requestedAt = new Date().toISOString();
  context.locals.pathname = context.url.pathname;
  logger.info('middleware', `${context.request.method} ${context.url.pathname}`);
  return next();
});
```

- **`context.locals`**: typed via `App.Locals` in `src/env.d.ts` (currently: `requestedAt`, `pathname`), accessible in all pages/endpoints via `Astro.locals`
- **Chaining**: use `sequence()` from `astro:middleware` to compose multiple middleware
- **If adapter is enabled**: middleware runs at build time for prerendered pages, and at **runtime** for SSR pages (`prerender = false`)
- **If adapter is NOT enabled**: middleware runs at build time during prerendering only — it does **not** run at runtime

## Image Optimization

Use `<Image />` from `astro:assets` for automatic optimization (compression, format conversion, responsive sizing):

```astro
---
import { Image } from 'astro:assets';
import myImage from '@/assets/sample-image.png';
---
<Image src={myImage} alt="描述" />           <!-- auto WebP, lazy load -->
<Image src={myImage} alt="缩小" width={100} /> <!-- resize -->
<Image src={myImage} alt="AVIF" format="avif" /> <!-- specific format -->
```

- **Local images** (`src/assets/`): import and pass the object — width/height auto-inferred
- **Remote images**: must specify `width` and `height` (or use `inferSize`)
- **`public/` images**: use string path + explicit `width`/`height`, no optimization

## Content Collections

Defined in `src/content.config.ts`. Currently one collection:

- **`docs`**: loads `*.md` / `*.mdx` from `src/docs/` via `glob` loader. Schema fields: `title`, `pubDate`, `description`, `author`, `image?`, `tags?`.

## Environment Variables

Astro's type-safe `env` schema is defined in `astro.config.mjs` under `env.schema`. Development values live in `.env.development`.

| Variable | Type | Example |
|---|---|---|
| `EXAMPLE_STR` | string | `"EXAMPLE_STR"` |
| `EXAMPLE_INT` | number | `1` |
| `EXAMPLE_FLOAT` | number | `1.2` |
| `EXAMPLE_BOOL` | boolean | `true` |
| `EXAMPLE_ENUM` | `"test" \| "test2"` | `"test"` |

All are `public`, `server`-context, `optional`. Types are also declared in `src/env.d.ts` under `ImportMetaEnv`.

## Experimental Logger

This project uses Astro's experimental logger feature:

```ts
experimental: {
  logger: {
    entrypoint: 'src/libs/logger/node-logger.js',
    config: { level: 'info' },
  },
}
```

The custom logger implementation lives in `src/libs/logger/` and is importable via `@logger` / `@logger/*` path aliases.

## Prefetch

`prefetch: true` is enabled globally in `astro.config.mjs` — Astro will prefetch internal links on hover/focus.

## Error Pages

- `src/pages/404.astro` — custom 404 page, Astro auto-serves for unmatched routes
- `src/pages/500.astro` — custom 500 page (optional, for SSR mode)

## When Adding New Components

1. Create a new directory under `src/components/{framework}/{component-name}/`
2. Add `index.tsx` (or `index.svelte`, `index.vue`, `index.astro`)
3. Create a test page at `src/pages/comp-test/{component-name}.astro`
4. Import using the `@/components/{framework}/{component-name}` path pattern (for tsx), or `@/components/{framework}/{component-name}/index.{ext}` (for `.vue`, `.svelte`, `.astro`)

<!-- CODEGRAPH_START -->
## CodeGraph

This project has a CodeGraph MCP server (`codegraph_*` tools) configured. CodeGraph is a tree-sitter-parsed knowledge graph of every symbol, edge, and file. Reads are sub-millisecond and return structural information grep cannot.

### When to prefer codegraph over native search

Use codegraph for **structural** questions — what calls what, what would break, where is X defined, what is X's signature. Use native grep/read only for **literal text** queries (string contents, comments, log messages) or after you already have a specific file open.

| Question | Tool |
|---|---|
| "Where is X defined?" / "Find symbol named X" | `codegraph_search` |
| "What calls function Y?" | `codegraph_callers` |
| "What does Y call?" | `codegraph_callees` |
| "How does X reach/become Y? / trace the flow from X to Y" | `codegraph_trace` (one call = the whole path, incl. callback/React/JSX dynamic hops) |
| "What would break if I changed Z?" | `codegraph_impact` |
| "Show me Y's signature / source / docstring" | `codegraph_node` |
| "Give me focused context for a task/area" | `codegraph_context` |
| "See several related symbols' source at once" | `codegraph_explore` |
| "What files exist under path/" | `codegraph_files` |
| "Is the index healthy?" | `codegraph_status` |

### Rules of thumb

- **Answer directly — don't delegate exploration.** For "how does X work" / architecture questions, answer with 2-3 codegraph calls: `codegraph_context` first, then ONE `codegraph_explore` for the source of the symbols it surfaces. For a specific **flow** ("how does X reach Y") start with `codegraph_trace` from→to — one call returns the whole path with dynamic hops bridged — then ONE `codegraph_explore` for the bodies; don't rebuild the path with `codegraph_search` + `codegraph_callers`. Codegraph IS the pre-built index, so spawning a separate file-reading sub-task/agent — or running a grep + read loop — repeats work codegraph already did and costs more for the same answer.
- **Trust codegraph results.** They come from a full AST parse. Do NOT re-verify them with grep — that's slower, less accurate, and wastes context.
- **Don't grep first** when looking up a symbol by name. `codegraph_search` is faster and returns kind + location + signature in one call.
- **Don't chain `codegraph_search` + `codegraph_node`** when you just want context — `codegraph_context` is one call.
- **Don't loop `codegraph_node` over many symbols** — one `codegraph_explore` call returns several symbols' source grouped in a single capped call, while each separate node/Read call re-reads the whole context and costs far more.
- **Index lag**: the file watcher debounces ~500ms behind writes; don't re-query immediately after editing a file in the same turn.

### If `.codegraph/` doesn't exist

The MCP server returns "not initialized." Ask the user: *"I notice this project doesn't have CodeGraph initialized. Want me to run `codegraph init -i` to build the index?"*
<!-- CODEGRAPH_END -->
