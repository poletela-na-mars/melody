'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import Header from '@/components/Header';
import RemoveFromAlbumButton from '@/components/RemoveFromAlbumButton';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useLoadImage from '@/hooks/useLoadImage';
import useOnPlay from '@/hooks/useOnPlay';
import { getUserNameFromEmail } from '@/utils/getUserNameFromEmail';

import { Album, Song } from '@/types';

interface AlbumContentProps {
	songs: Song[];
	album: Album;
}

const AlbumContent: React.FC<AlbumContentProps> = ({ songs, album }: AlbumContentProps) => {
	const onPlay = useOnPlay(songs);

	const authModal = useAuthModal();
	const { user } = useUser();
	const router = useRouter();

	const imagePath = useLoadImage(album);

	useEffect(() => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}
	}, []);

	return (
		<>
			<Header className='from-bg-neutral-900'>
				<div className='flex items-end gap-x-4 mt-8'>
					<div className='relative min-h-[100px] min-w-[100px] overflow-hidden rounded-md'>
						<Image className='object-cover rounded-md' fill src={imagePath || '/images/album.png'} alt='Album Cover' />
					</div>
					<div>
						<h2 className='text-white text-3xl font-semibold'>
							{album.title}
						</h2>
						<p className='text-neutral-400 text-md font-medium'>
							{user?.id && getUserNameFromEmail(user?.email)}
						</p>
					</div>
				</div>
			</Header>
			<div className='w-full px-6 pb-5'>
				<div className='flex flex-col gap-y-2 pt-6'>
					{
						songs.length
							? songs.map((song) => (
								<div key={song.id} className='flex items-center gap-x-4'>
									<div className='flex-1'>
										<MediaItem data={song} onClick={(id: string) => onPlay(id)} />
									</div>
									<LikeButton songId={song.id} />
									<RemoveFromAlbumButton songId={song.id} />
								</div>
							))
							: <h2 className='text-neutral-400 pb-6'>
								Музыка не найдена
							</h2>
					}
				</div>
			</div>
		</>
	);
};

export default AlbumContent;
