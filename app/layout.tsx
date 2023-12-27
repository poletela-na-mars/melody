import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import getSongsByUserId from '@/actions/getSongsByUserId';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';

import SideBar from '@/components/SideBar';
import Player from '@/components/Player';

import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Melody',
	description: 'Найди свою мелодию',
}

export const revalidate = 0;

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
	const userSongs = await getSongsByUserId();
	const products = await getActiveProductsWithPrices();

	return (
		<html lang='en'>
			<body className={font.className}>
				<ToasterProvider />
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider products={products} />
						<SideBar songs={userSongs}>
							{children}
						</SideBar>
						<Player />
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
