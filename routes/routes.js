const express = require("express");
const { setUser } = require("../controllers/users");
const { setArticle } = require("../controllers/articles");

const router = express.Router();

// users CRUD
router.post("/users", setUser);

// article CRUD
router.post("/articles", setArticle);

module.exports = { router };
