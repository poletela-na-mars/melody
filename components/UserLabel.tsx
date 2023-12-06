'use client';

import React from 'react';

import { useUser } from '@/hooks/useUser';

const getUserNameFromEmail = (email: string | undefined) => {
	if (!email) return;

	const [name] = email.split('@');
	return name;
};

const UserLabel = () => {
	const { user } = useUser();
	const name = getUserNameFromEmail(user?.email) || 'Anonymous';

	return (
		<h1 className='text-white text-3xl font-semibold'>
			Hello, {name}
		</h1>
	);
};

export default UserLabel;
