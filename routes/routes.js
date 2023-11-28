const express = require("express");
const { setUser, getUsers, updateUser } = require("../controllers/users");
const {
  setArticle,
  getArticlesByAdmin,
  updateArticleByAdmin,
  deleteArticle,
} = require("../controllers/articles");
const { setPublisher, getPublishers } = require("../controllers/publishers");

const router = express.Router();

// users collection
router.get("/users", getUsers);
router.post("/users", setUser);
router.patch("/users/:id", updateUser);

// article collection
router.get("/admin/articles", getArticlesByAdmin);
router.post("/articles", setArticle);
router.patch("/admin/articles/:id", updateArticleByAdmin);
router.delete("/articles/:id", deleteArticle);

// publishers collection
router.get("/publishers", getPublishers);
router.post("/publishers", setPublisher);

module.exports = { router };
