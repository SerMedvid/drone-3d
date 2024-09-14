import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useStore from "../stores/useStore";

const DEFAULT_LOOK_AT = [48.3, -131.8, 116.45, -4.7, 4, 32.4];

export default function CameraControl() {
	const controlsRef = useRef<CameraControls>(null);
	const cameraPosition = useStore((state) => state.cameraPosition);

	const focused = useStore((state) => state.focused);

	useEffect(() => {
		const lookAt = (
			focused ? [...cameraPosition, 0, 0, 0] : DEFAULT_LOOK_AT
		) as [number, number, number, number, number, number];

		controlsRef.current?.setLookAt(...lookAt, true);
	}, [cameraPosition, focused]);

	return (
		<>
			<CameraControls
				ref={controlsRef}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2}
			/>
		</>
	);
}
