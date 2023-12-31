const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getArticles = async (req, res) => {
  const filter = req.query;
  const articlesCollection = await getDb().collection("articles");
  let query = { status: "approved" };
  if (filter?.search) {
    query.title = { $regex: filter.search, $options: "i" };
  }
  if (filter?.publisher) {
    query.publisher = filter.publisher;
  }
  if (filter?.tags) {
    query.tags = filter.tags;
  }
  const result = await articlesCollection.find(query).toArray();
  res.send(result);
};

const getMyArticlesByUser = async (req, res) => {
  const filter = req.query;
  const articlesCollection = await getDb().collection("articles");
  if (filter?.email !== req.decoded?.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  if (filter?.email) {
    const query = { author_email: filter.email };
    const result = await articlesCollection.find(query).toArray();
    return res.send(result);
  }
  return res.status(403).send({ message: "forbidden" });
};

const getPremiumArticles = async (req, res) => {
  const query = { status: "approved", isPremium: true };
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.find(query).toArray();
  res.send(result);
};

const getArticle = async (req, res) => {
  const articleId = req.params.id;
  const query = { _id: new ObjectId(articleId) };
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.findOne(query);
  res.send(result);
};

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

const updateArticle = async (req, res) => {
  const updatedArticle = req.body;
  const articleId = req.params.id;
  const query = { _id: new ObjectId(articleId) };
  const articlesCollection = await getDb().collection("articles");
  let update = {};
  if (updatedArticle?.views) {
    update = {
      $set: {
        views: updatedArticle?.views,
      },
    };
  }

  if (updatedArticle?.title || updatedArticle?.description) {
    update = {
      $set: {
        title: updatedArticle?.title,
        description: updatedArticle?.description,
      },
    };
  }

  const result = await articlesCollection.updateOne(query, update);
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
  getArticles,
  getArticle,
  getPremiumArticles,
  getMyArticlesByUser,
  setArticle,
  getArticlesByAdmin,
  updateArticle,
  updateArticleByAdmin,
  deleteArticle,
};
