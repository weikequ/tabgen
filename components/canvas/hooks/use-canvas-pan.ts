"use client";

import { useCanvasStore } from "@/stores/canvas-store";
import { useCallback } from "react";

interface UsePanProps {
	canvasSize: number;
	getCanvasRect: () => DOMRect | null;
	getCanvasElement: () => HTMLDivElement | null;
}

export function useCanvasPan({
	canvasSize,
	getCanvasRect,
	getCanvasElement,
}: UsePanProps) {
	const {
		viewportOffset,
		isPanning,
		panStart,
		zoomLevel,
		setViewportOffset,
		setIsPanning,
		setPanStart,
	} = useCanvasStore();

	const handlePanStart = useCallback(
		(e: React.MouseEvent) => {
			const canvasElement = getCanvasElement();
			if (canvasElement && e.target === canvasElement) {
				setIsPanning(true);
				setPanStart({ x: e.clientX, y: e.clientY });
			}
		},
		[setIsPanning, setPanStart, getCanvasElement],
	);

	const handlePanMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isPanning) return;

			const deltaX = (e.clientX - panStart.x) / zoomLevel;
			const deltaY = (e.clientY - panStart.y) / zoomLevel;

			const rect = getCanvasRect();
			if (rect) {
				const newOffset = {
					x: viewportOffset.x - deltaX,
					y: viewportOffset.y - deltaY,
				};

				setViewportOffset(newOffset);
				setPanStart({ x: e.clientX, y: e.clientY });
			}
		},
		[
			isPanning,
			panStart,
			viewportOffset,
			zoomLevel,
			setViewportOffset,
			setPanStart,
			getCanvasRect,
		],
	);

	const handlePanEnd = useCallback(() => {
		setIsPanning(false);
	}, [setIsPanning]);

	return {
		isPanning,
		viewportOffset,
		zoomLevel,
		handlePanStart,
		handlePanMove,
		handlePanEnd,
	};
}
