import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song, Album } from '@/types';

const useLoadImage = <T extends Song | Album>(obj: T) => {
	const supabaseClient = useSupabaseClient();

	if (!obj || !obj.image_path) {
		return null;
	}

	const { data: imageData } = supabaseClient
		.storage
		.from('images')
		.getPublicUrl(obj.image_path);

	return imageData.publicUrl;
};

export default useLoadImage;
