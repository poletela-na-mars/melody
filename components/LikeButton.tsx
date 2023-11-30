'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { theme } from '@/theme';

interface LikeButtonProps {
	songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();

	const authModal = useAuthModal();
	const { user } = useUser();

	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (!user?.id) {
			return;
		}

		const fetchData = async () => {
			const { data, error } = await supabaseClient
				.from('liked_songs')
				.select('*')
				.eq('user_id', user.id)
				.eq('song_id', songId)
				.single();

			if (!error && data) {
				setIsLiked(true);
			}
		};

		fetchData();
	}, [songId, supabaseClient, user?.id]);

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

	const handleLike = async () => {
		if (!user) {
			return authModal.onOpen();
		}

		if (isLiked) {
			const { error } = await supabaseClient
				.from('liked_songs')
				.delete()
				.eq('user_id', user.id)
				.eq('song_id', songId);

			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(false);
				toast.success('You don\'t like this song anymore');
			}
		} else {
			const { error } = await supabaseClient
				.from('liked_songs')
				.insert({
					song_id: songId,
					user_id: user.id
				});

			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(true);
				toast.success('You liked this song');
			}
		}

		router.refresh();
	};

	return (
		<button className='hover:opacity-75 transition' onClick={handleLike}>
			<Icon color={isLiked ? theme.mainBlue : 'white'} />
		</button>
	);
};

export default LikeButton;
