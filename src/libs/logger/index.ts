import { createLogger } from '@cmtlyt/logger';
import { options, type Logger, type TransformData } from './base';

const logger = createLogger<TransformData>(options) as unknown as Logger;

export { logger };
