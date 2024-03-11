import React from 'react';

import getSongs from '@/actions/getSongs';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import UserLabel from '@/components/UserLabel';
import Controls from '@/components/Controls';

import { TbPlaylist } from 'react-icons/tb';

export const revalidate = 0;

export default async function Home() {
	const songs = await getSongs();

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mb-2'>
					<UserLabel />

					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
						<ListItem image='/images/liked.png' name='Любимая музыка' href='liked' />
					</div>
					<Controls className='md:hidden flex justify-center gap-x-8 mt-4' songs={songs} iconSize={26}>
						<TbPlaylist className='text-neutral-400 hover:text-white transition' size={26} />
					</Controls>
				</div>
			</Header>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-white text-2xl font-semibold'>
						Новинки
					</h1>
				</div>
				<div>
					<PageContent songs={songs} />
				</div>
			</div>
		</div>
	);
}
