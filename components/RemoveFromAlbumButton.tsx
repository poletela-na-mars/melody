'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Tooltip } from 'react-tooltip';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { AiOutlineDelete } from 'react-icons/ai';
import toast from 'react-hot-toast';

interface RemoveFromAlbumButtonProps {
	songId: string;
	albumId: string;
}

const RemoveFromAlbumButton: React.FC<RemoveFromAlbumButtonProps> = ({ songId, albumId }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();
	const authModal = useAuthModal();
	const { user } = useUser();

	useEffect(() => {
		if (!user?.id) {
			return;
		}
	}, [songId, supabaseClient, user?.id]);

	const handleRemoveFromAlbum = async () => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}

		const albumsData = await supabaseClient
			.from('songs')
			.select('albums')
			.eq('id', songId);
		let albums = albumsData.data?.map((a) => a.albums);
		const updAlbums = albums && albums[0]?.filter((album: string) => album != albumId);

		try {
			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.update({
					albums: updAlbums,
				})
				.eq('id', songId);

			if (supabaseError) {
				return toast.error(supabaseError.message);
			}

			router.refresh();
			toast.success('Песня больше не в альбоме');
		} catch (err) {
			toast.error('Что-то пошло не так!');
		}
	};

	return (
		<button className='hover:opacity-75 transition' onClick={handleRemoveFromAlbum}>
			<AiOutlineDelete color='white' className='remove-from-album-button' size='22' />
			<Tooltip anchorSelect='.remove-from-album-button' place='bottom'>
				Убрать из Альбома
			</Tooltip>
		</button>
	);
};

export default RemoveFromAlbumButton;
