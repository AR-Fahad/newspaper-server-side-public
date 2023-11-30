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
  getMyArticlesByUser,
  getPremiumArticles,
} = require("../controllers/articles");
const { setPublisher, getPublishers } = require("../controllers/publishers");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");
const {
  verifyPremiumUser,
  verifyPremiumToken,
} = require("../middlewares/verifyPremiumUser");

const router = express.Router();

// users collection
router.get("/users", verifyToken, verifyAdmin, getUsers); // admin
router.get("/userDetails", verifyToken, getUser); // user
router.post("/users", setUser); // user
router.patch("/users", verifyToken, updateUser); // user
router.patch("/users/:id", verifyToken, verifyAdmin, updateUserByAdmin); // admin

// articles collection
router.get("/articles", getArticles); // user
router.get("/user/articles", verifyToken, getMyArticlesByUser); // user
router.get("/articles/:id", verifyToken, getArticle); // user
router.get(
  "/premium/articles",
  verifyToken,
  verifyPremiumToken,
  getPremiumArticles
); // subscriber user
router.get("/admin/articles", verifyToken, verifyAdmin, getArticlesByAdmin); // admin
router.post("/articles", verifyToken, setArticle); // user
router.patch("/articles/:id", verifyToken, updateArticle); // user
router.patch(
  "/admin/articles/:id",
  verifyToken,
  verifyAdmin,
  updateArticleByAdmin
); // admin
router.delete("/articles/:id", verifyToken, deleteArticle); // user

// publishers collection
router.get("/publishers", getPublishers);
router.post("/publishers", verifyToken, verifyAdmin, setPublisher); // admin

module.exports = { router };
