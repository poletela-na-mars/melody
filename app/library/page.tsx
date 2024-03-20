import React from 'react';

import Header from '@/components/Header';
import LibraryContent from './components/LibraryContent';

import getSongsByTitle from '@/actions/getSongsByTitle';
import SearchInput from '@/components/SearchInput';

interface LibraryProps {
	searchParams: {
		title: string;
	}
}

export const revalidate = 0;

const Library = async ({ searchParams }: LibraryProps) => {
	// TODO: getSongsByUserIdAndTitle
	const songs = await getSongsByTitle(searchParams.title);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<h1 className='text-white text-3xl font-semibold py-4'>
					Ваша Библиотека
				</h1>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h2 className='text-white text-3xl font-semibold'>
						<SearchInput placeholder='Введите название песни...' />
					</h2>
				</div>
			</Header>
			<LibraryContent songs={songs} />
		</div>
	);
};

export default Library;
