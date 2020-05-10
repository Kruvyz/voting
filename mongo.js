const { MongoClient, ObjectId } = require("mongodb");

const url = 'mongodb://localhost:27017';
const databaseName = 'voting';
const collectionName = 'vote';

async function getVoteById(id) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findData = await collection.findOne({_id: ObjectId(id)});

  await client.close();

  return findData;
}

async function addVoteToVotes(element) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const Vote = await collection.insertOne(element);

  await client.close();

  return Vote.insertedId;
}

async function updateVoteToVotes(id, elementName, element) {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
  
    await collection.update({_id: ObjectId(id)}, { $push: { [elementName]: element}});
  
    await client.close();
}

async function updateVoteInVotes({id, ...other}) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  await collection.update({_id: ObjectId(id)}, { $set: other });

  await client.close();
}

async function getVotes() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const findAllData = await collection.find({}).toArray();

  await client.close();

  return findAllData;
}

module.exports = {
  getVoteById,
  getVotes,
  addVoteToVotes,
  updateVoteToVotes,
  updateVoteInVotes
}