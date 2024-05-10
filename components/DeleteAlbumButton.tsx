'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { AiOutlineDelete } from 'react-icons/ai';

import { Album } from '@/types';

interface DeleteAlbumButtonProps {
	album: Album;
}

const DeleteAlbumButton: React.FC<DeleteAlbumButtonProps> = ({ album }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();
	const authModal = useAuthModal();
	const { user } = useUser();

	useEffect(() => {
		if (!user?.id) {
			return;
		}
	}, [album, supabaseClient, user?.id]);

	const handleRemoveAlbum = async () => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}

		try {
			if (album?.image_path) {
				await supabaseClient
					.storage
					.from('images')
					.remove([album?.image_path]);
			}

			const { data: songs, error: songAlbumsError } = await supabaseClient
				.from('songs')
				.select('*')
				.contains('albums', [album.id])
				.order('created_at', { ascending: false })
				.limit(1000);

			if (songs) {
				for (const song of songs!) {
					await supabaseClient
						.from('songs')
						.update({
							albums: song.albums.filter((a: string) => a !== album.id),
						})
						.eq('id', song.id)
				}
			}

			const { error: deleteAlbumErr } = await supabaseClient
				.from('albums')
				.delete()
				.eq('id', album.id);

			const error = deleteAlbumErr || songAlbumsError;
			if (error) {
				return toast.error(error.message);
			}

			toast.success('Альбом удален');
			router.push('/library');
		} catch (err) {
			toast.error('Что-то пошло не так!');
		}
	};

	return (
		<button className='hover:opacity-75 transition' onClick={handleRemoveAlbum}>
			<AiOutlineDelete color='white' className='remove-album-button' size='28' />
			<Tooltip anchorSelect='.remove-album-button' place='bottom'>
				Удалить альбом
			</Tooltip>
		</button>
	);
};

export default DeleteAlbumButton;
