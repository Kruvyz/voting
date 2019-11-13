const {MongoClient, ObjectId} = require("mongodb");

const url = 'mongodb://localhost:27017';
const databaseName = 'voting';
const collectionName = 'results';

async function getResultsById(id) {
  const client = await MongoClient.connect(url, {useNewUrlParser: true});

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findData = await collection.findOne({_id: ObjectId(id)});

  await client.close();

  return findData;
}

async function addResultToResults(element) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  await collection.insertOne(element);

  await client.close();
}

async function getResults() {
  const client = await MongoClient.connect(url, {useNewUrlParser: true});

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findAllData = await collection.find({}).toArray();

  await client.close();

  return findAllData;
}

module.exports = {
  getResultsById,
  getResults,
  addResultToResults
}