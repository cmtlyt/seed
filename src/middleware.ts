import { defineMiddleware } from 'astro:middleware';
import { logger } from '@logger/node-logger';

export const onRequest = defineMiddleware((context, next) => {
  const startTime = performance.now();
  const { pathname } = context.url;

  // Example: set request metadata in locals
  context.locals.requestedAt = new Date().toISOString();
  context.locals.pathname = pathname;

  logger.info('middleware', `${context.request.method} ${pathname}`);

  const response = next();

  // Log request duration after response
  response.then(() => {
    const duration = (performance.now() - startTime).toFixed(2);
    logger.info('middleware', `${pathname} completed in ${duration}ms`);
  });

  return response;
});
