const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { router } = require("./routes/routes");
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    app.post("/makeSubscription", async (req, res) => {
      const filter = req.body;
      const token = jwt.sign(filter?.user, process.env.PREMIUM_ACCESS, {
        expiresIn: filter?.period,
      });
      res.send({ token });
    });

    app.use("/", router);

    app.get("/", (req, res) => {
      res.send("NEWSPAPER is ready for reading");
    });

    app.listen(port, () => {
      console.log("Server is running successfully on port", port);
    });
  })
  .catch((error) => console.log(error));
