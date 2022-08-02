import express, { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import routes from './routes';
import logger from './utils/logger';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors())

routes(app);

app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof TypeError) {
    return res.status(400).json({
      error: err.message || 'Bad request',
    });
  }

  res.status(err.status ?? 500);
  return res.json({
    success: false,
    error: err.message || 'Internal error occured'
  });
});

app.listen(3000, () => { logger.info('Server is running on port 3000'); });
