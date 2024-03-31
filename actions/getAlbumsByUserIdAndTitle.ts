import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import getAlbumsByUserId from '@/actions/getAlbumsByUserId';

import { Album } from '@/types';

const getAlbumsByUserIdAndTitle = async (title: string): Promise<Album[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	if (!title) {
		return await getAlbumsByUserId();
	}

	const { data, error } = await supabase
		.from('albums')
		.select('*')
		.eq('user_id', sessionData.session?.user.id)
		.ilike('title', `%${title}%`)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getAlbumsByUserIdAndTitle;
