'use client';

import React, { useState } from 'react';
import uniqid from 'uniqid';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const uploadModal = useUploadModal();
	const { user } = useUser();
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const { register, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({
		defaultValues: {
			author: '',
			performer: '',
			title: '',
			genre: '',
			mood: '',
			song: null,
			image: null,
		}
	});

	const onChange = (open: boolean) => {
		if (!open) {
			reset();
			uploadModal.onClose();
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);

			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];

			if (!songFile || !values.title || !values.author || !values.performer || !values.title || !values.genre || !values.mood) {
				toast.error('Есть пустые поля');
				return;
			}

			if (!user) {
				toast.error('Ошибка определения пользователя');
				return;
			}

			const uniqueID = uniqid();

			// Upload song
			const {
				data: songData,
				error: songError,
			} = await supabaseClient
				.storage
				.from('songs')
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: '3600',
					upsert: false
				});

			if (songError) {
				setIsLoading(false);
				return toast.error('Ошибка загрузки музыки');
			}

			// Upload song cover
			const uploadCover = async () => {
				const {
					data: imageData,
					error: imageError,
				} = await supabaseClient
					.storage
					.from('images')
					.upload(`image-${values.title}-${uniqueID}`, imageFile, {
						cacheControl: '3600',
						upsert: false
					});

				if (imageError) {
					setIsLoading(false);
					toast.error('Ошибка загрузки изображения');
					return null;
				}

				return imageData;
			};

			const imageData: null | { path: string } = imageFile && await uploadCover();

			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					performer: values.performer,
					image_path: imageData ? imageData.path : null,
					song_path: songData.path,
					genre: values.genre,
					mood: values.mood,
				});

			if (supabaseError) {
				setIsLoading(false);
				return toast.error(supabaseError.message);
			}

			router.refresh();
			setIsLoading(false);
			toast.success('Музыка загружена');
			reset();
			uploadModal.onClose();

		} catch (err) {
			toast.error('Что-то пошло не так!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal title='Добавьте трек' description='Загрузите .mp3 файл' isOpen={uploadModal.isOpen} onChange={onChange}>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				<Input id='title' disabled={isLoading} {...register('title', { required: true })}
							 placeholder='Название трека' />
				<Input id='author' disabled={isLoading} {...register('author', { required: true })}
							 placeholder='Автор трека' />
				<Input id='performer' disabled={isLoading} {...register('performer', { required: true })}
							 placeholder='Исполнитель трека' />
				<Input id='genre' disabled={isLoading} {...register('genre', { required: true })}
							 placeholder='Жанр' />
				<Input id='mood' disabled={isLoading} {...register('mood', { required: true })}
							 placeholder='Настроение' />
				<div>
					<div className='pb-1'>
						Выберите .mp3 файл
					</div>
					<Input id='song' type='file' disabled={isLoading} {...register('song', { required: true })} accept='.mp3' />
				</div>
				<div>
					<div className='pb-1'>
						Выберите обложку трека
					</div>
					<Input id='image' type='file' disabled={isLoading} {...register('image', { required: false })}
								 accept='image/*' />
				</div>
				<Button disabled={isLoading || isSubmitting || !isValid} type='submit'>
					Загрузить
				</Button>
			</form>
		</Modal>
	);
};

export default UploadModal;
