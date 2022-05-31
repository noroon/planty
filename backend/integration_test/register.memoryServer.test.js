import mongoose from 'mongoose';
import User from '../src/models/userModel';
import { mockData } from '../src/utils/expressMocker';

describe('User Model Test', () => {
  beforeAll(async () => {
    mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('create & save user successfully', async () => {
    const validUser = new User(mockData);
    const savedUser = await validUser.save();
    const { _id, name, email } = savedUser;
    expect(_id).toBeDefined();
    expect(name).toBe(mockData.name);
    expect(email).toBe(mockData.email);
  });

  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({
      name: 'TekLoon',
      email: 'Male',
      password: '12345678',
      nickname: 'Handsome TekLoon',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });
});
