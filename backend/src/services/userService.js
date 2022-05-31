import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import config from '../config';

export const userService = {
  async registerUser(name, email, password) {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw createHttpError(400, { message: 'Email is already taken.' });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: encryptedPassword,
    });
    try {
      const savedUser = await user.save();
      return {
        statusCode: 200,
        responseObj: {
          id: savedUser._id,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
          isVerified: savedUser.isVerified,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err });
    }
  },

  async loginUser(email, password) {
    if (!email && !password) throw createHttpError(400, { message: 'All fields are required.' });
    if (!email) throw createHttpError(400, { message: 'Email is required.' });
    if (!password) throw createHttpError(400, { message: 'Password is required.' });

    try {
      // Validate if user exists in the database - email is unique
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const {
          _id, name, isAdmin, isVerified,
        } = user;

        const token = jwt.sign(
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
        return { statusCode: 200, resObj: { status: 'ok', token } };
      }
    } catch (error) {
      throw createHttpError(500, { message: error.message });
    }
    throw createHttpError(400, { message: 'Email or password is incorrect.' });
  },

  async updateUser(_id, name, email, password) {
    const userData = await User.findById({ _id });

    if (name) userData.name = name;

    if (email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        throw createHttpError(400, { message: 'Email is already taken.' });
      }
      userData.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      userData.password = encryptedPassword;
    }

    try {
      const savedUser = await userData.save();
      const { isAdmin, isVerified } = savedUser;
      const newToken = jwt.sign(
        {
          _id,
          isAdmin,
          isVerified,
          name,
          email,
        },
        config.token_key,
        { expiresIn: '2h' },
      );

      return {
        statusCode: 200,
        resObj: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          token: newToken,
        },
      };
    } catch (err) {
      throw createHttpError(400, { message: err });
    }
  },

};
