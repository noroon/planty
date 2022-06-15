import express from 'express';
import morgan from 'morgan';
import logger from './logger';

import { api, documentation } from './routes';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/api-docs', documentation);

app.use(errorHandler);

export default app;
