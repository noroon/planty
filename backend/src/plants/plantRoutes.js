import express from 'express';
import { plantController } from './plantController';

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/plants', plantController.get);

router.post('/admin/new-plant', upload.single('image'), plantController.addNew);

export default router;
