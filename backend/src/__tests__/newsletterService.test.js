import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import NewsletterSubscriber from '../newsletter/newsletterModel';

let mongoServer;

describe('Newsletter subscribers', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await NewsletterSubscriber.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const testSubsriber = {
    email: 'hello@hello.com',
  };

  describe('add subscriber to database', () => {
    it('should add a subscriber to DB successfully', async () => {
      await request(app)
        .post('/api/newsletter')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(testSubsriber)
        .expect(200)
        .then((res) => {
          const { email } = res.body;
          expect(email).toBe('hello@hello.com');
        });
    });
  });
});
