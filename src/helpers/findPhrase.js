import { cwd } from 'process';
import { resolve } from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';

const soundsPath = resolve(cwd(), 'data', 'sounds', 'data.json');
const sounds = JSON.parse(readFileSync(soundsPath, 'utf8'));

const heroesList = Object.keys(sounds);

/**
 * @param {string} phrase - The phrase to be found
 * @return {Array[2]} - Phrases found [path, phrase]
 */
export const findPhrase = (phrase) => {
	const phrasesFound = [];

	for (let i = 0; i < heroesList.length; i++) {
		const heroPhrases = Object.values(sounds[heroesList[i]]);

		for (let j = 0; j < heroPhrases.length; j++) {
			if (heroPhrases[j].indexOf(phrase) >= 0) {
				phrasesFound.push([`${heroesList[i]}/${j}.mp3`, sounds[heroesList[i]][j]]);
			}
			
			// Phrases found limit
			if (phrasesFound.length > 8) return phrasesFound;
		}
	}

	return phrasesFound;
}