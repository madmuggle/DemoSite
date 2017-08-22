const logger = require('../logger');
const { createUser } = require('./users');

async function handler(ctx) {
  const req = ctx.request.body;
  logger.info('requrest.body:', req);

  ctx.set('Content-Type', 'application/json');

  switch (req.action) {
  case 'CreateUser':
    logger.info('Handling request CreateUser...');
    ctx.body = await createUser(req.data);
    break;
  default:
    logger.warn(`Invalid request: { "action": ${req.action}, ... }`);
    ctx.body = `{"error": "UnknownAction[${req.action}]"}`;
  }
}

module.exports = handler;

