import type { createLogger } from '@cmtlyt/logger';

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

export type { CreateLoggerOptions, Logger, TransformData, LoggerHandler };
