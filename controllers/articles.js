const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getArticlesByAdmin = async (req, res) => {
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.find().toArray();
  res.send(result);
};

const setArticle = async (req, res) => {
  const article = req.body;
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.insertOne(article);
  res.send(result);
};

const updateArticleByAdmin = async (req, res) => {
  const articleId = req.params.id;
  const updateArticle = req.body;
  const articlesCollection = await getDb().collection("articles");
  const query = { _id: new ObjectId(articleId) };
  let update = {};
  let result;
  if (updateArticle?.status) {
    update = {
      $set: {
        status: updateArticle.status,
        reasons: updateArticle.reasons,
        views: 0,
      },
    };
    result = await articlesCollection.updateOne(query, update);
    return res.send(result);
  }

  update = {
    $set: {
      isPremium: true,
    },
  };
  result = await articlesCollection.updateOne(query, update);
  return res.send(result);
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  const query = { _id: new ObjectId(articleId) };
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  setArticle,
  getArticlesByAdmin,
  updateArticleByAdmin,
  deleteArticle,
};
