const { getDb } = require("../db/db");

const setArticle = async (req, res) => {
  const article = req.body;
  const articlesCollection = await getDb().collection("articles");
  const result = await articlesCollection.insertOne(article);
  res.send(result);
};

module.exports = { setArticle };
