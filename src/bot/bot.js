import { Client, Events, GatewayIntentBits as GIB } from 'discord.js';

import { logger } from '#root/logger.js';

import { handler as interactionHandler } from '#bot/handlers/interaction.handler.js';

export const client = new Client({ intents: [GIB.Guilds] });

client.once(Events.ClientReady, (ctx) => {
	logger.info(`Ready! Logged in as ${ctx.user.tag}`);
});

/***********
* Handlers *
***********/

client.on(Events.InteractionCreate, interactionHandler);