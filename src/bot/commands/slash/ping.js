import { SlashCommandBuilder } from 'discord.js';

import { resolve } from 'node:path';
import { cwd } from 'process';

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(ctx) {
		await ctx.reply({ content: '🏓 **|** Pong!', });
	},
};