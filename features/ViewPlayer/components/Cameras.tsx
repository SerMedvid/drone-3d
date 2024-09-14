import React, { useEffect, useRef, useState } from "react";
import { useCameraData } from "../hooks/useCameraData";
import {
	Instance,
	Instances,
	InstancesProps,
	useCursor,
	useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useStore from "../stores/useStore";
import gsap from "gsap";
import { ThreeEvent } from "@react-three/fiber";
import { CameraPositionData } from "@/types";
import CameraLabel from "./CameraLabel";
import { InstancedMesh, Mesh, MeshStandardMaterial, Vector3 } from "three";

type GLTFResult = GLTF & {
	nodes: {
		Camera: Mesh;
	};
	materials: {
		DSLR: MeshStandardMaterial;
	};
};

type Props = {
	cameraDataUrl: string;
};

type CameraInstanceProps = {
	position: InstancesProps["position"];
	onClick: () => void;
	localPosition: CameraPositionData["location"];
};

const zUp = new Vector3(0, 0, 1);

const CameraInstance = ({
	position,
	onClick,
	localPosition,
}: CameraInstanceProps) => {
	const instanceRef = useRef<InstancedMesh>(null);
	const [hovered, setHovered] = useState(false);

	useCursor(hovered);

	useEffect(() => {
		if (instanceRef.current) {
			instanceRef.current.up = zUp;
			instanceRef.current.lookAt(0, 0, 0);
		}
	}, []);

	const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(true);
	};

	const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setHovered(false);
	};

	return (
		<group>
			<Instance
				scale={3}
				ref={instanceRef}
				position={position}
				onClick={onClick}
				onPointerOver={handlePointerOver}
				onPointerOut={handlePointerOut}
			>
				<CameraLabel
					visible={hovered && !!localPosition}
					localPosition={localPosition}
				/>
			</Instance>
		</group>
	);
};

const positionVector = new Vector3();

export default function Camera({ cameraDataUrl }: Props) {
	const { nodes } = useGLTF("/footage-test/camera.glb") as GLTFResult;
	const cameraData = useCameraData({ url: cameraDataUrl });
	const materialRef = useRef<MeshStandardMaterial>(null);

	const setCameraPosition = useStore((state) => state.setCameraPosition);
	const setFocused = useStore((state) => state.setFocused);

	const handleInstanceClick = (position: Vector3) => {
		setCameraPosition([position.x, position.y, position.z]);
		setFocused(true);
	};

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.focused,
			(focused) => {
				if (materialRef.current) {
					gsap.to(materialRef.current, {
						opacity: focused ? 0 : 1,
					});
				}
			}
		);

		return () => unsubscribe();
	}, []);

	return (
		<Instances geometry={nodes.Camera.geometry}>
			<meshStandardMaterial
				color="#cfcedb"
				transparent
				ref={materialRef}
			/>
			{cameraData.map((cameraPosition, idx) => {
				const pos = positionVector
					.clone()
					.set(
						cameraPosition.position.x,
						cameraPosition.position.y,
						cameraPosition.position.z
					);
				return (
					<CameraInstance
						key={idx}
						position={pos}
						localPosition={cameraPosition.location}
						onClick={() => handleInstanceClick(pos)}
					/>
				);
			})}
		</Instances>
	);
}

useGLTF.preload("/footage-test/camera.glb");
