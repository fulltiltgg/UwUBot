import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'process';

import { logger } from '#root/logger.js';

export const commands = new Map();

const commandsPath = resolve(cwd(), 'src', 'bot', 'commands', 'slash');
const commandsFiles = readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandsFiles) {
	const filePath = resolve(commandsPath, file);
	const command = (await import(filePath)).command;

	if ('data' in command && 'execute' in command) {
		commands.set(command.data.name, command);
	} else {
		logger.warn(`Command at ${filePath} is missing a required "data" or "execute" property`);
	}
}

export const handler = async (ctx) => {
	if (!ctx.isChatInputCommand()) return;

	const command = commands.get(ctx.commandName);

	if (!command) {
		return logger.warn(`No command matching ${ctx.commandName} was found.`)
	}

	try {
		await command.execute(ctx);
	} catch (err) {
		logger.error(err);
		await ctx.reply({
			content: 'There was an error while executing this command!', ephemeral: true,
		});
	}
}