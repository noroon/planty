import express from 'express';
import { userController } from './userController';
import {
  registerValidator,
  updateUserValidator,
} from '../middlewares/validator';
import { authorization } from '../middlewares/authorization';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', registerValidator.validator, userController.register);

router.patch(
  '/users',
  authorization.verifyToken,
  updateUserValidator.validator,
  userController.update,
);
router.patch(
  '/user/:id',
  authorization.verifyToken,
  userController.updateCollection,
);

export default router;
