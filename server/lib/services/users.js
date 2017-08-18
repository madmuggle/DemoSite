const db = require('../db');
const logger = require('../logger');
const { mkInsertString, mkTimeString } = require('./dbutils');


async function createUser(data) {
  data.registertime = mkTimeString(new Date());
  const { fields, values } = mkInsertString(data);
  const sqlStr = `INSERT INTO users(${fields}) VALUES(${values})`;
  try {
    await db.executeSql(sqlStr);
    return { status: "success", };
  } catch (e) {
    logger.error("SQL error: ", e.code);
    return { status: "failed" };
  }
}


module.exports = {
  createUser,
};

