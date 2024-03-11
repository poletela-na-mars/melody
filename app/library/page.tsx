import React from 'react';

import Header from '@/components/Header';
import LibraryContent from './components/LibraryContent';

import getSongs from '@/actions/getSongs';

export const revalidate = 0;

const Library = async () => {
	const songs = await getSongs();

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<LibraryContent songs={songs} />
			</Header>
		</div>
	);
};

export default Library;
