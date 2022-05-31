import { articleService } from '../services';

export const articleController = {
  async get(req, res) {
    const articles = await articleService.getArticles();

    res.status(200).json({ articles });
  },
  async addNew(req, res, next) {
    const { title, content } = req.body;

    try {
      const { statusCode, responseObj } = await articleService.postArticle(
        title,
        content,
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
