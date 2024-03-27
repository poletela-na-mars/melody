import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import getSongsByUserId from '@/actions/getSongsByUserId';

import { Song } from '@/types';

const getSongsByUserIdAndTitle = async (title: string): Promise<Song[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	if (!title) {
		return await getSongsByUserId();
	}

	const { data, error } = await supabase
		.from('songs')
		.select('*')
		.eq('user_id', sessionData.session?.user.id)
		.ilike('title', `%${title}%`)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getSongsByUserIdAndTitle;
