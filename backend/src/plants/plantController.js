import { plantService } from './plantService';
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('../routes/s3');

export const plantController = {
  async get(req, res) {
    try {
      const plants = await plantService.getPlants();

        // console.log(req.params);
        // const key = req.params.key;
        const readStream = getFileStream(e3eaffc80715bdfdcd27153849e066fe);

        readStream.pipe(res);

      res.status(200).json({ plants });
    } catch (err) {
      console.log('vmi');
      next(err);
    }
  },
  async addNew(req, res, next) {
    const {
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
    } = req.body;
    const file = req.file;

    try {
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      console.log(result);
      const imageKey = result.Key;

      const { statusCode, responseObj } = await plantService.addPlant(
        name,
        moisture,
        water,
        light,
        petfriendly,
        edible,
        easyToCare,
        care,
        imageKey,
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
