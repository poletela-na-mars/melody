'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

import { Song } from '@/types';

interface LikedContentProps {
	songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const onPlay = useOnPlay(songs);

	const router = useRouter();
	const { isLoading, user } = useUser();

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	if (!songs.length) {
		return <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
			No liked songs
		</div>
	}

	return (
		<div className='flex flex-col gap-y-2 w-full p-6'>
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

export default LikedContent;
