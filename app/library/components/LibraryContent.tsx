'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Song } from '@/types';

interface LibraryContentProps {
	songs: Song[];
}

const LibraryContent: React.FC<LibraryContentProps> = ({ songs }) => {
	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}
	}, []);

	return (
		<div>LibraryContent</div>
	);
};

export default LibraryContent;
