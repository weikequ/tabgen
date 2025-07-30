import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CanvasState {
	// State
	viewportOffset: { x: number; y: number };
	isPanning: boolean;
	panStart: { x: number; y: number };
	zoomLevel: number;
	mode: "pan" | "zoom" | "none";

	// Actions
	setViewportOffset: (offset: { x: number; y: number }) => void;
	setIsPanning: (isPanning: boolean) => void;
	setPanStart: (panStart: { x: number; y: number }) => void;
	setZoomLevel: (zoomLevel: number) => void;
	setMode: (mode: "pan" | "zoom" | "none") => void;
	zoomIn: (centerX?: number, centerY?: number) => void;
	zoomOut: (centerX?: number, centerY?: number) => void;
	zoomToPoint: (delta: number, centerX: number, centerY: number) => void;
	centerViewport: () => void;

	// Computed actions
	snapToGrid: (
		x: number,
		y: number,
		gridSize: number,
	) => { x: number; y: number };
	snapDimensionsToGrid: (
		width: number,
		height: number,
		gridSize: number,
	) => { width: number; height: number };
	screenToGrid: (
		screenX: number,
		screenY: number,
		rect: DOMRect,
		gridSize: number,
	) => { x: number; y: number };
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.2;

export const useCanvasStore = create<CanvasState>()(
	devtools(
		(set, get) => ({
			// Initial state
			viewportOffset: { x: 0, y: 0 },
			isPanning: false,
			panStart: { x: 0, y: 0 },
			zoomLevel: 1,
			mode: "none",

			setViewportOffset: (offset) =>
				set({ viewportOffset: offset }, false, "setViewportOffset"),

			setIsPanning: (isPanning) => set({ isPanning }, false, "setIsPanning"),

			setPanStart: (panStart) => set({ panStart }, false, "setPanStart"),

			setMode: (mode) => set({ mode }, false, "setMode"),

			setZoomLevel: (zoomLevel) => {
				const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel));
				set({ zoomLevel: clampedZoom }, false, "setZoomLevel");
			},

			centerViewport: () => {
				// Only run on client side
				if (typeof window === "undefined") return;

				// Get viewport dimensions
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				// Estimate sheet size (reasonable defaults for initial positioning)
				const estimatedSheetWidth = 800;
				const estimatedSheetHeight = 600;

				// Calculate centered position
				const centerX = -(viewportWidth / 2 - estimatedSheetWidth / 2);
				const centerY = -(viewportHeight / 2 - estimatedSheetHeight / 2);

				set(
					{ viewportOffset: { x: centerX, y: centerY } },
					false,
					"centerViewport",
				);
			},

			zoomIn: (centerX, centerY) => {
				const { zoomLevel, zoomToPoint } = get();
				if (centerX !== undefined && centerY !== undefined) {
					zoomToPoint(ZOOM_STEP, centerX, centerY);
				} else {
					const newZoom = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP);
					set({ zoomLevel: newZoom }, false, "zoomIn");
				}
			},

			zoomOut: (centerX, centerY) => {
				const { zoomLevel, zoomToPoint } = get();
				if (centerX !== undefined && centerY !== undefined) {
					zoomToPoint(-ZOOM_STEP, centerX, centerY);
				} else {
					const newZoom = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP);
					set({ zoomLevel: newZoom }, false, "zoomOut");
				}
			},

			zoomToPoint: (delta, centerX, centerY) => {
				const { zoomLevel, viewportOffset, setZoomLevel, setViewportOffset } =
					get();
				const newZoom = Math.max(
					MIN_ZOOM,
					Math.min(MAX_ZOOM, zoomLevel + delta),
				);

				if (newZoom !== zoomLevel) {
					// Calculate the point in canvas space (before zoom)
					const canvasX = centerX / zoomLevel + viewportOffset.x;
					const canvasY = centerY / zoomLevel + viewportOffset.y;

					// Calculate new viewport offset to keep the same canvas point under the mouse
					const newViewportX = canvasX - centerX / newZoom;
					const newViewportY = canvasY - centerY / newZoom;

					setZoomLevel(newZoom);
					setViewportOffset({ x: newViewportX, y: newViewportY });
				}
			},

			// Computed actions
			snapToGrid: (x, y, gridSize) => {
				const { zoomLevel } = get();
				const scaledGridSize = gridSize * zoomLevel;
				return {
					x: Math.round(x / scaledGridSize) * scaledGridSize,
					y: Math.round(y / scaledGridSize) * scaledGridSize,
				};
			},

			snapDimensionsToGrid: (width, height, gridSize) => {
				const { zoomLevel } = get();
				const scaledGridSize = gridSize * zoomLevel;
				return {
					width: Math.max(
						scaledGridSize,
						Math.round(width / scaledGridSize) * scaledGridSize,
					),
					height: Math.max(
						scaledGridSize,
						Math.round(height / scaledGridSize) * scaledGridSize,
					),
				};
			},

			screenToGrid: (screenX, screenY, rect, gridSize) => {
				const { viewportOffset, snapToGrid, zoomLevel } = get();
				const x = (screenX - rect.left) / zoomLevel + viewportOffset.x;
				const y = (screenY - rect.top) / zoomLevel + viewportOffset.y;
				return snapToGrid(x, y, gridSize);
			},
		}),
		{
			name: "canvas-store",
		},
	),
);
