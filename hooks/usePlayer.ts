import { create } from 'zustand';

interface PlayerStore {
	ids: string[];
	activeId?: string;
	volume: number;
	setVolume: (volume: number) => void;
	setId: (id: string) => void;
	setIds: (ids: string[]) => void;
	reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
	ids: [],
	activeId: undefined,
	volume: 1,
	setVolume: (v: number) => set({ volume: v }),
	setId: (id: string) => set({ activeId: id }),
	setIds: (ids: string[]) => set({ ids: ids }),
	reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;
