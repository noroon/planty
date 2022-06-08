import createHttpError from 'http-errors';
import Plant from './plantModel';

export const plantService = {
  async getPlants() {
    const plants = await Plant.find();
    return plants;
  },

  async addPlant(
    name,
    moisture,
    water,
    light,
    petfriendly,
    edible,
    easyToCare,
    care
  ) {
    if (!name)
      throw createHttpError(400, { message: 'Kérlek, adj nevet a növénynek!' });

    const nameExist = await Plant.findOne({ name });
    if (nameExist)
      throw createHttpError(400, {
        message: 'Ez a növény már megtalálható nálunk :)',
      });

    const plant = new Plant({
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
    });

    try {
      const savedPlant = await plant.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedPlant._id,
          name: savedPlant.name,
          // care: savedPlant.care,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
