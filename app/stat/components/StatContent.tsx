'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';

import { getNumberOfListenedSongs } from '@/utils/getNumberOfListenedSongs';

import { Album, Song } from '@/types';
import { getFavourites } from '@/utils/getFavourites';

interface StatContentProps {
	songs: Song[];
	likedSongs: Song[];
	albums: Album[];
}

const StatContent: React.FC<StatContentProps> = async ({ songs, likedSongs, albums }: StatContentProps) => {
	const router = useRouter();
	const { user } = useUser();

	const [listenedSongs, setListenedSongs] = useState(0);
	const [listenedSongsWithRepeat, setListenedSongsWithRepeat] = useState(0);
	const [favAuthor, setFavAuthor] = useState('неизвестно');
	const [favGenre, setFavGenre] = useState('неизвестно');
	const [favMood, setFavMood] = useState('неизвестно');

	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, [user, router]);

	useEffect(() => {
		const { listenedSongs: lS, withRepeat: r } = getNumberOfListenedSongs(songs);
		setListenedSongs(lS);
		setListenedSongsWithRepeat(r);

		const { favAuthor: fA, favGenre: fG, favMood: fM } = getFavourites(songs);
		setFavAuthor(fA);
		setFavGenre(fG);
		setFavMood(fM);
	}, []);

	return (
		<div className='mb-7 px-6 flex flex-col gap-y-4'>
			<h2 className='text-xl'>За все время Вы прослушали <p
				className='inline text-3xl text-mainGreen'>{listenedSongs}</p> пес(-ен/-ни/-ню),
			</h2>
			<h2 className='text-xl'>А с учетом повторов <p
				className='inline text-3xl text-mainGreen'>{listenedSongsWithRepeat}</p> пес(-ен/-ни/-ню).
			</h2>
			<h2 className='text-xl'>Вы добавили <p className='inline text-3xl text-mainGreen'>{songs.length}</p> трек(-ов/-а)
				и <p className='inline text-3xl text-mainGreen'>{albums.length}</p> альбом(-ов/-а).
			</h2>
			<h2 className='text-xl'>У Вас <p className='inline text-3xl text-mainGreen'>{likedSongs.length}</p> любим(-ых/-ый)
				трека.
			</h2>
			<h2 className='text-xl'>Чаще всего Вы слушали <p className='inline text-3xl text-mainGreen'>{favAuthor}</p>.</h2>
			<h2 className='text-xl'>Ваш любимый жанр - <p className='inline text-3xl text-mainGreen'>{favGenre}</p>.</h2>
			<h2 className='text-xl'>Обычно настроение Вашей музыки звучит как <p
				className='inline text-3xl text-mainGreen'>{favMood}</p>.
			</h2>
		</div>
	);
};

export default StatContent;
