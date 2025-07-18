"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { use, useState } from "react";
import { SheetContext } from "../context";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import AIInput from "./ai-input";
import CurrentFields from "./current-fields";

export default function Config() {
	const { openConfig, setOpenConfig, fields, submitRowNames, resetData } =
		use(SheetContext);
	const [rowCtx, setRowCtx] = useState("");

	const handleSubmitRowNames = () => {
		if (!fields || fields?.fields?.length === 0) return;
		submitRowNames(
			`First column name: ${fields?.fields?.[0]?.name}, description: ${fields?.fields?.[0]?.description}. Additional context: ${rowCtx}`,
		);
	};

	if (!openConfig)
		return (
			<div className="p-6">
				<Button
					className="w-full bg-muted hover:bg-background"
					variant="outline"
					onClick={() => setOpenConfig(true)}
				>
					<ChevronUp />
				</Button>
			</div>
		);

	return (
		<div className="bg-background rounded-lg p-6 space-y-4 font-mono shadow-lg">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-foreground">
					Field Configuration
				</h2>
				<Button variant="outline" size="icon" onClick={resetData}>
					<Trash />
				</Button>
			</div>
			<AIInput />

			<Separator />

			<CurrentFields />

			<div className="w-full grid grid-cols-3 gap-2">
				<Input
					type="text"
					value={rowCtx}
					onChange={(e) => setRowCtx(e.target.value)}
					placeholder="Add additional context"
					className="col-span-1"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmitRowNames();
						}
					}}
				/>
				<Button
					className="col-span-2"
					variant="outline"
					disabled={!fields?.fields?.length}
					onClick={handleSubmitRowNames}
				>
					Generate Rows Headings
				</Button>
			</div>

			<Button
				className="w-full"
				variant="ghost"
				onClick={() => setOpenConfig(false)}
			>
				<ChevronDown />
			</Button>
		</div>
	);
}
