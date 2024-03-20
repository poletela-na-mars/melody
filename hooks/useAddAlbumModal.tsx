import { create } from 'zustand';

interface AddAlbumModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useAddAlbumModal = create<AddAlbumModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useAddAlbumModal;
