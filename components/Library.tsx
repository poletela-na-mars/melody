'use client';

import React from 'react';
import Link from 'next/link';

import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from './MediaItem';
import Controls from './Controls';

import { TbPlaylist } from 'react-icons/tb';

import { Song } from '@/types';

interface LibraryProps {
	songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
	const onPlay = useOnPlay(songs);

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist className='text-neutral-400' size={26} />
					<Link href='/library'>
						<p className='text-neutral-400 font-medium text-md hover:text-white transition'>
							Ваша библиотека
						</p>
					</Link>
				</div>
				<Controls className='' songs={songs} iconSize={20} />
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
