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


function connect() {
  return new Promise((res, rej) => {
    connection.connect(err => {
      if (err) {
        logger.error('Error when connecting to Mysql: ' + err);
        rej(err);
      } else {
        logger.info('connection established.');
        res('ok');
      }
    });
  });
}

function disconnect() {
  return new Promise((res, rej) => {
    connection.end(err => {
      if (err) {
        logger.error('Error when connecting to Mysql: ' + err);
        rej(err);
      } else {
        logger.info('connection established.');
        res('ok');
      }
    });
  });
}

function executeSql(sqlString) {
  logger.info("Will executing sql expression: ", sqlString);
  return new Promise((res, rej) => {
    connection.query(sqlString, (err, result, fields) => {
      if (!err) res(result);
      else rej(err);
    });
  });
}

module.exports = {
  disconnect,
  executeSql,
};
