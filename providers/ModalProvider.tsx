'use client';

import React, { useEffect, useState } from 'react';

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import AddAlbumModal from '@/components/AddAlbumModal';

const ModalProvider: React.FC = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<AuthModal />
			<UploadModal />
			<AddAlbumModal />
		</>
	);
};

export default ModalProvider;
