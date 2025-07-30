"use client";

import { useCallback, useEffect, useRef } from "react";
import {
	CANVAS_CONSTANTS,
	createCanvasElementGetter,
	createCanvasRectGetter,
	updateCanvasBackground,
} from "./canvas-utils";
import { useCanvasPan } from "./use-canvas-pan";
import { useCanvasZoom } from "./use-canvas-zoom";

export function useCanvas() {
	const canvasRef = useRef<HTMLDivElement>(null);

	// Get canvas utilities
	const getCanvasRect = createCanvasRectGetter(canvasRef);
	const getCanvasElement = createCanvasElementGetter(canvasRef);

	// Specialized hooks
	const pan = useCanvasPan({
		canvasSize: CANVAS_CONSTANTS.CANVAS_SIZE,
		getCanvasRect,
		getCanvasElement,
	});

	const zoom = useCanvasZoom({
		getCanvasRect,
		getCanvasElement,
	});

	// Unified mouse move handler
	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			pan.handlePanMove(e);
		},
		[pan],
	);

	// Unified mouse up handler
	const handleMouseUp = useCallback(() => {
		pan.handlePanEnd();
	}, [pan]);

	// Set up wheel event listener
	useEffect(() => {
		const canvasElement = getCanvasElement();
		if (!canvasElement) return;

		const handleWheel = (e: WheelEvent) => {
			zoom.handleWheel(e);
		};

		canvasElement.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			canvasElement.removeEventListener("wheel", handleWheel);
		};
	}, [zoom.handleWheel, getCanvasElement]);

	// Update canvas background
	useEffect(() => {
		const canvasElement = getCanvasElement();
		if (canvasElement) {
			updateCanvasBackground(
				canvasElement,
				CANVAS_CONSTANTS.GRID_SIZE,
				pan.viewportOffset,
				pan.zoomLevel,
			);
		}
	}, [pan.viewportOffset, pan.zoomLevel, getCanvasElement]);

	return {
		canvasRef,
		viewportOffset: pan.viewportOffset,
		zoomLevel: pan.zoomLevel,
		handleMouseMove,
		handleMouseUp,
		handlePanStart: pan.handlePanStart,
	};
}
