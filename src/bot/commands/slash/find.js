import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder as Button, ButtonStyle} from 'discord.js';

import { findPhrase } from '#bot/helpers/findPhrase.js';
import { resolve } from 'node:path';
import { cwd } from 'process';

import { numbersToEmoji } from '#bot/helpers/numbersToEmoji.js';

export const command = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Find Warcraft 3 heroes phrases!')
		.addStringOption(o =>
			o.setName('phrase')
			 .setDescription('Phrase to be found.')
			 .setRequired(true)),
	async execute(ctx) {
		const foundedPhrases = findPhrase(ctx.options.getString('phrase') ?? 'null');

		if (foundedPhrases.length == 0) {
			return await ctx.reply({ content: '📦 **|** Unfortunately, there is no such phrase.', ephemeral: true });
		}

		if (foundedPhrases.length == 1) {
			return await ctx.reply({ files: [{
				attachment: resolve(cwd(), 'data', 'sounds', foundedPhrases[0][0]),
				name: 'sound.mp3',
				description: 'A sound',
			}], })
		}

		let content = '📦 **|** Click on the button below to select a phrase.';
		
		const phrasesKeyboard = [];

		for (let i = 0; i < foundedPhrases.length; i++) {
			const emoji = numbersToEmoji(i);

			content += '\n' + emoji + ' **|** ' + (foundedPhrases[i][1].length > 20 ?
				`${foundedPhrases[i][1].slice(0, 17)}...` :
				foundedPhrases[i][1]);

			if (i % 3 == 0) phrasesKeyboard.push(new ActionRowBuilder());

			phrasesKeyboard[Math.floor(i / 3)].addComponents(
				new Button()
					.setCustomId(`phraseSelect_${i}`)
					.setEmoji(emoji)
					.setStyle(ButtonStyle.Secondary),
			);
		}

		await ctx.reply({ content, components: phrasesKeyboard });

		const filter = i => i.user.id === ctx.user.id;
		const collector = ctx.channel.createMessageComponentCollector({ filter, time: 60000 });
	
		collector.on('collect', async (i) => {
			await i.reply({ files: [{
				attachment: resolve(cwd(), 'data', 'sounds', foundedPhrases[i.customId.split('_')[1]][0]),
				name: 'sound.mp3',
				description: 'A sound',
			}], });
		});

		collector.on('end', async (i) => {

		});
	},
};