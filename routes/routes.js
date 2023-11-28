const express = require("express");
const { setUser, getUsers, updateUser } = require("../controllers/users");
const {
  setArticle,
  getArticlesByAdmin,
  updateArticleByAdmin,
  deleteArticle,
} = require("../controllers/articles");

const router = express.Router();

// users CRUD
router.get("/users", getUsers);
router.post("/users", setUser);
router.patch("/users/:id", updateUser);

// article CRUD
router.get("/admin/articles", getArticlesByAdmin);
router.post("/articles", setArticle);
router.patch("/admin/articles/:id", updateArticleByAdmin);
router.delete("/articles/:id", deleteArticle);

module.exports = { router };
