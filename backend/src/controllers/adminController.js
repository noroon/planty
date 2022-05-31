export const adminController = {
  async sayHello(req, res, next) {
    res.status(200).json({ message: 'Yeah, you have admin access right!' });
    next();
  },
};
