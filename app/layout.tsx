import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import SideBar from '@/components/SideBar';

import './globals.css';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Melody',
	description: 'Find your melody',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<SideBar>
					{children}
				</SideBar>
			</body>
		</html>
	)
}