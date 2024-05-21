import React from 'react';

import getSongsByUserId from '@/actions/getSongsByUserId';
import getLikedSongs from '@/actions/getLikedSongs';
import getAlbumsByUserId from '@/actions/getAlbumsByUserId';

import Header from '@/components/Header';
import StatContent from './components/StatContent';

const Stat = async () => {
	const songs = await getSongsByUserId();
	const likedSongs = await getLikedSongs();
	const albums = await getAlbumsByUserId();

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900' data-testid='header'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-white text-3xl font-semibold'>
						Статистика по <p className='text-mainBlue inline'>прослушанной</p> Вами музыке
					</h1>
				</div>
			</Header>
			<StatContent songs={songs} likedSongs={likedSongs} albums={albums} data-testid='stat-content' />
		</div>
	);
};

export default Stat;
