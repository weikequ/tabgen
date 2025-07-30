"use client";
import { useCanvasStore } from "@/stores/canvas-store";
import { Grab, Hand, Plus, UserCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function Topbar() {
	const { isPanning } = useCanvasStore();
	return (
		<div className="absolute top-12 flex items-center justify-center gap-12 left-0 right-0 h-12 z-50 w-1/2 mx-auto ">
			<Button variant="outline" size="icon" className="*:text-muted-foreground">
				{isPanning ? <Grab /> : <Hand />}
			</Button>
			<div className="hover:opacity-100 flex items-center justify-between gap-4 h-full px-4 hover:border hover:shadow-lg group bg-muted/40 backdrop-blur-sm rounded-full opacity-20 ">
				<div className="w-0 group-hover:w-8 overflow-hidden transition-[width]">
					hi
				</div>
				<h1 className="font-mono">tabgen</h1>
				<div className="w-0 group-hover:w-8 overflow-hidden transition-[width] flex justify-end">
					<UserCircle />
				</div>
			</div>
			<Button variant="outline" size="icon" className="*:text-muted-foreground">
				<Plus />
			</Button>
		</div>
	);
}
