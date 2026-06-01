import type { createLogger } from '@cmtlyt/logger';
import { webConsoleAdapter } from '@cmtlyt/logger/adapters/web';

type LoggerHandler = (pointer: string, message?: string, ...args: any[]) => void;

type CreateLoggerOptions<T> = NonNullable<Parameters<typeof createLogger<T>>[0]>;

interface Logger {
  log: LoggerHandler;
  info: LoggerHandler;
  warn: LoggerHandler;
  error: LoggerHandler;
  debug: LoggerHandler;
  appear: LoggerHandler;
}

interface TransformData {
  type: string;
  pointer: string;
  messages: any[];
  oriMessages: any[];
}

const options: CreateLoggerOptions<TransformData> = {
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
  outputAdapters: [
    webConsoleAdapter({
      allowTypes: ['appear'],
      consoleLevel: 'debug',
    }),
  ],
};

export { options };
export type { Logger, TransformData, LoggerHandler };
