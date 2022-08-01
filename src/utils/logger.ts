import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  translateTime: true,
});

const log = pino(stream);

export default log;
