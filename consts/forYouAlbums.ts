import { v4 as uuidv4 } from 'uuid';

import { Album } from '@/types';

export const GENRE = 'genre';
export const MOOD = 'mood';

export const forYouAlbums = [
	{
		name: 'по жанрам',
		type: GENRE
	}, {
		name: 'по настроениям',
		type: MOOD,
	}
];

export const fakeForYouAlbum = (album: typeof forYouAlbums[number]): Album => {
	return { title: album.name, id: album.type, user_id: '', image_path: '' };
};

export const fakeAlbum = (value: string): Album => {
	return { title: value, id: uuidv4(), user_id: '', image_path: '' };
};
