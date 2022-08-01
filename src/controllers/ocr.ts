import { Request, Response } from 'express';
import { fromBuffer } from 'pdf2pic';
import { ToBase64Response } from 'pdf2pic/dist/types/toBase64Response';
import tesseract from 'node-tesseract-ocr';

type OcrRequest = Request & {
  body: {
    pdf: string;
  };
};

export const ocrController = async (req: Request<OcrRequest>, res: Response) => {
  const inputBuffer = req.body.pdf;

  if (!inputBuffer) {
    return res.status(400).json({
      error: 'No input provided',
    });
  }

  if (!req.is('application/json')) {
    return res.status(400).json({
      error: 'Bad request',
    });
  }

  const pdf:Buffer = Buffer.from(inputBuffer, 'base64');

  const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./images",
    format: "png",
    width: 600,
    height: 600
  };

  const result:ToBase64Response[] = await fromBuffer(pdf, options).bulk(-1, true);

  let resp: { [text: string]: string[] } = { text: [] };

  for (const page of result) {
    const imgBuffer:Buffer = Buffer.from(page.base64, 'base64');
    const text:string = await tesseract.recognize(imgBuffer, { lang: "eng", oem: 1, psm: 3 });
    resp.text.push(text);
  }

  res.status(200).send(resp);
};
