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
  password: '123456',
  database: 'blahdb',
});


connection.connect(err => {
  if (err) {
    logger.error('Error when connecting to Mysql: ' + err);
    process.exit(1);
  }
  logger.info('connection established.');
});

connection.query('select * from users', (err, result, fields) => {
  if (err)
    throw err;
  logger.info('users: ', result);
});

// close the connection
//connection.end(err => {
//});

