const { MongoClient, ObjectId } = require("mongodb");

const url = 'mongodb://localhost:27017';
const databaseName = 'voting';
const collectionName = 'results';

async function getResultsById(id, elementName) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findData = await collection.findOne({_id: ObjectId(id)});

  await client.close();

  return findData[elementName];
}

async function addResultToResults(element) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const result = await collection.insertOne(element);

  await client.close();

  return result.insertedId;
}

async function updateResultToResults(id, elementName, element) {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
  
    await collection.update({_id: ObjectId(id)}, { $push: { [elementName]: element}});
  
    await client.close();
}

async function getResults() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findAllData = await collection.find({}).toArray();

  await client.close();

  return findAllData;
}

module.exports = {
  getResultsById,
  getResults,
  addResultToResults,
  updateResultToResults
}