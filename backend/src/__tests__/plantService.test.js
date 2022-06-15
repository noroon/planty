import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Plant from '../plants/plantModel';
import User from '../users/userModel';
import config from '../config';

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

  const testAdmin = {
    name: 'Admin Adam',
    email: 'admin@admin.com',
    password: '$2b$10$6Fd.IwwcdC0Tu25PeYVS7uYOp58xxvAoGrutycthRQctDn0TrIp86',
    isAdmin: true,
    isVerified: false,
  };
  config.token_key = 'verySecretTokenKey';

  describe('get plants from database', () => {
    it('should list of all Plants', async () => {
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

    it('should give a plant by ID', async () => {
      const newPlant = await Plant.create(testPlant1);

      await request(app)
        .get(`/api/plant/${newPlant._id}`)
        .expect(200)
        .then(res => {
          const { plantById } = res.body;
          expect(plantById.name).toBe('Monstera Minima');
        });
    });
  });

  // describe('add plant to database', () => {
  //   it('should add a plant to DB successfully', async () => {
  //     await User.create(testAdmin);
  //     const token = await request(app)
  //       .post('/api/login')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .send({ email: 'admin@admin.com', password: 'Test1234' })
  //       .expect(200)
  //       .then(res => {
  //         const { token } = res.body;
  //         return token;
  //       });
    
  //     await request(app)
  //       .post('/api/admin/new-plant')
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect('Content-Type', 'multipart/form-data')
  //       // .send(testPlant1)
  //       .field('name', 'valami')
  //       .attach('file', '/path/to/file')
  //       .expect(200);
  //   });
  // });
});
