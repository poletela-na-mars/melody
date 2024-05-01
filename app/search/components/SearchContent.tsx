'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import AlbumItem from '@/components/AlbumItem';
import AddToAlbumButton from '@/components/AddToAlbumButton';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Album, Song } from '@/types';

interface SearchContentProps {
	songs: Song[];
	albums: Album[];
	mixes: Album[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, albums, mixes }) => {
	const onPlay = useOnPlay(songs);

	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}
	}, []);

	return (
		<div className='w-full px-6 pb-5'>
			<h2 className='text-white text-2xl font-semibold'>
				Подборки
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
					mixes.length
						? mixes.map((mix) =>
							<AlbumItem key={mix.id} onClick={(id: string) => router.push(`/albums/${id}`)} data={mix} />
						)
						: <h2 className='text-neutral-400 pb-6 col-span-full'>
							Подборки не найдены
						</h2>
				}
			</div>
			<h2 className='text-white text-2xl font-semibold  pb-0 pt-5'>
				Альбомы
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
						? albums.map((album) =>
							<AlbumItem key={album.id} onClick={(id: string) => router.push(`/albums/${id}`)} data={album} />
						)
						: <h2 className='text-neutral-400 pb-6 col-span-full'>
							Альбомы не найдены
						</h2>
				}
			</div>
			<h2 className='text-white text-2xl font-semibold pb-0 pt-5'>
				Песни
			</h2>
			<div className='flex flex-col gap-y-2 pt-6'>
				{
					songs.length
						? songs.map((song) => (
							<div key={song.id} className='flex items-center gap-x-4'>
								<div className='flex-1'>
									<MediaItem data={song} onClick={(id: string) => onPlay(id)} />
								</div>
								<LikeButton songId={song.id} />
								<AddToAlbumButton songId={song.id} albums={albums} />
							</div>
						))
						: <h2 className='text-neutral-400 pb-6'>
							Музыка не найдена
						</h2>
				}
			</div>
		</div>
	);
};

export default SearchContent;
