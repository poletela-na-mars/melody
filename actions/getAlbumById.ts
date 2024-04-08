import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Album } from '@/types';

const getAlbumById = async (albumId: number): Promise<Album> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	const { data, error } = await supabase
		.from('albums')
		.select('*')
		.eq('album_id', albumId)
		.single();

	if (error) {
		console.log(error.message);
	}

	return (data as any) || null;
};

export default getAlbumById;
