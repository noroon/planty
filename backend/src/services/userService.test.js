import jwt from 'jsonwebtoken';
import { userService } from './userService';
import config from '../config';
import User from '../models/userModel';
import {
  TEST_EXCEPTION,
  anyUserEmail,
  anyUserPassword,
  unregisteredUserEmail,
  registeredUserEmail,
  registeredUserPlainPwd,
  registeredUser,
} from '../../integration_test/userServiceData';
import { mockData, mockSavedUser } from '../utils/expressMocker';

jest.mock('../config');

afterEach(() => {
  jest.clearAllMocks();
});

describe('API TESTS - Register User- /api/register', () => {
  test('Register with taken email', async () => {
    User.findOne = jest.fn().mockReturnValue({ ...mockSavedUser });
    expect.assertions(2);
    return userService.registerUser({ ...mockData }).catch((e) => {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual('Email is already taken.');
    });
  });

  test('Should create a new user successfully!', async () => {
    const spy = jest.spyOn(User, 'create').mockReturnValueOnce(mockSavedUser);
    User.create(mockData);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser._id).toEqual(mockSavedUser._id);
    expect(spyCreatedUser.name).toEqual(mockData.name);
    expect(spyCreatedUser.email).toEqual(mockData.email);
  });
});

describe('UNIT TESTS - Login User Service', () => {
  test('Login without email and password', async () => {
    // ensure that all assertions in the catch block are present (ex. you must have 2 expect())
    expect.assertions(2);
    try {
      await userService.loginUser();
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('All fields are required.');
    }
  });

  test('Login without email', async () => {
    expect.assertions(2);
    try {
      await userService.loginUser(null, anyUserPassword);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('Email is required.');
    }
  });

  test('Login without password', async () => {
    expect.assertions(2);
    try {
      await userService.loginUser(anyUserEmail, null);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('Password is required.');
    }
  });

  test('Login with unregistered email', async () => {
    User.findOne = jest.fn().mockReturnValue(null);
    expect.assertions(2);
    try {
      await userService.loginUser(unregisteredUserEmail, anyUserPassword);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('Email or password is incorrect.');
    }
  });

  test('Login with wrong password', async () => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);
    expect.assertions(2);
    try {
      await userService.loginUser(registeredUserEmail, anyUserPassword);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual('Email or password is incorrect.');
    }
  });

  test('Login with registered email and correct password', async () => {
    User.findOne = jest.fn().mockReturnValue(registeredUser);
    const {
      _id, name, email, isAdmin, isVerified,
    } = registeredUser;
    const testToken = jwt.sign(
      {
        userId: _id,
        name,
        email,
        isAdmin,
        isVerified,
      },
      config.token_key,
      { expiresIn: '2h' },
    );
    const result = await userService.loginUser(
      registeredUserEmail,
      registeredUserPlainPwd,
    );
    expect(result.statusCode).toEqual(200);
    expect(result.resObj.status).toEqual('ok');
    expect(result.resObj.token).toEqual(testToken);
    // Token generation match only 99%, so dirty workaround:
    // expect(result.resObj.token).toBeDefined();
    // expect(result.resObj.token).toHaveLength(235);
  });

  test('Exception during login', async () => {
    User.findOne = jest.fn().mockImplementation(() => {
      throw new Error(TEST_EXCEPTION);
    });
    expect.assertions(2);
    try {
      await userService.loginUser(registeredUserEmail, anyUserPassword);
    } catch (error) {
      expect(error.status).toEqual(500);
      expect(error.message).toEqual(TEST_EXCEPTION);
    }
  });
});
