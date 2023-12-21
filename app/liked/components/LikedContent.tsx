'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';
import usePlayer from '@/hooks/usePlayer';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

import { IoShuffleOutline } from 'react-icons/io5';

import { Song } from '@/types';
import { shuffleArray } from '@/utils/shuffleArray';

interface LikedContentProps {
	songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const onPlay = useOnPlay(songs);
	const player = usePlayer();

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

	const onShuffleSongsButtonClick = () => {
		const shuffledSongs = songs;
		shuffleArray(shuffledSongs);

		player.reset();

		onPlay(shuffledSongs[0].id);
	};

	return (
		<div className='flex flex-col gap-y-2 w-full p-6'>
			<IoShuffleOutline size={20} onClick={onShuffleSongsButtonClick}
				className='self-center md:self-end text-mainBlue cursor-pointer hover:text-white transition' />
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
