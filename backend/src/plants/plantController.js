import { plantService } from './plantService';

const fs = require('fs');
const util = require('util');

const unlinkFile = util.promisify(fs.unlink);

const { uploadFile } = require('../utils/s3');

export const plantController = {
  async get(req, res, next) {
    try {
      const plants = await plantService.getPlants();
      res.status(200).json({ plants });
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const plantById = await plantService.getPlantById(id);
      res.status(200).json({ plantById });
    } catch (err) {
      next(err);
    }
  },
  async addNew(req, res, next) {
    const { file } = req;
    try {
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      const imageKey = result.Key;

      const { statusCode, responseObj } = await plantService.addPlant(
        req.body,
        imageKey,
      );

      res.send({ imagePath: `images/${imageKey}` });
      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
