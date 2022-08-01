import express, { NextFunction, ErrorRequestHandler } from 'express';
import routes from './routes';
import logger from './utils/logger';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(<ErrorRequestHandler>function (err, req, res, next: NextFunction) {
  if (err instanceof TypeError) {
    return res.status(400).json({
      error: 'Bad Request',
    });
  }

  res.status(err.status ?? 500);
  res.json({
    success: false,
    error: 'Internal error occured',
  });

  next(err);
});

app.listen(6969, () => {
  logger.info('Server is running on port 3000');
  routes(app);
});
