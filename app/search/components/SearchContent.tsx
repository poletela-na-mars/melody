'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Song } from '@/types';

interface SearchContentProps {
	songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
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

	if (!songs.length) {
		return (
			<div className='lfex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				Музыка не найдена
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-y-2 w-full px-6'>
			{
				songs.map((song) => (
					<div key={song.id} className='flex items-center gap-x-4 w-full'>
						<div className='flex-1'>
							<MediaItem data={song} onClick={(id: string) => onPlay(id)} />
						</div>
						<LikeButton songId={song.id} />
					</div>
				))
			}
		</div>
	);
};

export default SearchContent;
