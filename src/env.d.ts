declare namespace App {
  interface Locals {
    requestedAt: string;
    pathname: string;
  }
}

interface ImportMetaEnv {
  EXAMPLE_STR?: string;
  EXAMPLE_NUM?: number;
  EXAMPLE_FLOAT?: number;
  EXAMPLE_BOOL?: boolean;
  EXAMPLE_ENUM?: 'test' | 'test1';
  // 更多环境变量…
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}
