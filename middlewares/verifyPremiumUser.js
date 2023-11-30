const { getDb } = require("../db/db");
const jwt = require("jsonwebtoken");

const verifyPremiumToken = async (req, res, next) => {
  const email = req.decoded?.email;
  const query = { email: email };
  const usersCollection = await getDb().collection("users");
  const user = await usersCollection.findOne(query);
  const token = user?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.PREMIUM_ACCESS, (err, decoded) => {
    if (err) {
      const update = {
        $set: {
          subscription: false,
          token: null,
        },
      };
      const result = usersCollection.updateOne(query, update);
      return res.status(401).send(result);
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyPremiumToken };
