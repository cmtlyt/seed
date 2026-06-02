const base = import.meta.env.BASE_URL.replace(/\/$/u, '');

export function withBase(path: string): string {
  // 站内绝对路径：拼接 base（避免重复拼接）
  if (path.startsWith('/')) {
    if (base && path.startsWith(base)) {
      return path;
    }
    return `${base}${path}`;
  }

  // 绝对 URL（协议开头或 //）：原样返回
  if (/^(?:\w+:)?\/\//u.test(path)) {
    return path;
  }

  // 相对路径：原样返回，交给浏览器解析
  return path;
}
