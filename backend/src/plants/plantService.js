import createHttpError from 'http-errors';
import Plant from './plantModel';

export const plantService = {
  async getPlants() {
    try {
      const plants = await Plant.find();
      return plants;
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
  async getPlantById(id) {
    try {
      const plantById = await Plant.findById({ _id: id });
      return plantById;
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
  async addPlant(reqBody, imageKey) {
    const {
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
    } = reqBody;

    if (!name) {
      throw createHttpError(400, { message: 'Kérlek, adj nevet a növénynek!' });
    }

    const nameExist = await Plant.findOne({ name });
    if (nameExist) {
      throw createHttpError(400, {
        message: 'Ez a növény már megtalálható nálunk :)',
      });
    }

    const plant = new Plant({
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
      imageKey,
    });

    try {
      const savedPlant = await plant.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedPlant._id,
          name: savedPlant.name,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
