"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import { use, useState } from "react";
import { SheetContext } from "../context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AIInput() {
	const { fields, submitFields, isLoadingFields } = use(SheetContext);
	const [context, setContext] = useState("");
	const handleSubmit = () => {
		if (context.length === 0) return;
		submitFields(context + JSON.stringify(fields));
		setContext("");
	};
	return (
		<div className="relative w-full">
			<Input
				placeholder="What do you want to generate?"
				className="w-full"
				value={context}
				onChange={(e) => setContext(e.target.value)}
				disabled={isLoadingFields}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						handleSubmit();
					}
				}}
			/>
			<Button
				variant="ghost"
				className="absolute size-4 right-0 top-0 bottom-0 m-1 my-auto"
				onClick={handleSubmit}
				disabled={isLoadingFields}
				tabIndex={-1}
			>
				{isLoadingFields ? (
					<Loader2 className="w-4 h-4 animate-spin" />
				) : (
					<ChevronRight />
				)}
			</Button>
		</div>
	);
}
