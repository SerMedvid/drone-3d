import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, Vector3 } from "three";
import useStore from "../stores/useStore";

const centerVector = new Vector3();

type Props = JSX.IntrinsicElements["group"] & {
	modelUrl: string;
};

export function BuildingModel({ modelUrl, ...props }: Props) {
	const { scene } = useGLTF(modelUrl);
	const setObjectOffset = useStore((state) => state.setObjectOffset);

	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof Mesh) {
				child.geometry.computeBoundingBox();
				child.geometry.boundingBox?.getCenter(centerVector).negate();
				child.geometry.translate(
					centerVector.x,
					centerVector.y,
					centerVector.z
				);
			}

			setObjectOffset({
				x: centerVector.x,
				y: centerVector.y,
				z: centerVector.z,
			});
		});
	}, [scene, setObjectOffset]);

	return (
		<primitive
			// rotation={[-Math.PI / 2, 0, 0]}
			object={scene}
			{...props}
		/>
	);
}
