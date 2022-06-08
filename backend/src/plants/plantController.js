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

      res.status(200).json({ plants });
    } catch (err) {
      console.log('vmi');
      next(err);
    }
  },
  async addNew(req, res, next) {
    console.log(req.body);
    console.log(req.body.image);
    // const {
    //   name,
    //   moisture,
    //   water,
    //   light,
    //   petfriendly,
    //   edible,
    //   easyToCare,
    //   care,
    // } = req.body;
    //   const file = req.file;
    //   console.log(file);

    //   // apply filter
    //   // resize

    //   const result = await uploadFile(file);
    //   await unlinkFile(file.path);
    //   console.log(result);
    //   // const description = req.body.description;
    //   res.send({ imagePath: `/images/${result.Key}` });

    try {
      const { statusCode, responseObj } = await plantService.addPlant(
        name,
        moisture,
        water,
        light,
        petfriendly,
        edible,
        easyToCare,
        care
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
};
