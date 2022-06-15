import express from 'express';
import cors from 'cors';

import users from '../users/userRoutes';
import plants from '../plants/plantRoutes';
import plantRequests from '../requests/requestRoutes';
import pottingMixes from '../pottingMixes/pottingMixRoutes';

const { getFileStream } = require('../utils/s3');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(users);
router.use(plants);
router.use(plantRequests);
router.use(pottingMixes);

router.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

export default router;
