import express from 'express';
import cors from 'cors';

import { authorization } from '../middlewares/authorization';
import { adminController } from "./../controllers/adminController";
import users from '../users/userRoutes';
import plants from '../plants/plantRoutes';
import plantRequests from '../requests/requestRoutes';

const { getFileStream } = require('../utils/s3');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(users);
router.use(plants);
router.use(plantRequests);

router.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.all('/admin', authorization.verifyToken, authorization.isAdmin, adminController.sayHello);

export default router;
