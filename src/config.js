import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

import { resolve } from 'path';
import { cwd } from 'process';

dotenv.config({ path: resolve(cwd(), '.env') });

export const config = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'production'],
    }),
    LOG_LEVEL: str({
        choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
    }),
    DEV_GUILD_ID: str(),
    APPLICATION_ID: str(),
    BOT_TOKEN: str(),
});

export const BOT_INVITE_LINK = `
    https://discord.com/api/oauth2/authorize?client_id=${config.APPLICATION_ID}&permissions=0&scope=bot%20applications.commands
`.trim();