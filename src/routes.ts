import { Express, Request, Response } from 'express';
import { ocrController } from './controllers/ocr';

// export const router = express.Router();

const routes = (app: Express) => {
  app.get('/health', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/ocr', ocrController);
};

export default routes;
