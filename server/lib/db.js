const mysql = require('mysql');
const logger = require('./logger');

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

