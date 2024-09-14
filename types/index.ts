export type CameraPositionData = {
	position: {
		x: number;
		y: number;
		z: number;
	};
	image?: string;
	location?: {
		longitude: number;
		latitude: number;
		altitude: number;
	};
};
