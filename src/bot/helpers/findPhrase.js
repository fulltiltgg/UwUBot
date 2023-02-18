import { resolve } from 'node:path';
import { cwd } from 'process';
import { readdirSync, readFileSync } from 'node:fs';

let sounds = readFileSync(resolve(cwd(), 'data', 'sounds', 'data.json'), 'utf8');
sounds = JSON.parse(sounds);

const heroesList = Object.keys(sounds);

export const findPhrase = (phrase) => {
	let phrasesFound = [];

	for (let i = 0; i < heroesList.length; i++) {
		const heroPhrases = Object.values(sounds[heroesList[i]]);

		for (let j = 0; j < heroPhrases.length; j++) {
			if (heroPhrases[j].indexOf(phrase) >= 0) {
				phrasesFound.push([`${heroesList[i]}/${j}.mp3`, sounds[heroesList[i]][j]]);
			}

			if (phrasesFound.length > 8) return phrasesFound;
		}
	}

	return phrasesFound;
}