import { Song } from '@/types';

export const songs: Song[] = [
	{
		id: '1',
		user_id: '1',
		author: 'Author 1',
		performer: 'Performer 1',
		title: 'Title 1',
		genre: 'Genre 1',
		mood: 'Mood 1',
		song_path: 'SongsPath 1',
		image_path: 'ImagePath 1',
		listen_counter: 1,
		album_id: '1',
	},
	{
		id: '2',
		user_id: '2',
		author: 'Author 2',
		performer: 'Performer 2',
		title: 'Title 2',
		genre: 'Genre 2',
		mood: 'Mood 2',
		song_path: 'SongsPath 2',
		image_path: 'ImagePath 2',
		listen_counter: 2,
		album_id: '2',
	},
	{
		id: '3',
		user_id: '3',
		author: 'Author 3',
		performer: 'Performer 3',
		title: 'Title 3',
		genre: 'Genre 3',
		mood: 'Mood 3',
		song_path: 'SongsPath 3',
		image_path: 'ImagePath 3',
		listen_counter: 3,
		album_id: '3',
	}
];

export const agm = { author: 'Author', genre: 'Genre', mood: 'Mood' };

export const mostListenedAgm = { author: 'Author 3', genre: 'Genre 3', mood: 'Mood 3' };

export const songsWithSameAGM: Song[] = [
	{
		id: '1',
		user_id: '1',
		author: 'Author',
		performer: 'Performer 1',
		title: 'Title 1',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 1',
		image_path: 'ImagePath 1',
		listen_counter: 1,
		album_id: '1',
	},
	{
		id: '2',
		user_id: '2',
		author: 'Author',
		performer: 'Performer 2',
		title: 'Title 2',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 2',
		image_path: 'ImagePath 2',
		listen_counter: 2,
		album_id: '2',
	},
	{
		id: '3',
		user_id: '3',
		author: 'Author',
		performer: 'Performer 3',
		title: 'Title 3',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 3',
		image_path: 'ImagePath 3',
		listen_counter: 3,
		album_id: '3',
	}
];

export const LC = 5;
export const songsWithSameLC: Song[] = [
	{
		id: '1',
		user_id: '1',
		author: 'Author',
		performer: 'Performer 1',
		title: 'Title 1',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 1',
		image_path: 'ImagePath 1',
		listen_counter: LC,
		album_id: '1',
	},
	{
		id: '2',
		user_id: '2',
		author: 'Author',
		performer: 'Performer 2',
		title: 'Title 2',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 2',
		image_path: 'ImagePath 2',
		listen_counter: LC,
		album_id: '2',
	},
	{
		id: '3',
		user_id: '3',
		author: 'Author',
		performer: 'Performer 3',
		title: 'Title 3',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 3',
		image_path: 'ImagePath 3',
		listen_counter: LC,
		album_id: '3',
	}
];

export const zeroLC = 0;
export const songsWithZeroLC: Song[] = [
	{
		id: '1',
		user_id: '1',
		author: 'Author',
		performer: 'Performer 1',
		title: 'Title 1',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 1',
		image_path: 'ImagePath 1',
		listen_counter: zeroLC,
		album_id: '1',
	},
	{
		id: '2',
		user_id: '2',
		author: 'Author',
		performer: 'Performer 2',
		title: 'Title 2',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 2',
		image_path: 'ImagePath 2',
		listen_counter: zeroLC,
		album_id: '2',
	},
	{
		id: '3',
		user_id: '3',
		author: 'Author',
		performer: 'Performer 3',
		title: 'Title 3',
		genre: 'Genre',
		mood: 'Mood',
		song_path: 'SongsPath 3',
		image_path: 'ImagePath 3',
		listen_counter: zeroLC,
		album_id: '3',
	}
];

export const emptySongs: Song[] = [];
