import logger from '../logger';
import initDBConnection from './mongoDBConnect';

import users from './users';
import User from '../users/userModel';
import plants from './plants';
import Plant from '../plants/plantModel';
import pottingMixes from "./pottingMixes"
import PottingMix from "../pottingMixes/pottingMixModel"
import requests from "./requests"
import Request from '../requests/requestModel'

async function loadData() {
  await initDBConnection();
  await User.insertMany(users);
  await Plant.insertMany(plants);
  await PottingMix.insertMany(pottingMixes);
  await Request.insertMany(requests);
  logger.info('collections initialized');
  process.exit(0);
}

loadData();
