const express = require("express");
const { setUser } = require("../controllers/users");

const router = express.Router();

// users CRUD
router.post("/users", setUser);

module.exports = { router };
