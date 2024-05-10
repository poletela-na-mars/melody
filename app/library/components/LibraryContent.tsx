'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import ListItem from '@/components/ListItem';
import AlbumItem from '@/components/AlbumItem';
import AddToAlbumButton from '@/components/AddToAlbumButton';
import DeleteSongButton from '@/components/DeleteSongButton';

import useAuthModal from '@/hooks/useAuthModal';
import useAddAlbumModal from '@/hooks/useAddAlbumModal';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';
import useUploadModal from '@/hooks/useUploadModal';

import { fakeForYouAlbum, forYouAlbums } from '@/consts/forYouAlbums';

import { Album, Song } from '@/types';

interface LibraryContentProps {
	songs: Song[];
	albums: Album[];
}

const LibraryContent: React.FC<LibraryContentProps> = ({ songs, albums }) => {
	const authModal = useAuthModal();
	const addAlbumModal = useAddAlbumModal();
	const uploadModal = useUploadModal();
	const { user } = useUser();
	const router = useRouter();

	const onPlay = useOnPlay(songs);

	const onAddAlbumButtonClick = () => {
		if (!user) {
			return authModal.onOpen();
		}

		return addAlbumModal.onOpen();
	};

	const onAddSongButtonClick = () => {
		if (!user) {
			return authModal.onOpen();
		}

		return uploadModal.onOpen();
	};

	useEffect(() => {
		if (!user) {
			router.replace('/');
			return authModal.onOpen();
		}
	}, []);

	const onForYouAlbumClick = (type: string) => {
		const query = {
			type: type,
		};

		const url = qs.stringifyUrl({
			url: 'for-you',
			query: query,
		});

		router.push(url);
	};

	return (
		<div className='w-full px-6 pb-5'>
			<div className='flex items-center gap-x-4 overflow-y-auto'>
				<ListItem image='/images/add-song.png' name='Добавить музыку' onClickAction={onAddSongButtonClick} />
				<ListItem image='/images/add-album.png' name='Создать альбом' onClickAction={onAddAlbumButtonClick} />
				<ListItem image='/images/liked.png' name='Любимая музыка' href='liked' />
				{/*TODO - Play Recommended music*/}
				{/*<ListItem image='/images/recommended-music.png' name='Рекомендованная музыка' onClickAction={() => {*/}
				{/*}} />*/}
			</div>
			<h2 className='text-white text-2xl font-semibold pb-0 pt-6'>
				Ваша музыка...
			</h2>
			<div className={`
							grid
							grid-cols-2
							sm:grid-cols-3
							md:grid-cols-3
							lg:grid-cols-4
							xl:grid-cols-5
							2xl:grid-cols-8
							gap-4
							mt-6
						`}>
				{
					forYouAlbums.length
						?
						forYouAlbums.map((album, idx) =>
							<AlbumItem key={idx} onClick={(id: string) => onForYouAlbumClick(id)} data={fakeForYouAlbum(album)} />
						)
						: <h2 className='text-neutral-400 pb-6 col-span-full'>
							Ваши подборки не найдены
						</h2>
				}
			</div>
			<h2 className='text-white text-2xl font-semibold pb-0 pt-6'>
				Альбомы
			</h2>
			<div className={`
							grid
							grid-cols-2
							sm:grid-cols-3
							md:grid-cols-3
							lg:grid-cols-4
							xl:grid-cols-5
							2xl:grid-cols-8
							gap-4
							mt-6
						`}>
				{
					albums.length
						?
						albums.map((album) =>
							<AlbumItem key={album.id} onClick={(id: string) => router.push(`/albums/${id}`)} data={album} />
						)
						: <h2 className='text-neutral-400 pb-6 col-span-full'>
							Альбомы не найдены
						</h2>
				}
			</div>
			<h2 className='text-white text-2xl font-semibold pb-0 pt-5'>
				Песни
			</h2>
			<div className='flex flex-col gap-y-2 pt-6'>
				{
					songs.length
						? songs.map((song) => (
							<div key={song.id} className='flex items-center gap-x-4'>
								<div className='flex-1'>
									<MediaItem data={song} onClick={(id: string) => onPlay(id)} />
								</div>
								<LikeButton songId={song.id} />
								<DeleteSongButton songId={song.id} />
								{/*TODO - удалять альбом - обложка, строка в таблице*/}
								{/*TODO - удалять аккаунт пользователя - искать песни по его id и удалять, как песни; удалять его альбомы по id; удалить строку в таблице и выход из аккаунта*/}
								<AddToAlbumButton songId={song.id} albums={albums} />
							</div>
						))
						: <h2 className='text-neutral-400 pb-6'>
							Музыка не найдена
						</h2>
				}
			</div>
		</div>
	);
};

export default LibraryContent;
