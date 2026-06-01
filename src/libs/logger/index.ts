import { createLogger } from '@cmtlyt/logger';
import { webConsoleAdapter } from '@cmtlyt/logger/adapters/web';
import { type Logger, type TransformData } from './types';
import { options } from './base';

const logger = createLogger<TransformData>({
  ...options,
  outputAdapters: [
    webConsoleAdapter({
      allowTypes: ['appear'],
      consoleLevel: 'debug',
    }),
  ],
}) as unknown as Logger;

export { logger };
