'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ListItemProps {
	image: string;
	name: string;
	href?: string;
	onClickAction?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href, onClickAction }) => {
	const router = useRouter();

	const onClick = () => {
		if (href) {
			router.push(href);
		} else if (onClickAction) {
			onClickAction();
		}
	};

	return (
		<button onClick={onClick}
			className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
			<div className='relative min-h-[64px] min-w-[64px]'>
				<Image className='object-cover' fill src={image} alt='Image' />
			</div>

			<p className='font-medium truncate py-5'>
				{name}
			</p>
		</button>
	);
};

export default ListItem;
