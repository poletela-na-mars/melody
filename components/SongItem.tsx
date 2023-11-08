'use client';

import React from 'react';
import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';

interface SongItemProps {
	data: Song;
	onClick: (id: string) => void;
}

// TODO - change img for img without src

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
	const imagePath = useLoadImage(data);

	return (
		<div onClick={() => onClick(data.id)} className={`relative group flex flex-col items-center justify-center
		 rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3`}>
			<div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
				<Image className='object-cover' src={imagePath || '/images/liked.png'} alt='Song cover' fill />
			</div>
		</div>
	);
};

export default SongItem;
