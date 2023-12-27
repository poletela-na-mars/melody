'use client';

import React, { useEffect } from 'react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import useAuthModal from '@/hooks/useAuthModal';
import { authIntl } from '@/consts/authIntl';

import Modal from './Modal';

import { theme } from '@/theme';
import { authProviders } from '@/consts/authProviders';

const AuthModal = () => {
	const supabaseClient = useSupabaseClient();
	const router = useRouter();
	const { session } = useSessionContext();
	const { onClose, isOpen } = useAuthModal();

	useEffect(() => {
		if (session) {
			router.refresh();
			onClose();
		}
	}, [onClose, router, session]);

	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};

	return (
		<Modal title='С возвращением!' description='Войдите в свой аккаунт' isOpen={isOpen} onChange={onChange}>
			<Auth supabaseClient={supabaseClient} theme='dark' magicLink providers={authProviders}
				localization={{
					variables: {
						...authIntl
					},
				}}
				appearance={{
					theme: ThemeSupa, variables: {
						default: {
							colors: {
								brand: theme.darkGray,
								brandAccent: theme.mainBlue,
							}
						}
					}
				}} />
		</Modal>
	);
};

export default AuthModal;
