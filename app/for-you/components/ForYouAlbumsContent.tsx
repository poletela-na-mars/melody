'use client';

import React, { useEffect, useState } from 'react';

import AlbumItem from '@/components/AlbumItem';

import useOnPlay from '@/hooks/useOnPlay';

import { fakeAlbum, forYouAlbums } from '@/consts/forYouAlbums';

import { Album, Song } from '@/types';

interface ForYouAlbumsContentProps {
	songs: Song[];
	albums: Album[];
	queryType: string;
}

const ForYouAlbumsContent = ({ songs, albums, queryType }: ForYouAlbumsContentProps) => {
	const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
	const onPlay = useOnPlay(filteredSongs);

	const type = forYouAlbums.find((album) => album.type === queryType)?.name;

	const sortSongsByType = (type: string) => {
		setFilteredSongs(songs.filter(song => song[queryType as keyof Song] === type));
	};

	useEffect(() => {
		if (filteredSongs.length) {
			onPlay(filteredSongs[0].id);
		}
	}, [filteredSongs]);

	return (
		<div className='w-full px-6 pb-5'>
			<h2 className='text-white text-2xl font-semibold  pb-0 pt-5'>
				Ваша музыка <p className='text-mainBlue'>{type || '...'}</p>
			</h2>
			<div className={`
							grid
							grid-cols-2
							sm:grid-cols-3
							md:grid-cols-3
							lg:grid-cols-4
							xl:grid-cols-5
							2xl:grid-cols-8
							gap-4
							mt-6
						`}>
				{
					albums.length
						? albums.map((album, idx) =>
							<AlbumItem key={idx} onClick={() => sortSongsByType(album.title)} data={fakeAlbum(album.title, '')} />
						)
						: <h2 className='text-neutral-400 pb-6 col-span-full'>
							Ваши подборки не найдены
						</h2>
				}
			</div>
		</div>
	);
};

export default ForYouAlbumsContent;
