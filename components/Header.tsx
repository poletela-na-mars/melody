'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

import Button from './Button';

import { useUser } from '@/hooks/useUser';
import usePlayer from '@/hooks/usePlayer';
import useAuthModal from '@/hooks/useAuthModal';

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

interface HeaderProps {
	children: React.ReactNode;
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
	const player = usePlayer();
	const authModal = useAuthModal();
	const router = useRouter();

	const supabaseClient = useSupabaseClient();
	const { user } = useUser();

	const handleLogout = async () => {
		// TODO - popup before logging out
		const { error } = await supabaseClient.auth.signOut();

		player.reset();
		router.refresh();

		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Вы вышли из аккаунта');
		}
	};

	return (
		<div className={twMerge(`h-fit bg-gradient-to-b from-mainBlue to-b
		p-6`, className)}>
			<div className='w-full mb-4 flex items-center justify-between'>
				<div className='hidden md:flex gap-x-2 items-center'>
					<button onClick={() => router.back()} 
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
						<RxCaretLeft className='caret-left text-white' size={35} />
						<Tooltip anchorSelect='.caret-left' place='bottom'>
							Нажмите, чтобы вернуться
						</Tooltip>
					</button>
					<button onClick={() => router.forward()} 
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
						<RxCaretRight className='caret-right text-white' size={35} />
						<Tooltip anchorSelect='.caret-right' place='bottom'>
							Нажмите, чтобы перейти вперед
						</Tooltip>
					</button>
				</div>

				<div className='flex md:hidden gap-x-4 items-center'>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
						<Link href='/'>
							<HiHome className='text-black' size={24} />
						</Link>
					</button>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
						<Link href='/search'>
							<BiSearch className='text-black' size={24} />
						</Link>
					</button>
				</div>

				<div className='flex items-center gap-x-4 flex-wrap justify-end gap-y-2'>
					{user
						? <div className='flex gap-x-4 items-center'>
							<Button onClick={handleLogout} className='bg-white p-2'>
								<FiLogOut size={24} className='log-out' />
								<Tooltip anchorSelect='.log-out' place='bottom'>
									Выйти из аккаунта
								</Tooltip>
							</Button>
							<Button onClick={() => router.push('/account')} className='bg-white'>
								<FaUserAlt className='profile' />
								<Tooltip anchorSelect='.profile' place='bottom'>
									Аккаунт
								</Tooltip>
							</Button>
						</div>
						:
						<>
							<div>
								<Button
									onClick={authModal.onOpen}
									className='bg-transparent border-solid border-white text-white px-6 py-2 font-medium'>
									Зарегистрироваться
								</Button>
							</div>
							<div>
								<Button
									onClick={authModal.onOpen}
									className='bg-white px-6 py-2'>
									Войти
								</Button>
							</div>
						</>
					}
				</div>

			</div>
			{children}
		</div>
	);
};

export default Header;
