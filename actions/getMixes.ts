import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { domUserId } from '@/consts/domUserId';

import { Album } from '@/types';

const getMixes = async (): Promise<Album[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	const { data, error } = await supabase
		.from('albums')
		.select('*')
		.eq('user_id', domUserId)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	return (data as any) || [];
};

export default getMixes;
