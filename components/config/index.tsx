"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { use } from "react";
import { SheetContext } from "../context";
import { Separator } from "../ui/separator";
import AIInput from "./ai-input";
import CurrentFields from "./current-fields";

export default function Config() {
	const { openConfig, setOpenConfig } = use(SheetContext);

	if (!openConfig)
		return (
			<div className="m-6 p-6 absolute bottom-0 left-0 right-0">
				<Button
					className="w-full hover:bg-muted/30 backdrop-blur-md"
					variant="outline"
					onClick={() => setOpenConfig(true)}
				>
					<ChevronUp />
				</Button>
			</div>
		);

	return (
		<div className="bg-muted/10 backdrop-blur-md rounded-lg m-6 p-6 space-y-4 font-mono shadow-lg absolute bottom-0 left-0 right-0 z-50">
			<AIInput />

			<Separator />

			<CurrentFields />

			<Button
				className="w-full hover:border"
				variant="ghost"
				onClick={() => setOpenConfig(false)}
			>
				<ChevronDown />
			</Button>
		</div>
	);
}
