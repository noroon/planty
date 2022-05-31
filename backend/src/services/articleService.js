import createHttpError from 'http-errors';
import Article from '../models/articleModel';

export const articleService = {
  async getArticles() {
    const articles = await Article.find();
    return articles;
  },

  async postArticle(title, content) {
    if (!title) throw createHttpError(400, { message: 'Title is required' });
    if (!content) throw createHttpError(400, { message: 'Content is required' });

    const titleExist = await Article.findOne({ title });
    if (titleExist) throw createHttpError(400, { message: 'News title already exists' });

    const article = new Article({
      title,
      content,
      publish_date: Date.now(),
    });

    try {
      const savedArticle = await article.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedArticle._id,
          title: savedArticle.title,
          content: savedArticle.content,
          publish_date: savedArticle.publish_date,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
