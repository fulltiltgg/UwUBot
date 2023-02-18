import { REST, Routes } from 'discord.js';
import { config } from '#root/config.js';

import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'process';

import { logger } from '#root/logger.js';

const commands = [];

const commandsPath = resolve(cwd(), 'src', 'bot', 'commands', 'slash');
const commandsFiles = readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandsFiles) {
	const filePath = resolve(commandsPath, file);
	const command = (await import(filePath)).command;
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.BOT_TOKEN);

try {
	logger.info(`Started refreshing ${commands.length} application (/) commands`);

	const data = await rest.put(
		Routes.applicationGuildCommands(config.APPLICATION_ID, config.DEV_GUILD_ID),
		{ body: commands },
	);

	logger.info(`Successfully reloaded ${data.length} application (/) commands`);
} catch (err) {
	logger.error(err);
}