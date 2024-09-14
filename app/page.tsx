import dynamic from "next/dynamic";
import { Suspense } from "react";

const Player = dynamic(() => import("@/features/ViewPlayer"), {
	ssr: false,
});

export default function Home() {
	return (
		<div className="h-screen w-screen">
			<Suspense fallback={<div>Loading...</div>}>
				<Player />
			</Suspense>
		</div>
	);
}
