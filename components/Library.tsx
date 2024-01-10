'use client';

import React from 'react';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';
import usePlayer from '@/hooks/usePlayer';

import MediaItem from './MediaItem';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoShuffleOutline } from 'react-icons/io5';

import { Song } from '@/types';
import { shuffleArray } from '@/utils/shuffleArray';
import { Tooltip } from 'react-tooltip';

interface LibraryProps {
	songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
	const authModal = useAuthModal();
	const uploadModal = useUploadModal();
	const { user } = useUser();

	const player = usePlayer();
	const onPlay = useOnPlay(songs);

	const onShuffleSongsButtonClick = () => {
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
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist className='text-neutral-400' size={26} />
					<p className='text-neutral-400 font-medium text-md'>
						Ваша библиотека
					</p>
				</div>
				<div className='inline-flex items-center gap-x-2'>
					<IoShuffleOutline onClick={onShuffleSongsButtonClick} size={20}
						className='shuffle text-neutral-400 cursor-pointer hover:text-white transition' />
					<Tooltip anchorSelect='.shuffle' place='bottom'>
						Перемешать музыку
					</Tooltip>
					<AiOutlinePlus onClick={onAddSongButtonClick} size={20}
						className='add-music text-neutral-400 cursor-pointer hover:text-white transition' />
					<Tooltip anchorSelect='.add-music' place='bottom'>
						Добавить музыку
					</Tooltip>
				</div>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3'>
				{
					songs.map((item) =>
						<MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item} />
					)
				}
			</div>
		</div>
	);
};

export default Library;
