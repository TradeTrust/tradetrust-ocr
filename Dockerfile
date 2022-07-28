FROM node:18-buster-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

RUN apt install tesseract-ocr

COPY dist/ /usr/src/app/

RUN chmod -R +r /usr/src/app

USER node

EXPOSE 3000

CMD ["node", "server.js"]