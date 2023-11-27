const { getDb } = require("../db/db");

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

module.exports = { setUser };
