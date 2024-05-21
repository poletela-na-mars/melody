import React from 'react';

import Header from '@/components/Header';
import LibraryContent from './components/LibraryContent';

import SearchInput from '@/components/SearchInput';

import getSongsByUserIdAndTitle from '@/actions/getSongsByUserIdAndTitle';
import getAlbumsByUserIdAndTitle from '@/actions/getAlbumsByUserIdAndTitle';

interface LibraryProps {
	searchParams: {
		title: string;
	}
}

export const revalidate = 0;

const Library = async ({ searchParams }: LibraryProps) => {
	const songs = await getSongsByUserIdAndTitle(searchParams.title);
	const albums = await getAlbumsByUserIdAndTitle(searchParams.title);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900' data-testid='header'>
				<h1 className='text-white text-3xl font-semibold py-4'>
					Ваша Библиотека
				</h1>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h2 className='text-white text-3xl font-semibold'>
						<SearchInput placeholder='Введите название песни или альбома...' data-testid='input' />
					</h2>
				</div>
			</Header>
			<LibraryContent songs={songs} albums={albums} data-testid='library-content' />
		</div>
	);
};

export default Library;
