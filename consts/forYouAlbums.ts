import { v4 as uuidv4 } from 'uuid';

import { Album } from '@/types';

export const GENRE = 'genre';
export const MOOD = 'mood';

export const forYouAlbums = [
	{
		name: 'по жанрам',
		type: GENRE,
		image_path: '/images/genre.png'
	}, {
		name: 'по настроениям',
		type: MOOD,
		image_path: '/images/mood.png'
	}
];

export const fakeForYouAlbum = (album: typeof forYouAlbums[number]): Album => {
	return { title: album.name, id: album.type, user_id: '', image_path: album.image_path };
};

export const fakeAlbum = (value: string, imagePath: string): Album => {
	return { title: value, id: uuidv4(), user_id: '', image_path: imagePath || '' };
};
