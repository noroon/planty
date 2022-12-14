import express from 'express';
import { authorization } from '../middlewares/authorization';
import { requestController } from './requestController';

const router = express.Router();

router.get(
  '/plant-request',
  authorization.verifyToken,
  authorization.isAdmin,
  requestController.get,
);

router.post(
  '/plant-request',
  authorization.verifyToken,
  requestController.addNew,
);

export default router;
