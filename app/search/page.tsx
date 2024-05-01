import React from 'react';

import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';

import getAlbumsByUserIdAndTitle from '@/actions/getAlbumsByUserIdAndTitle';
import getSongsByUserIdAndTitle from '@/actions/getSongsByUserIdAndTitle';
import getMixesByTitle from '@/actions/getMixesByTitle';

interface SearchProps {
	searchParams: {
		title: string;
	}
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
	const songs = await getSongsByUserIdAndTitle(searchParams.title);
	const albums = await getAlbumsByUserIdAndTitle(searchParams.title);
	const mixes = await getMixesByTitle(searchParams.title);

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<h1 className='text-white text-3xl font-semibold py-4'>
					Поиск
				</h1>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h2 className='text-white text-3xl font-semibold'>
						<SearchInput placeholder='Введите название песни или альбома...' />
					</h2>
				</div>
			</Header>
			<SearchContent songs={songs} albums={albums} mixes={mixes} />
		</div>
	);
};

export default Search;
