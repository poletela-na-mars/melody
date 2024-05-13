'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

import Button from '@/components/Button';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string
);

const AccountContent = async () => {
	const router = useRouter();
	const { user } = useUser();
	const authModal = useAuthModal();

	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, [user, router]);

	const onDeleteUserButtonClick = async () => {
		try {
			const { data, error: userDeleteError } = await supabaseAdmin.auth.admin.deleteUser(user?.id as string);

			const error = userDeleteError;
			if (error) {
				return toast.error(error.message);
			}

			toast.success('Аккаунт пользователя удален');
			router.replace('/');
			return authModal.onOpen();
		} catch (err) {
			toast.error('Что-то пошло не так!');
		}
	};

	return (
		<div className='mb-7 px-6'>
			<Button
				onClick={onDeleteUserButtonClick}
				className='w-[200px]'
			>
				Удалить аккаунт
			</Button>
		</div>
	);
};

export default AccountContent;
