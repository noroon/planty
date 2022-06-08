import express from 'express';
import { plantController } from './plantController';
// const fs = require('fs');
// const util = require('util');
// const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// const { uploadFile, getFileStream } = require('./s3');

const router = express.Router();

router.get('/plants', plantController.get);

router.post('/admin/new-plant', upload.single('image'), plantController.addNew);
// router.post('/admin/news', articleController.addNew);

export default router;
