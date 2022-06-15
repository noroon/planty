import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Plant from '../plants/plantModel';

let mongoServer;

describe('Plants', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await Plant.deleteMany();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const testPlant1 = {
    name: 'Monstera Minima',
    moisture: 3,
    water: 2,
    light: 3,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'Hajtásait felfuttathatjuk, de le is lógathatjuk a növényt függesztett kaspóba ültetve.',
  };
  const testPlant2 = {
    name: 'Lantlevelű fikusz (Ficus lyrata)',
    moisture: 2,
    water: 2,
    light: 2,
    petfriendly: false,
    edible: false,
    easyToCare: false,
    care: 'Nincsenek különleges igényei.',
  };
  const testPlant3 = {
    name: 'Márványos szobafutóka (Scindapsus Pictus Aargyraeus)',
    moisture: 3,
    water: 2,
    light: 2,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'A szobai futóka a kontyvirágfélék családjába tartozó kúszónövény.',
  };

  describe('get plants from database', () => {
    test('should list of all Plants', async () => {
      const testPlants = [testPlant1, testPlant2, testPlant3];
      await Plant.insertMany(testPlants);

      await request(app)
        .get('/api/plants')
        .expect(200)
        .then(res => {
          const { plants } = res.body;
          expect(plants.length).toBe(3);
          expect(plants).toMatchObject(testPlants);
        });
    });
  });
});
