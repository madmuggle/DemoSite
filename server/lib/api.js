const { findUserByEmail, createUser } = require("./redis");
const logger = require("./logger");
const { encode, decode } = require("./encrypt");


async function handler(ctx) {
  logger.info("Request body(should be a JS object):\n", ctx.request.body);
  const { action, data } = ctx.request.body;

  logger.info(`Handling request ${action}...`);

  switch (action) {
  case "CreateUser":
    ctx.body = await handleCreateUser(data);
    break;

  case "Login":
    ctx.body = await handleLogin(data, ctx);
    break;

  case "Logout":
    ctx.body = await handleLogout(ctx);
    break;

  case "IsLoggedIn":
    ctx.body = { status: "success", data: ctx.session.isLoggedIn };
    break;

  case "GetUserInfo":
    ctx.body = { status: "success", data: ctx.session.userInfo };
    break;

  default:
    const e = { status: "fail", type: "UNKNOWN_ACTION" };
    ctx.body = e;
  }

  logger.info("The response will be:\n", ctx.body);
}


async function handleLogin(reqData, ctx) {
  const { email, password } = reqData;
  const r = await checkEmailAndPassword(email, password);

  if (r.status === "success") {
    logger.info(`User ${email} logged in successfully.`);

    ctx.session.userInfo = selectEmailAndName(await findUserByEmail(email));
    ctx.session.isLoggedIn = true;
  }

  return r;
}


function selectEmailAndName(obj) {
  return { email: obj.email, name: obj.name };
}


async function handleLogout(ctx) {
  ctx.session.isLoggedIn = false;
  return { status: "success" };
}


function normalizeName(nameStr) {
  return nameStr.trim().replace(/\s+/g, " ").toUpperCase();
}


async function handleCreateUser(reqData) {
  const name = normalizeName(reqData.name);
  const email = reqData.email.trim();
  const password = encode(reqData.password);
  const info = { email, name, password };

  if (await isUserExists(email))
    return { status: "fail", type: "REGISTERED_BEFORE" };

  await createUser(info);
  return { status: "success" };
}


async function isUserExists(email) {
  return !!(await findUserByEmail(email));
}


async function checkEmailAndPassword(email, password) {
  const user = await findUserByEmail(email);
  if (!user)
    return { status: "fail", type: "UNREGISTER" };

  if (decode(user.password) !== password)
    return { status: "fail", type: "WRONG_PASSWORD" };

  return { status: "success" };
}


module.exports = handler;

