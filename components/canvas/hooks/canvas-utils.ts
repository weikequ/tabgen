export const CANVAS_CONSTANTS = {
	GRID_SIZE: 50,
	CANVAS_SIZE: 10000,
} as const;

export function createCanvasRectGetter(
	canvasRef: React.RefObject<HTMLDivElement | null>,
) {
	return () => canvasRef.current?.getBoundingClientRect() || null;
}

export function createCanvasElementGetter(
	canvasRef: React.RefObject<HTMLDivElement | null>,
) {
	return () => canvasRef.current;
}

export function updateCanvasBackground(
	canvasElement: HTMLDivElement,
	gridSize: number,
	viewportOffset: { x: number; y: number },
	zoomLevel: number = 1,
) {
	const scaledGridSize = gridSize * zoomLevel;
	const scaledDotSize = 2 * zoomLevel;
	canvasElement.style.backgroundImage = `radial-gradient(circle at center, var(${"--input"}) ${scaledDotSize}px, transparent ${scaledDotSize}px)`;
	canvasElement.style.backgroundSize = `${scaledGridSize}px ${scaledGridSize}px`;
	canvasElement.style.backgroundPosition = `${
		(-viewportOffset.x * zoomLevel) % scaledGridSize
	}px ${(-viewportOffset.y * zoomLevel) % scaledGridSize}px`;
}
