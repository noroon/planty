import request from 'supertest';
import app from '../src/app';
import { userService } from '../src/services';
import {
  mockData,
  mockSavedUser,
  passwordLessEight,
} from '../src/utils/expressMocker';

describe('API TESTS - Register User- /api/register', () => {
  test('send an empty request', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          'Name, email and password are required.',
        );
        return done();
      });
  });

  test('send request with a name and email', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        email: mockData.email,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Password is required.');
        return done();
      });
  });

  test('send request with an email and password', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: mockData.email,
        password: mockData.password,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Name is required.');
        return done();
      });
  });

  test('send request with a name and password', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        password: mockData.password,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email is required.');
        return done();
      });
  });

  test('send a password under 8 character', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        name: mockData.name,
        email: mockData.email,
        password: passwordLessEight,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          'Password must be at least 8 characters.',
        );
        return done();
      });
  });

  test('send a with a good email, password and name', (done) => {
    userService.registerUser = jest.fn(() => Promise.resolve(
      { statusCode: 200, responseObj: { ...mockSavedUser } },
    ));
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        ...mockData,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toEqual(mockSavedUser.id);
        expect(res.body.name).toEqual(mockSavedUser.name);
        expect(res.body.isAdmin).toEqual(mockSavedUser.isAdmin);
        expect(res.body.isVerified).toEqual(mockSavedUser.isVerified);
        return done();
      });
  });
});
