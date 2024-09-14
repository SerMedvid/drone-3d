import { CameraPositionData } from "@/types";

type Props = {
	cameraPositionData: CameraPositionData;
	index: number;
	onClick: () => void;
};

export default function CameraPositionItem({
	cameraPositionData,
	index,
	onClick,
}: Props) {

	return (
		<div
			onClick={onClick}
			className="flex flex-col gap-2 bg-slate-200 p-2 rounded-md hover:bg-slate-300 cursor-pointer transition-colors duration-300"
		>
			<h3 className="text-lg font-bold">Camera position {index}</h3>
			<p className="text-sm">
				<div>Longitude: {cameraPositionData.location?.longitude}</div>
				<div>Latitude: {cameraPositionData.location?.latitude}</div>
				<div>Altitude: {cameraPositionData.location?.altitude}</div>
			</p>
		</div>
	);
}
