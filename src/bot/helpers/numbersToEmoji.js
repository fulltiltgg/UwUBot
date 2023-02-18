const emojies = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']; 

export const numbersToEmoji = (numbers) => {
	let string = '';

	numbers = numbers.toString();

	for (let i = 0; i < numbers.length; i++) {
		string += emojies[numbers[i]] ?? '0️⃣';
	}

	return string;
}