"use client";

import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import CameraControl from "./CameraControl";
import { BuildingModel } from "./BuildingModel";
import { Environment } from "@react-three/drei";
import Cameras from "./Cameras";
import FocusButton from "./FocusButton";

const Player = () => {
	return (
		<>
			<Canvas
				camera={{
					position: [0, 0, 230],
					fov: 40,
					near: 0.01,
					far: 1000,
					up: [0, 0, 1],
				}}
			>
				<ambientLight intensity={0.5} />
				<Environment preset="city" />
				<CameraControl />

				<BuildingModel modelUrl="/footage-test/test_file.glb" />

				<Cameras cameraDataUrl="/footage-test/Cameras.xml" />

				<Perf position="bottom-left" />
			</Canvas>
			<FocusButton />
		</>
	);
};

export default Player;
