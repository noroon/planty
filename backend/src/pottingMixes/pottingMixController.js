import { pottingMixService } from './pottingMixService';

export const pottingMixController = {
  async get(req, res, next) {
    try {
      const pottingMixes = await pottingMixService.getPottingMixes();
      res.status(200).json({ pottingMixes });
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const pottingMixById = await pottingMixService.getPottingMixById(id);
      res.status(200).json({ pottingMixById });
    } catch (err) {
      next(err);
    }
  },
  async addNew(req, res, next) {
    try {
      const { statusCode, responseObj } = await pottingMixService.addPottingMix(
        req.body,
      );
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
