export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  token_key: process.env.TOKEN_KEY,
};

export const mongodbMemoryServerOptions = {
  instance: {
    dbName: 'jest',
  },
  binary: {
    version: '4.0.2',
    skipMD5: true,
  },
  autoStart: false,
};