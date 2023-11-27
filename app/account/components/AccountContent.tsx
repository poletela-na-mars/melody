'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';

const AccountContent = () => {
	const router = useRouter();
	const subscribeModal = useSubscribeModal();
	const { isLoading, subscription, user } = useUser();

	const [loading, setLoading] = useState(false);

	return (
		<div>AccountContent</div>
	);
};

export default AccountContent;
