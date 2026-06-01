import { createLogger } from '@cmtlyt/logger';
import { nodeConsoleAdapter } from '@cmtlyt/logger/adapters/node';
import { matchesLevel } from 'astro/logger';

/**
 * 需要和 base.js 保持一致
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

/**
 * @type {import('./types').Logger}
 */
const logger = createLogger({
  ...options,
  outputAdapters: [
    nodeConsoleAdapter({
      enableColors: true,
      getLabel(option) {
        return option.transformData.pointer;
      },
      formatDate(date) {
        return date.toLocaleTimeString();
      },
      getMessages(option) {
        return option.messages.slice(1);
      },
      format: '%date [%type#%label] %message -- %othermessages',
    }),
  ],
});

export { logger };

export default function astroLogger(options = {}) {
  const { level = 'info' } = options;

  return {
    write(chunk) {
      // If matchesLevel hasn't loaded yet, show all messages
      if (matchesLevel && !matchesLevel(chunk.level, level)) {
        return;
      }

      const label = chunk.label || 'astro-system';
      const content = chunk.message;

      switch (chunk.level) {
        case 'error':
        case 'warn':
        case 'info':
        case 'debug':
          logger[chunk.level](label, content);
          break;
        default:
          logger.info(label, content);
      }
    },
  };
}
