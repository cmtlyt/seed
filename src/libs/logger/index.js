import { createLogger } from '@cmtlyt/logger';
import { webConsoleAdapter } from '@cmtlyt/logger/adapters/web';
import { nodeConsoleAdapter } from '@cmtlyt/logger/adapters/node';
import { matchesLevel } from 'astro/logger';

/**
 * @typedef {import('./types').Logger} Logger
 * @typedef {import('./types').TransformData} TransformData
 * @typedef {import('./types').CreateLoggerOptions<TransformData>} CreateLoggerOptions
 * @typedef {import('@cmtlyt/logger/adapters/node').NodeConsoleAdapterOptions<TransformData>} NodeConsoleAdapterOptions
 */

/** @type {CreateLoggerOptions} */
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

/** @type {NodeConsoleAdapterOptions} */
const nodeAdapterOptions = {
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
};

/** @type {Logger} */
const logger = createLogger({
  ...options,
  outputAdapters: [
    webConsoleAdapter({
      allowTypes: ['appear'],
      consoleLevel: 'debug',
    }),
    nodeConsoleAdapter(nodeAdapterOptions),
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
