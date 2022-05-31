import express from 'express';
import cors from 'cors';
import {
  helloController,
  userController,
  articleController,
  adminController,
} from '../controllers';
import {
  registerValidator,
  updateUserValidator,
} from '../middlewares/validator';
import { authorization } from '../middlewares/authorization';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/articles', articleController.get);

router.patch('/users', authorization.verifyToken, updateUserValidator.validator, userController.update);

router.post('/login', userController.login);
router.post('/register', registerValidator.validator, userController.register);
router.post('/admin/news', articleController.addNew);

router.all('/admin', authorization.verifyToken, authorization.isAdmin, adminController.sayHello);

export default router;
