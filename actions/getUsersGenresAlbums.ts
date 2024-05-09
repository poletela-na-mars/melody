import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { fakeAlbum } from '@/consts/forYouAlbums';

import { Album } from '@/types';

const getUsersGenresAlbums = async (): Promise<Album[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	});

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		console.log(sessionError.message);
	}

	const { data, error } = await supabase
		.from('songs')
		.select('genre')
		.eq('user_id', sessionData.session?.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error.message);
	}

	const allGenres = data?.map((g) => g && g.genre);

	const uniqueGenres = Array.from(new Set(allGenres));

	const usersGenresAlbums: Album[] = [];
	uniqueGenres.forEach((obj) => obj && usersGenresAlbums.push(fakeAlbum(obj, '')));

	return usersGenresAlbums || [];
};

export default getUsersGenresAlbums;
