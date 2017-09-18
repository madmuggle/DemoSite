const redis = require("redis");

const client = redis.createClient();

client.on("error", err => console.log(`Error ${err}`));

function hgetallPromise(key) {
  return new Promise((res, rej) => {
    client.hgetall(key, (e, r) => e ? rej(e) : res(r));
  });
}

function hmsetPromise(key, obj) {
  return new Promise((res, rej) => {
    client.hmset(key, obj, (e, r) => e ? rej(e) : res(r));
  });
}

async function findUserByEmail(email) {
  const r = await hgetallPromise(`user_${email}`);
  if (r)
    return Object.assign(r, { email });
  else
    return null;
}

async function createUser(userInfo) {
  const { email, name, password } = userInfo;
  return await hmsetPromise(`user_${email}`, { name, password });
}

module.exports = {
  findUserByEmail,
  createUser,
};

