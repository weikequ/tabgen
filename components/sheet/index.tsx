"use client";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/stores/canvas-store";
import { use, useEffect, useMemo } from "react";
import { CellBase, createEmptyMatrix, Spreadsheet } from "react-spreadsheet";
import { SheetContext } from "../context";
import "./styles.css";

export default function Sheet() {
	const {
		sheetData,
		setSheetData,
		fields,
		rowNames,
		isLoadingFields,
		isLoadingRowNames,
		isLoadingCells,
	} = use(SheetContext);

	const { viewportOffset, zoomLevel } = useCanvasStore();

	const positionStyle = useMemo(() => {
		return {
			transform: `translate(${-viewportOffset.x * zoomLevel}px, ${-viewportOffset.y * zoomLevel}px) scale(${zoomLevel})`,
			transformOrigin: "0 0",
		};
	}, [viewportOffset, zoomLevel]);

	const columnLabels = useMemo(() => {
		return fields?.fields?.slice(1)?.map((field) => field?.name || "");
	}, [fields]);
	const rowLabels = useMemo(() => {
		return (
			rowNames?.rowNames?.filter((name) => name !== undefined) || undefined
		);
	}, [rowNames]);

	useEffect(() => {
		if (isLoadingFields || isLoadingRowNames) return;
		setSheetData(() => {
			const newMatrix = createEmptyMatrix<CellBase>(
				Math.max(rowLabels?.length || 0, 2),
				Math.max(columnLabels?.length || 0, 2),
			);
			return newMatrix;
		});
	}, [
		rowLabels,
		columnLabels,
		setSheetData,
		isLoadingFields,
		isLoadingRowNames,
	]);

	const hasData = useMemo(() => {
		return sheetData && sheetData.length > 0;
	}, [sheetData]);

	return (
		<div
			className={cn(
				"absolute bg-background w-fit h-fit",
				hasData ? "" : "rounded-xl",
			)}
			style={positionStyle}
		>
			<Spreadsheet
				data={sheetData}
				onChange={setSheetData}
				columnLabels={columnLabels}
				rowLabels={rowLabels}
				className={cn(
					"shadow-2xl",
					isLoadingFields || isLoadingRowNames || isLoadingCells
						? "loading__gradient"
						: "",
				)}
			/>
		</div>
	);
}
