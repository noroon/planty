import { plantService } from './plantService';

export const plantController = {
  async get(req, res) {
    try {
      const plants = await plantService.getPlants();

      res.status(200).json({ plants });
    } catch (err) {
      console.log('vmi');
      next(err);
    }
  },
  async addNew(req, res, next) {
    const {
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
    } = req.body;

    try {
      const { statusCode, responseObj } = await plantService.addPlant(
        name,
        moisture,
        water,
        light,
        petfriendly,
        edible,
        easyToCare,
        care
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
