import { Request, Response } from 'express';
import { OCRInput } from '../types';

type OcrRequest = Request & {
  body: {
    input: OCRInput;
  };
};

export const ocrController = async (req: Request<OcrRequest>, res: Response) => {
  const inputBuffer = req.body.input;
  if (!inputBuffer) {
    res.status(400).send('No input provided');
    return;
  }

  if (!req.is('application/json')) {
    res.status(400).send('Invalid content type');
    return;
  }

  const image = Buffer.from(inputBuffer, 'base64');
  return res.json({
    text: 'Hello World',
  });
};
