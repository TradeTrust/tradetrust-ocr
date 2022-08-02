import { Express, Request, Response } from 'express';
import { ocrController, ocrSchema } from './controllers/ocr';
import { checkSchema } from 'express-validator';

const routes = (app: Express) => {
  app.get('/health', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/ocr', checkSchema(ocrSchema), ocrController);
};

export default routes;
