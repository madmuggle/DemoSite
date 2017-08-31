const MongoClient = require('mongodb').MongoClient;

/**
 * Error code for basic MongoDB CRUD operations (Insert, Update, Delete)
 */
const INSERT_N_UNMATCH = 1;
const UPDATEONE_N_UNMATCH = 2;
const DELETEONE_N_UNMATCH = 3;


function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error('Env-variable "MONGODB_URI" should be defined first');

  return new Promise((res, rej) => {
    MongoClient.connect(uri, (e, cli) => e ? rej(e) : res(cli));
  });
}

function DBError(errcode) {
  switch (errcode) {
  case INSERT_N_UNMATCH:
    throw new Error('insertMany: r.result.n unmatch');
  case UPDATEONE_N_UNMATCH:
    throw new Error('updateOne: r.result.n unmatch');
  case DELETEONE_N_UNMATCH:
    throw new Error('deleteOne: r.result.n unmatch');
  }
}

function handleDBResult(e, result, len, errcode, resolve, reject) {
  if (e) return reject(e);

  if (result.result.n != len) reject(DBError(errcode));
  else resolve(result.result);
}

function handleInsert(len, res, rej) {
  return ((e, r) => handleDBResult(e, r, len, INSERT_N_UNMATCH, res, rej));
}

function handleUpdate(res, rej) {
  return ((e, r) => handleDBResult(e, r, 1, UPDATEONE_N_UNMATCH, res, rej));
}

function handleDelete(res, rej) {
  return ((e, r) => handleDBResult(e, r, 1, DELETEONE_N_UNMATCH, res, rej));
}

function insertDocuments(cli, collectionName, docs) {
  return new Promise((res, rej) => {
    var col = cli.collection(collectionName);
    col.insertMany(docs, handleInsert(docs.length, res, rej));
  });
}

function updateDocument(cli, collectionName, query, updateCmd) {
  return new Promise((res, rej) => {
    var col = cli.collection(collectionName);
    col.updateOne(query, updateCmd, handleUpdate(res, rej));
  });
}

function deleteDocument(cli, collectionName, query) {
  return new Promise((res, rej) => {
    var col = cli.collection(collectionName);
    col.deleteOne(query, handleDelete(res, rej));
  });
}

function findDocuments(cli, collectionName, query) {
  return new Promise((res, rej) => {
    var col = cli.collection(collectionName);
    col.find(query).toArray((e, r) => e ? rej(e) : res(r));
  });
}

function countDocuments(cli, collectionName, query) {
  return new Promise((res, rej) => {
    var col = cli.collection(collectionName);
    col.count(query, (e, r) => e ? rej(e) : res(r));
  });
}


module.exports = {
  connectToMongo,
  insertDocuments,
  updateDocument,
  deleteDocument,
  findDocuments,
  countDocuments,
};
