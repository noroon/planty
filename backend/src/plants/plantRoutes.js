import express from 'express';
import { authorization } from '../middlewares/authorization';
import { plantController } from './plantController';

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/plants', plantController.get);
router.get('/plant/:id', plantController.getById);

router.post('/admin/new-plant', authorization.verifyToken, authorization.isAdmin, upload.single('image'), plantController.addNew);

export default router;
