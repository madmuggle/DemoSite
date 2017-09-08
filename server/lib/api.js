const { insertDocuments, updateDocument, deleteDocument, findDocuments }
  = require("./mongodb");
const logger = require("./logger");


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


function fetchSafeUserInfo(userInfo) {
  const { email, name } = userInfo;
  return { email, name };
}

async function handleLogin(reqData, ctx) {
  const { email, password } = reqData;
  const r = await checkEmailAndPassword(email, password);

  if (r.status === "success") {
    logger.info(`User ${email} logged in successfully.`);
    ctx.session.userInfo = fetchSafeUserInfo(await getFullUserInfo(email));
    ctx.session.isLoggedIn = true;
  }

  return r;
}

async function handleLogout(ctx) {
  ctx.session.isLoggedIn = false;
  return { status: "success" };
}

async function handleCreateUser(reqData) {
  const { email, name, password } = reqData;
  const info = { email: email.trim(), name: name.trim(), password };

  if (await isUserExists(email))
    return { status: "fail", type: "REGISTERED_BEFORE" };

  await insertDocuments(global.mongoConn, "users", [ info ]);
  return { status: "success" };
}


async function getFullUserInfo(email) {
  return (await findDocuments(global.mongoConn, "users", { email }))[0];
}

async function isUserExists(email) {
  return !!(await getFullUserInfo(email));
}


async function checkEmailAndPassword(email, password) {
  const user = await getFullUserInfo(email);
  if (!user)
    return { status: "fail", type: "UNREGISTER" };

  if (user.password !== password)
    return { status: "fail", type: "WRONG_PASSWORD" };

  return { status: "success" };
}


module.exports = handler;

