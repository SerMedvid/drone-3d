import { CameraPositionData } from "@/types";
import { useEffect, useState } from "react";
import useStore from "../stores/useStore";

type Props = {
	url: string;
};

export function useCameraData({ url }: Props) {
	const [cameraData, setCameraData] = useState<CameraPositionData[]>([]);
	const objectOffset = useStore((state) => state.objectOffset);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchCameraData = async () => {
			try {
				const response = await fetch(url, { signal: abortController.signal });
				const text = await response.text();
				const xmlDoc = new window.DOMParser().parseFromString(text, "text/xml");

				const photoGroup = xmlDoc.getElementsByTagName("Photo");

				const cameraDataArray = [];

				for (let i = 0; i < photoGroup.length; i++) {
					const photo = photoGroup[i];

					const pose = photo.getElementsByTagName("Pose");
					const center = pose?.[0]?.getElementsByTagName("Center");
					const x = center?.[0]?.getElementsByTagName("x")[0]?.textContent;
					const y = center?.[0]?.getElementsByTagName("y")[0]?.textContent;
					const z = center?.[0]?.getElementsByTagName("z")[0]?.textContent;

					const image = photo.getElementsByTagName("ImagePath")[0]?.textContent;

					const longitude =
						center?.[1]?.getElementsByTagName("x")[0]?.textContent;
					const latitude =
						center?.[1]?.getElementsByTagName("y")[0]?.textContent;
					const altitude =
						center?.[1]?.getElementsByTagName("z")[0]?.textContent;

					if (x && y && z) {
						const data: CameraPositionData = {
							position: {
								x: +x + objectOffset.x,
								y: +y + objectOffset.y,
								z: +z + objectOffset.z,
							},
						};

						if (image) {
							data.image = image;
						}

						if (longitude && latitude && altitude) {
							data.location = {
								longitude: +longitude,
								latitude: +latitude,
								altitude: +altitude,
							};
						}

						cameraDataArray.push(data);
					}
				}

				setCameraData(cameraDataArray);
			} catch (error) {
				console.error(error);
			}
		};

		if (url) {
			fetchCameraData();
		}

		return () => {
			abortController.abort();
		};
	}, [url, objectOffset]);

	return cameraData;
}
