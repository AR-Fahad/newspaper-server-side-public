const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  if (!req.headers?.authorization) {
    return res.status(401).send({ message: "unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyToken };
