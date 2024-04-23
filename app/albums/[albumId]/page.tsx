import React from 'react';

import AlbumContent from '@/app/albums/[albumId]/components/AlbumContent';

import getSongsByAlbumId from '@/actions/getSongsByAlbumId';
import getAlbumById from '@/actions/getAlbumById';

const Album = async ({ params }: { params: { albumId: string } }) => {
	const { albumId } = params;
	const songs = await getSongsByAlbumId(Number(albumId));
	const album = await getAlbumById(Number(albumId));

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<AlbumContent songs={songs} album={album} />
		</div>
	);
};

export default Album;
