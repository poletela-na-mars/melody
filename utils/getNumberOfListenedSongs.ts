import { Song } from '@/types';

export const getNumberOfListenedSongs = (songs: Song[]): { listenedSongs: number, withRepeat: number } => {
	let listenedSongs = 0, withRepeat = 0;
	songs.forEach((song) => {
		if (song.listen_counter > 0) {
			listenedSongs++;
			withRepeat += song.listen_counter;
		}
	});

	return {
		listenedSongs,
		withRepeat,
	};
};
