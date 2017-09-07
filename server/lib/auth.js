const logger = require("./logger");


const VALID_PUBLIC_ACTIONS = [ "CreateUser", "Login", "Logout", "IsLoggedIn" ];

async function actionFilter(ctx, next) {
  const { action } = ctx.request.body;
  if (VALID_PUBLIC_ACTIONS.indexOf(action) === -1 && !ctx.session.isLoggedIn) {
    logger.warn(`User not logged in, action ${action} will not be handled`);
    ctx.status = 403;
    ctx.message = "Login first";
    return;
  }
  await next();
}

module.exports = {
  actionFilter,
};
