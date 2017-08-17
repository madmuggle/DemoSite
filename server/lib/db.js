const mysql = require('mysql');
const logger = require('./logger');

/**
 * Some basic sql operations(CRUD) examples:
 *  INSERT INTO users(fullname, age) VALUES("Harry Potter", 12);
 *  DELETE FROM users WHERE name="Harry Potter";
 *  UPDATE USERS SET age=13 WHERE fullname="Harry Potter";
 *  SELECT givenname FROM users WHERE age=13;
 */


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asdf',
  database: 'blahdb',
});


function executeSql(sqlString) {
  logger.info("Will executing sql expression: ", sqlString);
  return new Promise((res, rej) => {
    connection.query(sqlString, (e, d, _fields) => e ? rej(e) : res(d));
  });
}

function connect() {
  return new Promise((res, rej) => {
    connection.connect(e => e ? rej(e) : res('Mysql connect ok.'));
  });
}

function disconnect() {
  return new Promise((res, rej) => {
    connection.end(e => e ? rej(e) : res('Mysql disconnect ok.'));
  });
}

// Start the connection directly
connect().then(logger.info).catch(logger.error);


module.exports = {
  disconnect,
  executeSql,
};
