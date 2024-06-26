'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

import Box from './Box';
import SideBarItem from './SideBarItem';
import Library from './Library';

import usePlayer from '@/hooks/usePlayer';

import { Song } from '@/types';

interface SideBarProps {
	songs: Song[];
	children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children, songs }) => {
	const pathname = usePathname();
	const player = usePlayer();

	const routes = useMemo(() => [
		{
			icon: HiHome,
			label: 'Главное',
			active: pathname === '/',
			href: '/'
		},
		{
			icon: BiSearch,
			label: 'Поиск',
			active: pathname === '/search',
			href: '/search'
		},
		{
			icon: IoStatsChart,
			label: 'Статистика',
			active: pathname === '/stat',
			href: '/stat'
		}
	], [pathname]);

	return (
		<div className={twMerge(`
			flex
			h-full
		`, player.activeId && 'h-[calc(100%-80px)]')}>
			<div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{
							routes.map((item) =>
								<SideBarItem key={item.label} {...item} />
							)
						}
					</div>
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library songs={songs} />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>
				{children}
			</main>
		</div>
	);
};

export default SideBar;
