import express from 'express';
import { authorization } from '../middlewares/authorization';
import { pottingMixController } from './pottingMixController';

const router = express.Router();

router.get('/potting-mixes', pottingMixController.get);
router.get('/potting-mix/:id', pottingMixController.getById);

router.post(
  '/new-potting-mix',
  authorization.verifyToken,
  pottingMixController.addNew,
);

export default router;
