import logger from '../logger';
import initDBConnection from './mongoDBConnect';
import mongoose from 'mongoose';

import users from './users';
import User from '../users/userModel';
import plants from './plants';
import Plant from '../plants/plantModel';
import pottingMixes from './pottingMixes';
import PottingMix from '../pottingMixes/pottingMixModel';
import requests from './requests';
import Request from '../requests/requestModel';
import subscribers from './subscribers';
import NewsletterSubscriber from '../newsletter/newsletterModel';

const loadData = async () => {
  await initDBConnection();
  await User.deleteMany();
  await Plant.deleteMany();
  await PottingMix.deleteMany();
  await Request.deleteMany();
  await NewsletterSubscriber.deleteMany();
  try {
    await Plant.insertMany(plants);
    await PottingMix.insertMany(pottingMixes);
    await Request.insertMany(requests);
    await NewsletterSubscriber.insertMany(subscribers);
    await User.insertMany(users);
    logger.info('collections initialized');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
  } finally {
    mongoose.disconnect(() => {
      logger.info('Mongoose connection closed');
      process.exit(0);
    });
  }
};

loadData();
