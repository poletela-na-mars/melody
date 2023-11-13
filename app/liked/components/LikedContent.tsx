'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';

import { Song } from '@/types';

interface LikedContentProps {
	songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
	const router = useRouter();
	const { isLoading, user } = useUser();

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	return (
		<div>LikedContent</div>
	);
};

export default LikedContent;
