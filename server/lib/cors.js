const logger = require('./logger');

const HOMEPAGE = 'http://madmuggle.me';

/**
 * Check whether the argument is an address of a local machine. Convenient for
 * development.
 */
function isLocalOrigin(originStr) {
  if (originStr)
    return /(localhost)|(192\.168\.)|(127\.0\.0\.1)/.test(originStr);
  else
    logger.error('Origin is not found in HTTP header');
}

/**
 * OPTIONS request need response with header 'Access-Control-Allow-Methods'.
 * The 'Access-Control-Max-Age' is optional, but it can avoid unnecessary
 * OPTIONS request.
 *
 * And OPTIONS request have an empty body.
 */
function handleOPTIONS(ctx) {
  ctx.set('Access-Control-Allow-Methods', 'HEAD, GET, POST');
  ctx.set('Access-Control-Max-Age', 24 * 60 * 60);
  ctx.body = '';
}

/**
 * This function is a Koajs middleware, and `app.use(cors)` is the right way
 * to use it.
 */
async function cors(ctx, next) {
  /* Allow CORS request from any client for development environment. */
  if (!isLocalOrigin(ctx.request.origin))
    ctx.set('Access-Control-Allow-Origin', HOMEPAGE);
  else
    ctx.set('Access-Control-Allow-Origin', '*');

  /* When CORS request with a 'Access-Control-Request-Headers' header,
   * you need to give back a 'Access-Control-Allow-Headers'
   */
  if (ctx.headers['access-control-request-headers'])
    ctx.set('Access-Control-Allow-Headers', 'content-type');

  if (ctx.method === 'OPTIONS')
    handleOPTIONS(ctx);
  else
    await next();
}

module.exports = cors;
