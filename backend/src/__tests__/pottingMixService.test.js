import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import config from '../config';
import PottingMix from '../pottingMixes/pottingMixModel';
import User from '../users/userModel';

let mongoServer;

describe('Potting mixes', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await PottingMix.deleteMany();
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const testMix1 = {
    name: 'aroid mix',
    ingredients: [
      '20% perlit',
      '25% orchideaföld',
      '30% kókuszrost',
      '10% tőzeg',
      '10% gilisztahumusz',
      '5% faszén',
    ],
    description:
      'Ez a földkeverék kiválló azoknak a növénygazdiknak, akik hajlamosak a növényeiket túlöntözni.',
  };
  const testMix2 = {
    name: 'syngonium mix',
    ingredients: [
      '20% perlit',
      '25% kókuszrost',
      '25% komposzt',
      '30% kerti föld',
    ],
    description: 'Ez a földkeverék kiválló a syngoniumoknak',
  };
  const testMix3 = {
    name: 'fikusz mix',
    ingredients: [
      '25% perlit',
      '50% tőzegmoha',
      '15% durva homok',
      '10% gilisztahumusz',
    ],
    description: 'Szuper földmentes ültetőközeg',
  };
  const testMixes = [testMix1, testMix2, testMix3];

  const testUser = {
    name: 'user',
    email: 'user@user.com',
    password: '$2b$10$oyqtubNd4Z8fsDb78ALbjOkiJsN81.f5PRNOOixs9TbQS7sXo0B7e',
    isAdmin: false,
    isVerified: false,
  };

  config.token_key = 'verySecretTokenKey';

  describe('get potting mixes from database', () => {
    it('should list all of the mixes', async () => {
      await PottingMix.insertMany(testMixes);
      await request(app)
        .get('/api/potting-mixes')
        .expect(200)
        .then(res => {
          const { pottingMixes } = res.body;
          expect(pottingMixes.length).toBe(3);
          expect(pottingMixes).toMatchObject(testMixes);
        });
    });
    it('should give a potting mix by ID', async () => {
      const newMix = await PottingMix.create(testMix3);
      await request(app)
        .get(`/api/potting-mix/${newMix._id}`)
        .expect(200)
        .then(res => {
          const { pottingMixById } = res.body;
          expect(pottingMixById.name).toBe('fikusz mix');
        });
    });
  });
  describe('add potting mix to database', () => {
    it('should add a potting mix to DB successfully', async () => {
      await User.create(testUser);

      const token = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({ email: 'user@user.com', password: 'Test1234' })
        .expect(200)
        .then(res => {
          const { token } = res.body;
          return token;
        });

      await request(app)
        .post('/api/new-potting-mix')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .send(testMix2)
        .expect(200)
        .then(res => {
          const { name } = res.body;
          expect(name).toBe('syngonium mix');
        });
    });
  });
});
