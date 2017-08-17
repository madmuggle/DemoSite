const logger = require('../logger');
const createuser = require('./createuser');

async function handler(ctx) {
  const req = ctx.request.body;
  logger.info('requrest.body:', req);

  ctx.set('Content-Type', 'application/json');

  switch (req.action) {
  case 'CreateUser':
    logger.info('Handling request CreateUser...');
    ctx.body = await createuser(req);
    break;
  default:
    logger.warn(`Invalid request: { "action": ${req.action}, ... }`);
    ctx.body = `{"error": "Unknown action: ${req.action}}"`;
  }
}

module.exports = handler;

