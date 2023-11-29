import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '@/types';

const useLoadImage = (song: Song) => {
	const supabaseClient = useSupabaseClient();

	if (!song || !song.image_path) {
		return null;
	}

	const { data: imageData } = supabaseClient
		.storage
		.from('images')
		.getPublicUrl(song.image_path);

	return imageData.publicUrl;
};

export default useLoadImage;
