import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import getMixes from '@/actions/getMixes';

import { Album } from '@/types';
import { domUserId } from '@/consts/domUserId';

const getMixesByTitle = async (title: string): Promise<Album[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	if (!title) {
		return await getMixes();
	}

	const { data, error } = await supabase
		.from('albums')
		.select('*')
		.eq('user_id', domUserId)
		.ilike('title', `%${title}%`)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getMixesByTitle;
