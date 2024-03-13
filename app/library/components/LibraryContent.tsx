'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import ListItem from '@/components/ListItem';
import AlbumItem from '@/components/AlbumItem';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';

import { Song } from '@/types';

interface LibraryContentProps {
	songs: Song[];
}

const LibraryContent: React.FC<LibraryContentProps> = ({ songs }) => {
	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();

	const onPlay = useOnPlay(songs);

	useEffect(() => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}
	}, []);

	if (!songs.length) {
		return (
			<div className='lfex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				Музыка не найдена
			</div>
		)
	}

	return (
		<div className='w-full px-6'>
			<div className='flex items-center gap-x-4 overflow-y-auto'>
				{/*TODO - Add opening popup for Adding Album*/}
				<ListItem image='/images/new-album.png' name='Создать Альбом' onClickAction={() => {
				}} />
				<ListItem image='/images/liked.png' name='Любимая музыка' href='liked' />
				{/*TODO - Play Recommended music*/}
				<ListItem image='/images/recommended-music.png' name='Рекомендованная музыка' onClickAction={() => {
				}} />
			</div>
			{
				songs &&
				<>
					<h2 className='text-white text-2xl font-semibold pb-0 pt-5'>
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
						mt-4
					`}>
						{
							// TODO - albums instead of songs
							songs.map((song) =>
								// TODO - Album Page
								<AlbumItem key={song.id} onClick={(id: string) => onPlay(id)} data={song} />
							)
						}
					</div>
				</>
			}
			<h2 className='text-white text-2xl font-semibold pb-0 pt-5'>
				Песни
			</h2>
			<div className='flex flex-col gap-y-2 pt-6'>
				{
					songs.map((song) => (
						<div key={song.id} className='flex items-center gap-x-4'>
							<div className='flex-1'>
								<MediaItem data={song} onClick={(id: string) => onPlay(id)} />
							</div>
							<LikeButton songId={song.id} />
						</div>
					))
				}
			</div>
		</div>
	);
};

export default LibraryContent;
