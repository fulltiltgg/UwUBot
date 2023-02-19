export const emojiesList = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']; 

/**
 * @param {string|number} string
 * @return {string} The string with the replaced numbers
 */
export const toEmojiDigits = (string) => {
	let replaced = '';

	string = string.toString();

	for (let i = 0; i < string.length; i++) {
		replaced += emojiesList[string[i]] ?? string[i];
	}

	return replaced;
}