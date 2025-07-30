"use client";

import { Field } from "@/lib/types";
import { DeepPartial } from "ai";
import { Columns, Loader2, Rows, Wand2 } from "lucide-react";
import { use, useEffect, useMemo } from "react";
import { SheetContext } from "../context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { generateCell } from "./actions";

export default function AIInput() {
	const {
		fields,
		submitFields,
		submitRowNames,
		baseContext,
		setBaseContext,
		rowNames,
		isLoadingFields,
		isLoadingRowNames,
		fieldCtx,
		setFieldCtx,
		rowCtx,
		setRowCtx,
		setSheetData,
		sheetData,
		setIsLoadingCells,
		isLoadingCells,
	} = use(SheetContext);

	const hasAvailableFields = useMemo(
		() => fields && fields.fields && fields.fields.length > 0,
		[fields],
	);

	const hasAvailableRows = useMemo(
		() => rowNames && rowNames.rowNames && rowNames.rowNames.length > 0,
		[rowNames],
	);

	const handleSubmitFieldNames = () => {
		let prompt = `Generate fields for a data structure in the following context. Always have the first field as something like a name. `;
		prompt += `Here is the context: ${baseContext}. `;
		if (fieldCtx)
			prompt +=
				"Additionally, here is context regarding the fields" + fieldCtx + ". ";
		if (hasAvailableFields)
			prompt += `And here are the current fields: ${JSON.stringify(fields?.fields)}`;
		submitFields(prompt);
	};

	const handleSubmitRowNames = () => {
		if (!hasAvailableFields) return;
		let prompt = `Create a list of items for a research table.
		Here is the context: ${baseContext}. `;
		if (rowCtx) prompt += `Additionally, ${rowCtx}. `;
		prompt += `Here is the first column name: ${fields?.fields?.[0]?.name}, description: ${fields?.fields?.[0]?.description}`;
		submitRowNames(prompt);
	};

	const generateAll = async () => {
		if (!rowNames || !fields || !rowNames.rowNames || !fields.fields) return;
		const basePrompt = (row: string, field: DeepPartial<Field>) =>
			`Get information regarding the ${field.name} of ${row}. The description of the field is ${field.description}. The overall context is regarding ${baseContext}. Reply with the data as a ${field.type} only. Keep the response very short.`;

		setIsLoadingCells(true);
		for (const [rowIndex, row] of rowNames.rowNames.entries()) {
			for (const [fieldIndex, field] of fields.fields.entries()) {
				// Skip first field (name) and reduce fieldIndex by 1
				if (fieldIndex === 0) continue;
				if (!row || !field || !field.name || !field.description || !field.type)
					continue;
				const prompt = basePrompt(row, field);
				const completion = await generateCell(prompt, field.type);
				console.log(
					`Row: ${rowIndex}, \nField: ${fieldIndex}, \nPrompt: ${prompt}, \nCompletion: ${completion}`,
				);
				setSheetData((prev) => {
					return prev.map((row, i) => {
						if (i !== rowIndex) return [...row];
						const newRow = [...row];
						newRow[fieldIndex - 1] = {
							value: String(completion),
						};
						return newRow;
					});
				});
			}
		}
		setIsLoadingCells(false);
	};

	useEffect(() => {
		console.log("sheetData", sheetData);
	}, [sheetData]);

	return (
		<>
			<div className="relative w-full flex">
				<Input
					placeholder="Let's fetch some data! What are you looking for?"
					className="w-full"
					value={baseContext}
					onChange={(e) => setBaseContext(e.target.value)}
				/>
			</div>

			<div className="w-full grid grid-cols-3 gap-2">
				<Input
					type="text"
					value={fieldCtx}
					onChange={(e) => setFieldCtx(e.target.value)}
					placeholder="Add additional column context (optional)"
					className="col-span-1"
					disabled={baseContext.length === 0}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmitFieldNames();
						}
					}}
				/>
				<Button
					className="col-span-2 hover:bg-muted"
					variant="outline"
					disabled={baseContext.length === 0 || isLoadingFields}
					onClick={handleSubmitFieldNames}
				>
					{isLoadingFields ? (
						<Loader2 className="animate-spin" />
					) : (
						<>
							Generate Column Headers <Columns />
						</>
					)}
				</Button>
			</div>

			<div className="w-full grid grid-cols-3 gap-2">
				<Input
					type="text"
					value={rowCtx}
					onChange={(e) => setRowCtx(e.target.value)}
					placeholder="Add additional row context (optional)"
					className="col-span-1"
					disabled={baseContext.length === 0 || !hasAvailableFields}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmitRowNames();
						}
					}}
				/>
				<Button
					className="col-span-2 hover:bg-muted"
					variant="outline"
					disabled={
						baseContext.length === 0 || !hasAvailableFields || isLoadingRowNames
					}
					onClick={handleSubmitRowNames}
				>
					{isLoadingRowNames ? (
						<Loader2 className="animate-spin" />
					) : (
						<>
							Generate Row Headers <Rows />
						</>
					)}
				</Button>
			</div>

			<div className="flex justify-center">
				<Button
					disabled={!hasAvailableFields || !hasAvailableRows || isLoadingCells}
					onClick={() => generateAll()}
				>
					{isLoadingCells ? (
						<Loader2 className="animate-spin" />
					) : (
						<>
							Generate All <Wand2 />
						</>
					)}
				</Button>
			</div>
		</>
	);
}
