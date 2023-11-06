'use client';

import React, { useEffect, useState } from 'react';

import Modal from '@/components/Modal';

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Modal title='Test' description='descr' isOpen onChange={() => {
		}}>
			Test
		</Modal>
	);
};

export default ModalProvider;
