"use client";
import { use, useEffect, useMemo } from "react";
import { CellBase, createEmptyMatrix, Spreadsheet } from "react-spreadsheet";
import { SheetContext } from "../context";

export default function Sheet({ className }: { className?: string }) {
	const {
		sheetData,
		setSheetData,
		fields,
		rowNames,
		isLoadingFields,
		isLoadingRowNames,
	} = use(SheetContext);

	const columnLabels = useMemo(() => {
		return fields?.fields?.slice(1)?.map((field) => field?.name || "");
	}, [fields]);
	const rowLabels = useMemo(() => {
		return rowNames?.rowNames?.filter((name) => name !== undefined) || [];
	}, [rowNames]);

	useEffect(() => {
		if (isLoadingFields || isLoadingRowNames) return;
		setSheetData(() => {
			console.log("creating empty matrix");
			const newMatrix = createEmptyMatrix<CellBase>(
				rowLabels.length,
				columnLabels?.length || 0,
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

	return (
		<div className={className}>
			<Spreadsheet
				className="w-fit h-fit"
				data={sheetData}
				onChange={setSheetData}
				columnLabels={columnLabels}
				rowLabels={rowLabels}
			/>
		</div>
	);
}
