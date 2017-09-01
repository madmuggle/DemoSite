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
    ctx.body = await handleLogin(data);
    break;

  default:
    const e = { status: "fail", type: "UNKNOWN_ACTION" };
    ctx.body = e;
  }

  logger.info("The Response will be:\n", ctx.body);
}


async function handleLogin(reqData) {
  const { email, password } = reqData;
  return await checkEmailAndPassword(email, password);
}

async function handleCreateUser(reqData) {
  const { email, name, password } = reqData;
  const info = { email, name, password };
  if (await isUserExists(email))
    return { status: "fail", type: "REGISTERED_BEFORE" };

  await insertDocuments(global.mongoConn, "users", [ info ]);
  return { status: "success" };
}


async function isUserExists(email) {
  const r = await findDocuments(global.mongoConn, "users", { email });
  return (r.length !== 0);
}


async function checkEmailAndPassword(email, password) {
  const r = await findDocuments(global.mongoConn, "users", { email });
  if (r.length === 0)
    return { status: "fail", type: "UNREGISTER" };

  const user = r[0];
  if (user.password !== password)
    return { status: "fail", type: "WRONG_PASSWORD" };

  return { status: "success" };
}


module.exports = handler;

