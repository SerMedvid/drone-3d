import { CameraPositionData } from "@/types";
import useStore from "../stores/useStore";
import { Html } from "@react-three/drei";
import Image from "next/image";

type Props = {
	visible: boolean;
	localPosition?: CameraPositionData["location"];
};

export default function CameraLabel({ visible, localPosition }: Props) {
	const focused = useStore((state) => state.focused);

	return (
		visible &&
		localPosition &&
		!focused && (
			<Html>
				<div className="bg-indigo-100 p-4 rounded-lg text-sm">
					<Image
						src="/footage-test/placeholder-warehouse.jpeg"
						alt="Camera"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "auto", height: "100px" }}
					/>

					<div className="whitespace-nowrap">
						<span className="font-bold">Latitude:</span>{" "}
						{localPosition.latitude}
					</div>
					<div className="whitespace-nowrap">
						<span className="font-bold">Longitude:</span>{" "}
						{localPosition.longitude}
					</div>
					<div className="whitespace-nowrap">
						<span className="font-bold">Altitude:</span>{" "}
						{localPosition.altitude}
					</div>
				</div>
			</Html>
		)
	);
}
