'use client';

import React from 'react';

import { useUser } from '@/hooks/useUser';
import { getUserNameFromEmail } from '@/utils/getUserNameFromEmail';

const UserLabel = () => {
	const { user } = useUser();
	const name = getUserNameFromEmail(user?.email) || 'Аноним';

	return (
		<h1 className='text-white text-3xl font-semibold'>
			Привет, {name}
		</h1>
	);
};

export default UserLabel;
