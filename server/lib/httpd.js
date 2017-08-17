const session = require('koa-session');
const bodyparser = require('koa-bodyparser');
const route = require('koa-route');
const Koa = require('koa');

const logger = require('./logger');
const time = require('./time');
const record = require('./record');
const cors = require('./cors');
const services = require('./services');

const app = new Koa();
const PORT = 8000;

const sessionConfig = {
  key: 'SESSIONID',
  maxAge: 1000 * 60,
  overwrite: true,
  httpOnly: true,
  signed: true,
};

app.keys = ['my secret key'];

app.use(time);
app.use(record);
app.use(session(sessionConfig, app));
app.use(cors);
app.use(bodyparser());
app.use(route.post('/services', services));

app.on('error', err => {
  logger.error(err);
});

logger.info(`Listening on port ${PORT}...`);
app.listen(PORT);
