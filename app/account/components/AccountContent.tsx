'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';

// TODO - Fill Account Content

const AccountContent = () => {
	const router = useRouter();
	const { isLoading, user } = useUser();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/');
		}
	}, [isLoading, user, router]);

	return (
		<div className='mb-7 px-6'>
			{/*{*/}
			{/*	!subscription ? (*/}
			{/*		<div className='flex flex-col gap-y-4'>*/}
			{/*			<p>У Вас нет подписки.</p>*/}
			{/*			<Button*/}
			{/*				onClick={subscribeModal.onOpen}*/}
			{/*				className='w-[300px]'*/}
			{/*			>*/}
			{/*				Оформить подписку*/}
			{/*			</Button>*/}
			{/*		</div>*/}
			{/*	) : (*/}
			{/*		<div className='flex flex-col gap-y-4'>*/}
			{/*			<p>*/}
			{/*				У Вас уже есть подписка <b>{subscription?.prices?.products?.name}</b>.*/}
			{/*			</p>*/}
			{/*			<Button disabled={loading || isLoading} onClick={redirectCustomerPortal} className='w-[300px]'>*/}
			{/*				Посмотреть подробности подписки*/}
			{/*			</Button>*/}
			{/*		</div>*/}
			{/*	)*/}
			{/*}*/}
		</div>
	);
};

export default AccountContent;
