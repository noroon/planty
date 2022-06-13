import { requestService } from './requestService';

export const requestController = {
  async get(req, res) {
    try {
      const requests = await requestService.getRequests();
      res.status(200).json({ requests });
    } catch (err) {
      next(err);
    }
  },
  async addNew(req, res, next) {
    try {
      const { statusCode, responseObj } = await requestService.addRequest(
        req.body
      );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
