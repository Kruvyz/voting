const { MongoClient, ObjectId } = require("mongodb");

const url = 'mongodb+srv://Admin:od8rE8jlOPk4hRBd@cluster0.8ywih.mongodb.net/voting?retryWrites=true&w=majority';
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

async function addUser(element) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection('users');

  const user = await collection.insertOne(element);

  await client.close();

  return user.insertedId;
}

async function checkUser(user) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection('users');

  const findUser = await collection.findOne({login: user.login});

  await client.close();

  if (findUser && findUser.password === user.password) return findUser._id;
  else return false;
}

async function verifyUser(login) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection('users');

  const findUser = await collection.findOne({login});

  await client.close();

  if (findUser) return true;
  else return false;
}

async function getUserLoginById(id) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection('users');

  const findData = await collection.findOne({_id: ObjectId(id)});

  await client.close();

  return findData.login;
}

async function deleteExpertise(id) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  const result = await collection.deleteOne({_id: ObjectId(id)});

  await client.close();

  return result;
}

module.exports = {
  getVoteById,
  getVotes,
  addVoteToVotes,
  updateVoteToVotes,
  updateVoteInVotes,
  addUser,
  checkUser,
  verifyUser,
  getUserLoginById,
  deleteExpertise
}