'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useGetSongById from '@/hooks/useGetSongById';

import { AiOutlineDelete } from 'react-icons/ai';

interface DeleteSongButtonProps {
	songId: string;
}

const DeleteSongButton: React.FC<DeleteSongButtonProps> = ({ songId }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();
	const authModal = useAuthModal();
	const { user } = useUser();
	const { song } = useGetSongById(songId);

	useEffect(() => {
		if (!user?.id) {
			return;
		}
	}, [songId, supabaseClient, user?.id]);

	const handleRemoveSong = async () => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}

		try {
			if (song?.image_path) {
				await supabaseClient
					.storage
					.from('images')
					.remove([song?.image_path]);
			}

			if (song?.song_path) {
				await supabaseClient
					.storage
					.from('songs')
					.remove([song?.song_path]);
			}

			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.delete()
				.eq('id', songId);

			if (supabaseError) {
				return toast.error(supabaseError.message);
			}

			router.refresh();
			toast.success('Песня удалена');
		} catch (err) {
			toast.error('Что-то пошло не так!');
		}
	};

	return (
		<button className='hover:opacity-75 transition' onClick={handleRemoveSong}>
			<AiOutlineDelete color='white' className='remove-song-button' size='22' />
			<Tooltip anchorSelect='.remove-song-button' place='bottom'>
				Удалить песню
			</Tooltip>
		</button>
	);
};

export default DeleteSongButton;
