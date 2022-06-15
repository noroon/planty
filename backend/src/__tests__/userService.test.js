import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import User from '../users/userModel';
import config from '../config';

let mongoServer;

describe('User routes', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const testUser = {
    name: 'John Doe',
    email: 'any@email.com',
    password: 'Test1234',
  };
  const testRegisteredUser = {
    email: 'any@email.com',
    password: 'Test1234',
  };

  config.token_key = 'verySecretTokenKey';

  const registerUser = async () => {
    await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(testUser)
      .expect(200)
      .then(res => {
        const { email } = res.body;
        expect(email).toBe('any@email.com');
      });
  };

  describe('/api/register', () => {
    it('should create a new user', async () => {
      await registerUser();
    });
    describe('when user-email is taken', () => {
      it('should give 400 error', async () => {
        await User.create(testUser);

        await request(app)
          .post('/api/register')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send(testUser)
          .expect(400)
          .then(res => {
            const { message } = res.body;
            expect(message).toBe('Email is already taken.');
          });
      });
    });
  });

  describe('/api/login', () => {
    describe('when email and password is correct', () => {
      it('should login a user', async () => {
        await registerUser();

        await request(app)
          .post('/api/login')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send(testRegisteredUser)
          .expect(200)
          .then(res => {
            const { token } = res.body;
            expect(token).toBeDefined();
          });
      });
    });
  });

  describe('/api/users', () => {
    describe('when email and password is correct', () => {
      it('should login a user', async () => {
        await registerUser();

        await request(app)
          .post('/api/login')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send(testRegisteredUser)
          .expect(200)
          .then(res => {
            const { token } = res.body;
            expect(token).toBeDefined();
          });
      });
    });
  });
});

