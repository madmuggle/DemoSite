const logger = require('../logger');

async function handler(ctx) {
  const req = ctx.request.body;
  logger.info('requrest.body:', req);

  ctx.set('Content-Type', 'application/json');

  switch (req.action) {
  case 'CreateUser':
    ctx.body = '{"handled": "OK"}';
    break;
  default:
    logger.warn(`Invalid request: { "action": ${req.action}, ... }`);
    ctx.body = `{"error": "Unknown action: ${req.action}}"`;
  }
}

module.exports = handler;

