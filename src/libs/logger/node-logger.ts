import { createLogger } from '@cmtlyt/logger';
import { nodeConsoleAdapter } from '@cmtlyt/logger/adapters/node';
import { options, type Logger, type TransformData } from './base';
import type { AstroLoggerLevel, AstroLoggerDestination, AstroLoggerMessage } from 'astro';
import { matchesLevel } from 'astro/logger';

const logger = createLogger<TransformData>({
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
}) as unknown as Logger;

interface LoggerOptions {
  level?: AstroLoggerLevel;
}

export { logger };

export default function astroLogger(options: LoggerOptions = {}): AstroLoggerDestination<AstroLoggerMessage> {
  const { level = 'info' } = options;

  return {
    write(chunk) {
      // If matchesLevel hasn't loaded yet, show all messages
      if (matchesLevel && !matchesLevel(chunk.level, level)) {
        return;
      }

      const label = chunk.label || 'default-pointer';
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
