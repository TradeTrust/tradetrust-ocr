import { NextFunction, Request, Response } from 'express';
import { fromBuffer } from 'pdf2pic';
import { ToBase64Response } from 'pdf2pic/dist/types/toBase64Response';
import { Schema, validationResult } from 'express-validator';
import tesseract from 'node-tesseract-ocr';

export const ocrSchema: Schema = {
  pdf: {
    in: ['body'],
    isBase64: true,
    exists: true,
    errorMessage: 'Invalid base64 string',
  }
}

export const ocrController = async (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new TypeError(errors.array()[0].msg))
  }

  const inputBuffer = req.body.pdf;

  const pdf:Buffer = Buffer.from(inputBuffer, 'base64');

  const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./images",
    format: "png",
    width: 600,
    height: 600
  };

  let result:ToBase64Response[]
  try {
    result = await fromBuffer(pdf, options).bulk(-1, true);
  }
  catch (e) { return next(e) };

  let resp: { [text: string]: string[] } = { text: [] };

  for (const page of result) {
    try {
      const imgBuffer:Buffer = Buffer.from(page.base64, 'base64');
      const text:string = await tesseract.recognize(imgBuffer, { lang: "eng", oem: 1, psm: 3 });
      resp.text.push(text);
    }
    catch (e) { return next(e) };
  }

  res.status(200).send(resp);
};
