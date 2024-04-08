'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Tooltip } from 'react-tooltip';

import useAuthModal from '@/hooks/useAuthModal';
import useAddToAlbumModal from '@/hooks/useAddToAlbumModal';
import { useUser } from '@/hooks/useUser';

import { AiOutlineFolderAdd } from 'react-icons/ai';

import { Album } from '@/types';

interface AddToAlbumButtonProps {
	songId: string;
	albums: Album[];
}

const AddToAlbumButton: React.FC<AddToAlbumButtonProps> = ({ songId, albums }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();
	const authModal = useAuthModal();
	const addToAlbumModal = useAddToAlbumModal();
	const { user } = useUser();

	useEffect(() => {
		if (!user?.id) {
			return;
		}
	}, [songId, supabaseClient, user?.id]);

	const handleAddToAlbum = async () => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}

		addToAlbumModal.props.songId = songId;
		addToAlbumModal.props.albums = albums;
		addToAlbumModal.onOpen();

		router.refresh();
	};

	return (
		<button className='hover:opacity-75 transition' onClick={handleAddToAlbum}>
			<AiOutlineFolderAdd color='white' className='add-to-album-button' size='22' />
			<Tooltip anchorSelect='.add-to-album-button' place='bottom'>
				Добавить в Альбом
			</Tooltip>
		</button>
	);
};

export default AddToAlbumButton;
