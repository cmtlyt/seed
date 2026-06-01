/**
 * 需要和 node-logger.js 保持一致
 * 因为 astro build 的时候直接使用 import 无法读取相对路径
 * 只能写一份静态配置了
 * 等后续 astro 修复后合并为一个
 *
 * @type {import('./types').CreateLoggerOptions<import('./types').TransformData>}
 */
const options = {
  transform(options) {
    const { type, messages: oriMessages } = options;
    const [pointer, ...messages] = oriMessages;
    return {
      type,
      pointer,
      messages,
      oriMessages,
    };
  },
  report(options) {
    const { data: _ } = options;
    // TODO: 日志上报
  },
};

export { options };
