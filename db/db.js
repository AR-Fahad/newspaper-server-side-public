require("dotenv").config();
const { MongoClient } = require("mongodb");
let db;
const connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB_URI);
  await client.connect();
  db = client.db("newsDB");
};

const getDb = () => {
  return db;
};

module.exports = { connectToDatabase, getDb };
