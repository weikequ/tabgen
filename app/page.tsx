"use client";
import Config from "@/components/config";
import Sheet from "@/components/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
	return (
		<div className="p-6 flex flex-col gap-4 h-screen relative">
			<ScrollArea className="h-full w-full mt-8">
				<Sheet className="w-full flex flex-col items-center justify-center" />
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div className="absolute bottom-0 left-0 right-0 p-6 w-full">
				<Config />
			</div>
		</div>
	);
}
