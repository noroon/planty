import logger from '../logger';

export default (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`,
  );
  res.status(err.status || 500);
  // Express app.get('env') returns 'development' if NODE_ENV is not defined.
  // In Jest it is set to 'test' if it's not already set to something else.
  res.json({
    message:
      req.app.get('env') === 'development' || req.app.get('env') === 'test'
        ? err.message
        : 'Unknown error happened',
  });
  next();
};
