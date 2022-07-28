import express, { NextFunction, ErrorRequestHandler } from 'express';
import routes from './routes';
import logger from './utils/logger';

const app = express();

app.use(express.json());

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

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
  routes(app);
});
