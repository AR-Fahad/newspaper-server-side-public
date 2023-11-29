const express = require("express");
const {
  setUser,
  getUsers,
  updateUser,
  updateUserByAdmin,
  getUser,
} = require("../controllers/users");
const {
  setArticle,
  getArticlesByAdmin,
  updateArticleByAdmin,
  deleteArticle,
  getArticles,
  getArticle,
  updateArticle,
} = require("../controllers/articles");
const { setPublisher, getPublishers } = require("../controllers/publishers");

const router = express.Router();

// users collection
router.get("/users", getUsers); // admin
router.get("/userDetails", getUser); // user
router.post("/users", setUser); // user
router.patch("/users", updateUser); // user
router.patch("/users/:id", updateUserByAdmin); // admin

// articles collection
router.get("/articles", getArticles); // user
router.get("/articles/:id", getArticle); // user
router.get("/admin/articles", getArticlesByAdmin); // admin
router.post("/articles", setArticle); // user
router.patch("/articles/:id", updateArticle); // user
router.patch("/admin/articles/:id", updateArticleByAdmin); // admin
router.delete("/articles/:id", deleteArticle); // user

// publishers collection
router.get("/publishers", getPublishers);
router.post("/publishers", setPublisher); // admin

module.exports = { router };
