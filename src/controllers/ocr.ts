import { Request, Response } from 'express';

type OcrRequest = Request & {
    body: {
        image: string;
    };
};

const ocrController = (req: Request<OcrRequest>, res: Response) => {
    const b64Image = req.body.image;
    const image = Buffer.from(b64Image, 'base64');
    return res.json({
        text: 'Hello World',
    });
}

export { ocrController };