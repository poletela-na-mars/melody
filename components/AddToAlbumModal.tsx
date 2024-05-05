'use client';

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useAddToAlbumModal from '@/hooks/useAddToAlbumModal';

import Modal from './Modal';
import Button from './Button';

const AddToAlbumModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, props, onClose } = useAddToAlbumModal();
	const { user } = useUser();
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const { register, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({
		defaultValues: {
			albumId: null,
		}
	});

	const onChange = (open: boolean) => {
		if (!open) {
			reset();
			onClose();
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);

			if (!values.albumId) {
				toast.error('Альбом не выбран');
				return;
			}

			if (!user) {
				toast.error('Ошибка определения пользователя');
				return;
			}

			const albumsData = await supabaseClient
				.from('songs')
				.select('albums')
				.eq('id', props.songId);
			let albums = albumsData.data?.map((a) => a.albums);

			if (albums && albums[0].includes(+values.albumId)) {
				router.refresh();
				setIsLoading(false);
				toast.success('Песня уже есть в альбоме');
				reset();
				onClose();
				return;
			} else {
				if (albums) {
					albums[0].push(+values.albumId);
				} else {
					albums = [+values.albumId];
				}
			}

			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.update({
					albums: albums.flat()
				})
				.eq('id', props.songId);

			if (supabaseError) {
				setIsLoading(false);
				return toast.error(supabaseError.message);
			}

			router.refresh();
			setIsLoading(false);
			toast.success('Песня добавлена в альбом');
			reset();
			onClose();

		} catch (err) {
			toast.error('Что-то пошло не так!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal title='Добавьте песню в альбом' description='Выберите один из Ваших альбомов' isOpen={isOpen}
					 onChange={onChange}>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				<select id='album-select' {...register('albumId', { required: true })}
					className='p-2 rounded-md cursor-pointer border-none'>
					<option value=''>Выберите альбом</option>
					{
						props.albums.map((album) =>
							<option value={album.id} key={album.id}>
								{album.title}
							</option>
						)
					}
				</select>

				<Button disabled={isLoading || isSubmitting || !isValid} type='submit'>
					Добавить
				</Button>
			</form>
		</Modal>
	);
};

export default AddToAlbumModal;
