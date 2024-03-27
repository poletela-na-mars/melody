'use client';

import React, { useState } from 'react';
import uniqid from 'uniqid';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useAddAlbumModal from '@/hooks/useAddAlbumModal';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const AddAlbumModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const addAlbumModal = useAddAlbumModal();
	const { user } = useUser();
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const { register, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({
		defaultValues: {
			title: '',
			image: null,
		}
	});

	const onChange = (open: boolean) => {
		if (!open) {
			reset();
			addAlbumModal.onClose();
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);

			const imageFile = values.image?.[0];

			if (!values.title) {
				toast.error('Есть пустые поля');
				return;
			}

			if (!user) {
				toast.error('Ошибка определения пользователя');
				return;
			}

			const uniqueID = uniqid();

			// Upload album cover
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
				.from('albums')
				.insert({
					user_id: user.id,
					title: values.title,
					image_path: imageData ? imageData.path : null,
				});

			if (supabaseError) {
				setIsLoading(false);
				return toast.error(supabaseError.message);
			}

			router.refresh();
			setIsLoading(false);
			toast.success('Альбом создан');
			reset();
			addAlbumModal.onClose();

		} catch (err) {
			toast.error('Что-то пошло не так!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal title='Создайте альбом' description='Сюда Вы сможете добавлять свою музыку' isOpen={addAlbumModal.isOpen} onChange={onChange}>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				<Input id='title' disabled={isLoading} {...register('title', { required: true })}
							 placeholder='Название альбома' />
				<div>
					<div className='pb-1'>
						Выберите обложку альбома
					</div>
					<Input id='image' type='file' disabled={isLoading} {...register('image', { required: false })}
								 accept='image/*' />
				</div>
				<Button disabled={isLoading || isSubmitting || !isValid} type='submit'>
					Создать
				</Button>
			</form>
		</Modal>
	);
};

export default AddAlbumModal;
