const { getDb } = require("../db/db");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded?.email;
  const query = { email: email };
  const usersCollection = await getDb().collection("users");
  const user = await usersCollection.findOne(query);
  if (user?.role !== "admin") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = { verifyAdmin };
