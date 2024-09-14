import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	objectOffset: {
		x: number;
		y: number;
		z: number;
	};
	setObjectOffset: (offset: { x: number; y: number; z: number }) => void;
	cameraPosition: [number, number, number];
	setCameraPosition: (position: [number, number, number]) => void;
	focused: boolean;
	setFocused: (focused: boolean) => void;
};

const INIT = {
	objectOffset: {
		x: 0,
		y: 0,
		z: 0,
	},
	cameraPosition: [0, 0, 237] as [number, number, number],
	focused: false,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...INIT,
		setObjectOffset: (offset) => set({ objectOffset: offset }),
		setCameraPosition: (position) => set({ cameraPosition: position }),
		setFocused: (focused) => set({ focused: focused }),
	}))
);

export default useStore;
