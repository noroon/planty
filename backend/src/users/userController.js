import { userService } from './userService';


export const userController = {
  async register(req, res, next) {
    try {
      const { statusCode, responseObj } = await userService.registerUser(
        req.body
      );

      res.status(statusCode).json(responseObj);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { statusCode, resObj } = await userService.loginUser(req.body);
      return res.status(statusCode).json(resObj);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    const { userId } = req.user;
    try {
      const { statusCode, resObj } = await userService.updateUser(
        userId,
        req.body
      );
      return res.status(statusCode).json(resObj);
    } catch (error) {
      return next(error);
    }
  },
};
