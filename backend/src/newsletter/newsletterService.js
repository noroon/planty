import createHttpError from 'http-errors';
import NewsletterSubscriber from './newsletterModel';

export const newsletterService = {
  async addSubscriber(reqBody) {
    const { email } = reqBody;

    if (!email) {
      throw createHttpError(400, {
        message: 'Kérlek, add meg az email-címed!',
      });
    }

    const emailExist = await NewsletterSubscriber.findOne({ email });
    if (emailExist) {
      throw createHttpError(400, {
        message: 'Már feliratkoztál a hírlevelünkre',
      });
    }

    const subscriber = new NewsletterSubscriber({ email });

    try {
      const savedRequest = await subscriber.save();

      return {
        statusCode: 200,
        responseObj: {
          id: savedRequest._id,
          email: savedRequest.email,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err.message });
    }
  },
};
