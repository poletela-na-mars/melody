import { Song } from '@/types';

export const getFavourites = (songs: Song[]): { favAuthor: string, favGenre: string, favMood: string } => {
	let favAuthor = '', favGenre = '', favMood = '';

	let maxListenCounter = 0;
	const genresMap = new Map();
	const moodsMap = new Map();

	songs.forEach((song) => {
		if (song.listen_counter > maxListenCounter) {
			maxListenCounter = song.listen_counter;
			favAuthor = song.author;
		}

		if (song.listen_counter > 0) {
			genresMap.set(song.genre, (genresMap.get(song.genre) || 0) + song.listen_counter);
			moodsMap.set(song.mood, (moodsMap.get(song.mood) || 0) + song.listen_counter);
		}
	});

	favGenre = Array.from(genresMap.entries()).reduce((acc: [string, number], el: [string, number]): [string, number] => el[1] > acc[1] ? el : acc, ['', 0])[0];
	favMood = Array.from(moodsMap.entries()).reduce((acc: [string, number], el: [string, number]): [string, number] => el[1] > acc[1] ? el : acc, ['', 0])[0];

	return { favAuthor, favGenre, favMood };
};
