'use client';

import React from 'react';
import { Tooltip } from 'react-tooltip';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

import { IoShuffleOutline } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import usePlayer from '@/hooks/usePlayer';
import useOnPlay from '@/hooks/useOnPlay';

import { shuffleArray } from '@/utils/shuffleArray';

import { Song } from '@/types';

interface ControlsProps {
	songs: Song[];
	className?: string;
	iconSize: number;
	mobVersion: boolean;
}

const Controls: React.FC<ControlsProps> = ({ songs, className, iconSize, mobVersion }) => {
	const authModal = useAuthModal();
	const uploadModal = useUploadModal();
	const { user } = useUser();
	const router = useRouter();

	const player = usePlayer();
	const onPlay = useOnPlay(songs);

	const onShuffleSongsButtonClick = () => {
		if (!user) {
			return authModal.onOpen();
		}

		const shuffledSongs = songs;
		shuffleArray(shuffledSongs);

		player.reset();

		onPlay(shuffledSongs[0].id);
	};

	const onAddSongButtonClick = () => {
		if (!user) {
			return authModal.onOpen();
		}

		return uploadModal.onOpen();
	};

	return (
		<div className={twMerge('inline-flex items-center gap-x-2', className)}>
			{
				mobVersion &&
					<TbPlaylist className='text-neutral-400 hover:text-white transition' size={26} onClick={() => router.push('/library')} />
			}
			<IoShuffleOutline onClick={onShuffleSongsButtonClick} size={iconSize}
				className='shuffle text-neutral-400 cursor-pointer hover:text-white transition' />
			<Tooltip anchorSelect='.shuffle' place='bottom'>
				Перемешать музыку
			</Tooltip>
			<AiOutlinePlus onClick={onAddSongButtonClick} size={iconSize}
				className='add-music text-neutral-400 cursor-pointer hover:text-white transition' />
			<Tooltip anchorSelect='.add-music' place='bottom'>
				Добавить музыку
			</Tooltip>
		</div>
	);
};

export default Controls;
