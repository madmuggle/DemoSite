const logger = require('./logger');

async function record(ctx, next) {
  logger.info(`Handling ${ctx.method} request to ${ctx.href} ...`);
  await next();
}

module.exports = record;
