import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/canvas-store";
import { useMemo } from "react";

interface CanvasDivProps extends React.ComponentProps<"div"> {
	className?: string;
	left?: number;
	top?: number;
}

export default function CanvasDiv(props: CanvasDivProps) {
	const viewportOffset = useCanvasStore((state) => state.viewportOffset);
	const zoomLevel = useCanvasStore((state) => state.zoomLevel);
	const positionStyle = useMemo(() => {
		return {
			left: props.left ? props.left * zoomLevel : undefined,
			top: props.top ? props.top * zoomLevel : undefined,
			transform: `translate(${-viewportOffset.x * zoomLevel}px, ${-viewportOffset.y * zoomLevel}px) scale(${zoomLevel})`,
			transformOrigin: "0 0",
		};
	}, [viewportOffset, zoomLevel, props.left, props.top]);
	return (
		<div
			{...props}
			style={positionStyle}
			className={cn("absolute", props.className)}
		/>
	);
}
