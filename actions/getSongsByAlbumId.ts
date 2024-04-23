import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getSongsByAlbumId = async (albumId: number): Promise<Song[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data, error } = await supabase
		.from('songs')
		.select('*')
		.eq('album_id', albumId)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getSongsByAlbumId;
