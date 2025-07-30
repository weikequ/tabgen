"use client";

import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/canvas-store";
import { useEffect } from "react";
import { useCanvas } from "./hooks/use-canvas";

export function Canvas({ children }: { children: React.ReactNode }) {
	const { canvasRef, handleMouseMove, handleMouseUp, handlePanStart } =
		useCanvas();

	const centerViewport = useCanvasStore((state) => state.centerViewport);

	// Center the viewport after component mounts (client-side only)
	useEffect(() => {
		centerViewport();
	}, [centerViewport]);

	return (
		<div className="w-full h-full overflow-hidden">
			{/* Canvas */}
			<div
				ref={canvasRef}
				className={cn("w-full h-full active:cursor-grabbing")}
				role="application"
				aria-label="Canvas for drag and drop cards"
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onMouseDown={handlePanStart}
			>
				{children}
			</div>
		</div>
	);
}
