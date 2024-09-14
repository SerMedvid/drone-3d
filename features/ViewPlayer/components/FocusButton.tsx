import { useEffect, useRef } from "react";
import useStore from "../stores/useStore";
import gsap from "gsap";

export default function FocusButton() {
	const setFocused = useStore((state) => state.setFocused);
	const focused = useStore((state) => state.focused);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleClick = () => {
		setFocused(false);
	};

	useEffect(() => {
		gsap.to(buttonRef.current, {
			opacity: focused ? 1 : 0,
		});
	}, [focused]);

	return (
		<button
			className="absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-indigo-500 backdrop-blur-sm px-4 py-2 opacity-0 text-white"
			ref={buttonRef}
			onClick={handleClick}
		>
			Return to selection
		</button>
	);
}
