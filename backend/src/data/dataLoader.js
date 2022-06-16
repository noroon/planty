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

const loadData = async () => {
  await initDBConnection();
  await User.deleteMany();
  await Plant.deleteMany();
  await PottingMix.deleteMany();
  await Request.deleteMany();
  try {
    await User.insertMany(users);
    await Plant.insertMany(plants);
    await PottingMix.insertMany(pottingMixes);
    await Request.insertMany(requests);
    logger.info('collections initialized');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
  } finally {
    await mongoose.disconnect(() => {
      logger.info('Mongoose connection closed');
      process.exit(0);
    });
  }
}

loadData();
