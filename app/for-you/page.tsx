import ForYouAlbumsContent from './components/ForYouAlbumsContent';

import getSongsByUserId from '@/actions/getSongsByUserId';
import getUsersGenresAlbums from '@/actions/getUsersGenresAlbums';
import getUsersMoodsAlbums from '@/actions/getUsersMoodsAlbums';

import { GENRE } from '@/consts/forYouAlbums';

export const revalidate = 0;

const ForYouAlbums = async ({ params, searchParams }: { params: { slug: string }; searchParams?: { [key: string]: string | string[] | undefined }; }) => {
	const queryType = searchParams?.type as string;

	const songs = await getSongsByUserId();
	const albums = queryType === GENRE ? await getUsersGenresAlbums() : await getUsersMoodsAlbums();

	return (
		<ForYouAlbumsContent songs={songs} albums={albums} queryType={queryType} />
	);
};

export default ForYouAlbums;
