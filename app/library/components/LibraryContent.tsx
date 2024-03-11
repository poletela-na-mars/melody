'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';

import { Song } from '@/types';
import ListItem from '@/components/ListItem';

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
			<div className='flex items-center gap-x-4'>
				{/*TODO - Add opening popup for Adding Album*/}
				{/*TODO - make carousel*/}
				<ListItem image='/images/new-album.png' name='Создать Альбом' onClickAction={() => {}} />
				<ListItem image='/images/liked.png' name='Любимая музыка' href='liked' />
			</div>
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
