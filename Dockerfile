FROM node:16-buster-slim

RUN apt-get update && apt-get install -y tesseract-ocr graphicsmagick imagemagick

RUN mkdir -p /usr/src/app
WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src

RUN npm install

RUN apt install tesseract-ocr

RUN npm run build

COPY dist/ /usr/src/

RUN chmod -R +r /usr/src/

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]