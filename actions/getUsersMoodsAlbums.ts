import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { fakeAlbum } from '@/consts/forYouAlbums';

import { Album } from '@/types';

const getUsersMoodsAlbums = async (): Promise<Album[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	const { data, error } = await supabase
		.from('songs')
		.select('mood')
		.eq('user_id', sessionData.session?.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	const allMoods = data?.map((g) => g && g.mood);

	const uniqueMoods = Array.from(new Set(allMoods));

	const usersMoodsAlbums: Album[] = [];
	uniqueMoods.forEach((obj) => obj && usersMoodsAlbums.push(fakeAlbum(obj)));

	return usersMoodsAlbums || [];
};

export default getUsersMoodsAlbums;
