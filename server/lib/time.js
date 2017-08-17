/**
 * Calculate the time the following middleware takes. This middleware should be
 * used as the first middleware
 */
async function time(ctx, next) {
  const start = new Date();
  await next();
  ctx.set('X-Response-Time', `${new Date() - start}ms`);
}

module.exports = time;

