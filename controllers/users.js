const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getUsers = async (req, res) => {
  const usersCollection = await getDb().collection("users");
  const result = await usersCollection.find().toArray();
  res.send(result);
};

const setUser = async (req, res) => {
  const user = req.body;
  const usersCollection = await getDb().collection("users");
  const query = { email: user?.email };
  const find = await usersCollection.findOne(query);
  if (find) {
    return res.send({ message: "user already exist", insertedId: null });
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const query = { _id: new ObjectId(userId) };
  const updateUser = {
    $set: {
      role: "admin",
    },
  };
  const usersCollection = await getDb().collection("users");
  const result = await usersCollection.updateOne(query, updateUser);
  res.send(result);
};

module.exports = { getUsers, setUser, updateUser };
