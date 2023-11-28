const { getDb } = require("../db/db");

const getPublishers = async (req, res) => {
  const publishersCollection = await getDb().collection("publishers");
  const result = await publishersCollection.find().toArray();
  res.send(result);
};

const setPublisher = async (req, res) => {
  const publisherInfo = req.body;
  const publishersCollection = await getDb().collection("publishers");
  const result = await publishersCollection.insertOne(publisherInfo);
  res.send(result);
};

module.exports = { getPublishers, setPublisher };
