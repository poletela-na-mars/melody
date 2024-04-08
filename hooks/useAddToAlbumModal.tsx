import { create } from 'zustand';
import { Album } from '@/types';

interface AddToAlbumProps {
	songId: string;
	albums: Album[];
}

interface AddToAlbumModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	props: AddToAlbumProps;
}

const useAddToAlbumModal = create<AddToAlbumModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	props: {
		songId: '',
		albums: []
	}
}));

export default useAddToAlbumModal;
