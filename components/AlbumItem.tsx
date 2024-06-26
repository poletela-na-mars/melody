'use client';

import React from 'react';
import Image from 'next/image';

import GoButton from '@/components/GoButton';

import useLoadImage from '@/hooks/useLoadImage';

import { Album } from '@/types';

interface AlbumItemProps {
	data: Album;
	onClick: (id: string) => void;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ data, onClick }) => {
	let imagePath = '';
	imagePath = useLoadImage(data) as string;

	if (data.image_path && data.image_path.startsWith('/images')) {
		imagePath = data.image_path;
	}

	return (
		<div onClick={() => onClick(data.id)} className={`relative group flex flex-col items-center justify-center
		 rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3`}>
			<div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
				<Image className='object-cover' src={imagePath || '/images/album.png'} alt='Album cover' fill />
			</div>
			<div className='flex flex-col items-start w-full pt-4 gap-y-1'>
				<p className='font-semibold truncate w-full'>
					{data.title}
				</p>
			</div>
			<div className='absolute bottom-5 right-5'>
				<GoButton />
			</div>
		</div>
	);
};

export default AlbumItem;
