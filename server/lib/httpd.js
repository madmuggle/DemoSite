const session = require("koa-session");
const bodyparser = require("koa-bodyparser");
const route = require("koa-route");
const Koa = require("koa");

const { connectToMongo } = require("./mongodb");
const { actionFilter } = require("./auth");
const logger = require("./logger");
const time = require("./time");
const record = require("./record");
const cors = require("./cors");
const api = require("./api");


const app = new Koa();
const PORT = 8000;

const sessionConfig = {
  key: 'SESSIONID',
  maxAge: 1000 * 60 * 60,
  overwrite: true,
  httpOnly: true,
  signed: true,
};

// Connect to mongodb and store the connection to global.
connectToMongo()
.then(connection => {
  logger.info(`Succeed connecting MongoDB "${process.env.MONGODB_URI}"`);
  global.mongoConn = connection;
})
.catch(logger.error);


app.keys = [ "Wallace", "Gibbon" ];

app.use(time);
app.use(session(sessionConfig, app));
app.use(record);
app.use(cors);
app.use(bodyparser());
app.use(actionFilter);
app.use(route.post('/api', api));
app.use(ctx => ctx.set('Content-Type', 'application/json'));

app.on('error', err => logger.error(err));


logger.info(`Listening on port ${PORT}...`);
app.listen(PORT);

