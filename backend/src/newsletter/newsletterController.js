import { newsletterService } from './newsletterService';

export const newsletterController = {
  async addNew(req, res, next) {
    try {
      const { statusCode, responseObj } = await newsletterService.addSubscriber(
        req.body
      );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
