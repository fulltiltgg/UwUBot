import pino from 'pino';
import pretty from 'pino-pretty';

import { config } from '#root/config.js';

const options = {
    level: config.LOG_LEVEL,
};

export const logger = pino(
    options,
    pretty({
        ignore: 'pid,hostname',
        colorize: true,
        translateTime: true,
    })
);
