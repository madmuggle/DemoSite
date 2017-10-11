const logger = require('./logger');


function getRequestIp(req) {
  if (req.headers.hasOwnProperty("x-forwarded-for"))
    return req.headers["x-forwarded-for"].split(",")[0];
  else
    return req.connection.remoteAddress;
}


async function record(ctx, next) {
  logger.info(`Handling client [${getRequestIp(ctx.req)}]...`);
  await next();
}

module.exports = record;
