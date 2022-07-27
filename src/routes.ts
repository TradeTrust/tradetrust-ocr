import express from 'express';
import { ocrController } from './controllers/ocr';

const router = express.Router();
router.post('/ocr', ocrController);

export { router };