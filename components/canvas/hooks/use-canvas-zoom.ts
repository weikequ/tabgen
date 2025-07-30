"use client";

import { useCanvasStore } from "@/stores/canvas-store";
import { useCallback } from "react";

interface UseZoomProps {
	getCanvasRect: () => DOMRect | null;
	getCanvasElement: () => HTMLDivElement | null;
}

export function useCanvasZoom({
	getCanvasRect,
	getCanvasElement,
}: UseZoomProps) {
	const { zoomLevel, zoomToPoint } = useCanvasStore();

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();

			const canvasElement = getCanvasElement();
			const rect = getCanvasRect();

			if (!canvasElement || !rect) return;

			// Calculate zoom center relative to canvas
			const centerX = e.clientX - rect.left;
			const centerY = e.clientY - rect.top;

			// Determine zoom direction and amount
			const delta = e.deltaY > 0 ? -0.1 : 0.1;

			zoomToPoint(delta, centerX, centerY);
		},
		[getCanvasElement, getCanvasRect, zoomToPoint],
	);

	return {
		zoomLevel,
		handleWheel,
	};
}
