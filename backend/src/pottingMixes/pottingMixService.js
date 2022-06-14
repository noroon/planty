import createHttpError from 'http-errors';
import PottingMix from './pottingMixModel';

export const pottingMixService = {
  async getPottingMixes() {
    try {
      const pottingMix = await PottingMix.find();
      return pottingMix;
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
  async getPottingMixById(id) {
    try {
      const pottingMixById = await PottingMix.findById({ _id: id });
      return pottingMixById;
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
  async addPottingMix(reqBody) {
    const { name, ingredients, description } = reqBody;

    const pottingMix = new PottingMix({
      name,
      ingredients,
      description,
    });

    try {
      const savedPottingMix = await pottingMix.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedPottingMix._id,
          name: savedPottingMix.name,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
