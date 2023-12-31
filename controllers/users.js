const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  const usersCollection = await getDb().collection("users");
  const result = await usersCollection.find().toArray();
  res.send(result);
};

const getUser = async (req, res) => {
  const filter = req.query;
  if (filter?.email !== req.decoded?.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const query = { email: filter?.email };
  const usersCollection = await getDb().collection("users");
  const result = await usersCollection.findOne(query);
  res.send(result);
};

const updateUser = async (req, res) => {
  const user = req.query;
  if (user?.email !== req.decoded?.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  const query = { email: user?.email };
  const usersCollection = await getDb().collection("users");
  let update;
  if (user?.name || user?.img) {
    update = {
      $set: {
        name: user?.name,
        img: user?.img,
      },
    };
  }
  if (user?.token) {
    update = {
      $set: {
        subscription: true,
        token: user.token,
      },
    };
  }
  const result = await usersCollection.updateOne(query, update);
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

const updateUserByAdmin = async (req, res) => {
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

module.exports = { getUsers, getUser, setUser, updateUserByAdmin, updateUser };
