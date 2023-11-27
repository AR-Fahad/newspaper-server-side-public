const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NEWSPAPER is ready for reading");
});

app.listen(port, () => {
  console.log("Server is running successfully");
});
