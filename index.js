const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/db");
const { router } = require("./routes/routes");
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.use("/", router);

    app.get("/", (req, res) => {
      res.send("NEWSPAPER is ready for reading");
    });

    app.listen(port, () => {
      console.log("Server is running successfully on port", port);
    });
  })
  .catch((error) => console.log(error));
