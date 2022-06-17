import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import PlantRequest from '../requests/requestModel';
import User from '../users/userModel';
import loginUser from './userService.test';

let mongoServer;

describe('User requests for plants', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await PlantRequest.deleteMany();
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const testRequest1 = {
    name: 'dracéna',
  };
  const testRequest2 = {
    name: 'black velvet',
  };
  const testRequest3 = {
    name: 'hoya carnosa',
  };

  const testRequests = [testRequest1, testRequest2, testRequest3];

  const testAdmin = {
    name: 'Admin Adam',
    email: 'admin@admin.com',
    password: '$2b$10$6Fd.IwwcdC0Tu25PeYVS7uYOp58xxvAoGrutycthRQctDn0TrIp86',
    isAdmin: true,
    isVerified: false,
  };

  describe('get plant requests from database', () => {
    it('should list all of the requests', async () => {
      await PlantRequest.insertMany(testRequests);
      await User.create(testAdmin);

      const token = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({ email: 'admin@admin.com', password: 'Test1234' })
        .expect(200)
        .then((res) => res.body.token);

      await request(app)
        .get('/api/plant-request')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          const { requests } = res.body;
          expect(requests.length).toBe(3);
          expect(requests).toMatchObject(testRequests);
        });
    });
  });

  describe('add request to database', () => {
    it('should add a request to DB successfully', async () => {
      const token = await loginUser({
        name: 'user',
        email: 'user@user.com',
        password: 'Test1234',
      });

      await request(app)
        .post('/api/plant-request')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .send(testRequest3)
        .expect(200)
        .then((res) => {
          const { name } = res.body;
          expect(name).toBe('hoya carnosa');
        });
    });
  });
});
