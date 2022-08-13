import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import logger from './logger.js';

const app = express();
const PORT = 4000;

let swaggerDocument;
try {
  swaggerDocument = YAML.load('openapi.yaml');
} catch (error) {
  logger.error(
    'Missing openapi.yaml file. Run "npm run build-doc" in backend directory and restart the server with "npm start".'
  );
}

const swaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: false,
    supportedSubmitMethods: [],
  },
};

app.use(
  '/',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, swaggerOptions)
);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
