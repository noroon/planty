import request from 'supertest';
import User from '../src/models/userModel';
import app from '../src/app';
import {
  TEST_EXCEPTION,
  anyUserEmail,
  anyUserPassword,
  unregisteredUserEmail,
  registeredUserEmail,
  registeredUserPlainPwd,
  registeredUser,
} from './userServiceData';

jest.mock('../src/config');

describe('API TESTS - Login User Service - /api/login', () => {
  test('Login without email and password', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('All fields are required.');
        return done();
      });
  });

  test('Login without email', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email is required.');
        return done();
      });
  });

  test('Login without password', (done) => {
    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: anyUserEmail,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Password is required.');
        return done();
      });
  });

  test('Login with unregistered email', (done) => {
    User.findOne = jest.fn().mockReturnValue(null);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: unregisteredUserEmail,
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email or password is incorrect.');
        return done();
      });
  });

  test('Login with wrong password', (done) => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: anyUserPassword,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Email or password is incorrect.');
        return done();
      });
  });

  test('Login with registered email and correct password', (done) => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: registeredUserPlainPwd,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).toEqual('ok');
        expect(res.body.token).toBeDefined();
        expect(res.body.token).toHaveLength(295);
        return done();
      });
  });

  test('Exception during login', (done) => {
    User.findOne = jest.fn().mockImplementation(() => {
      throw new Error(TEST_EXCEPTION);
    });

    request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        email: registeredUserEmail,
        password: anyUserPassword,
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(TEST_EXCEPTION);
        return done();
      });
  });
});
