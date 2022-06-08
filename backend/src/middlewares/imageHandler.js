import express from 'express';

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('./s3');

const router = express.Router();

export const imageHandler = {
  upload(req, res, next) {
    try {
  const file = req.file;
  console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  // const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
      next();
    } catch (err) {
      next(createHttpError(401, { status: 'error', message: 'Invalid token' }));
    }
  },
};

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
