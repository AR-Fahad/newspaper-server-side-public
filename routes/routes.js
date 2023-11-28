const express = require("express");
const { setUser, getUsers } = require("../controllers/users");
const { setArticle } = require("../controllers/articles");

const router = express.Router();

// users CRUD
router.get("/users", getUsers);
router.post("/users", setUser);

// article CRUD
router.post("/articles", setArticle);

module.exports = { router };
