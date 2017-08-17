const db = require('../db');
const logger = require('../logger');
const { mkInsertString, mkTimeString } = require('./dbutils');


async function handle(req) {
  req.data.registertime = mkTimeString(new Date());
  const { fields, values } = mkInsertString(req.data);
  const sqlStr = `INSERT INTO users(${fields}) VALUES(${values})`;
  await db.executeSql(sqlStr);
  return {
    status: "success",
  };
}


module.exports = handle;

