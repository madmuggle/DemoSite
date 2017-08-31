const logger = require('./logger');
//const { createUser } = require('./users');
const { insertDocuments, updateDocument, deleteDocument, findDocuments, }
  = require('./mongodb');


async function handler(ctx) {
  logger.info("Request body:", ctx.request.body);
  const { action, data } = ctx.request.body;

  switch (action) {
  case 'CreateUser':
    logger.info('Handling request CreateUser...');
    try {
      ctx.body = await createUser(data);
    } catch (e) {
      ctx.body = { status: "error", info: e.message };
    }
    break;
  default:
    const eInfo = {error: 'UnknownAction "${action}"'};
    logger.warn(eInfo);
    ctx.body = eInfo;
  }
}

async function createUser(userData) {
  const { email, name, password } = userData;
  const info = { email, name, password };
  if (await isUserExists(email))
    throw new Error(`email ${email} has already been registered.`);

  await insertDocuments(global.mongoConn, "users", [info]);
  return { status: "ok" };
}

async function isUserExists(email) {
  const r = await findDocuments(global.mongoConn, "users", { email });
  return (r.length !== 0);
}

module.exports = handler;

