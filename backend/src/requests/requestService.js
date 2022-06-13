import createHttpError from 'http-errors';
import PlantRequest from './requestModel';

export const requestService = {
  async getRequests() {
    try {
      const requests = await PlantRequest.find();
      return requests;
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
  async addRequest(reqBody) {
    const { name } = reqBody;

    if (!name) {
      throw createHttpError(400, { message: 'Kérlek, adj nevet a növénynek!' });
    }

    const nameExist = await PlantRequest.findOne({ name });
    if (nameExist)
      throw createHttpError(400, {
        message:
          'Ezt a növényt már elültettük a kérések közé, hamarosan feltöltjük',
      });

    const request = new PlantRequest({ name });

    try {
      const savedRequest = await request.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedRequest._id,
          name: savedRequest.name,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
