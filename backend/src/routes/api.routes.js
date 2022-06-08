import express from 'express';
import cors from 'cors';

import { authorization } from '../middlewares/authorization';
import { adminController } from "./../controllers/adminController";
import users from '../users/userRoutes';
import plants from '../plants/plantRoutes';

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('./s3');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(users);
router.use(plants);

router.get('/images/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
});

router.all('/admin', authorization.verifyToken, authorization.isAdmin, adminController.sayHello);

export default router;
