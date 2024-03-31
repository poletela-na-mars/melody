import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Album } from '@/types';

const getAlbumsByUserId = async (): Promise<Album[]> => {
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
		.eq('user_id', sessionData.session?.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getAlbumsByUserId;
