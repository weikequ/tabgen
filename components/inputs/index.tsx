"use client";

import CanvasDiv from "../canvas-div";
import { Input } from "../ui/input";

export function BaseContextInput() {
	return (
		<CanvasDiv
			className="w-[400px] h-[400px] flex items-end pointer-events-none justify-end"
			top={-425}
			left={-425}
		>
			<div className="rounded shadow-xl p-4 bg-background w-16 h-12 hover:w-32 hover:h-32 transition-[width,height] pointer-events-auto">
				<Input placeholder="Base Context" className="w-full h-full text-wrap" />
			</div>
		</CanvasDiv>
	);
}

export function FieldContextInput() {
	return (
		<CanvasDiv
			className="w-[400px] h-[400px] flex items-end pointer-events-none"
			top={-425}
		>
			<div className="rounded shadow-xl p-4 bg-background w-16 h-12 hover:w-32 hover:h-32 transition-[width,height] pointer-events-auto">
				<Input placeholder="Field Context" className="w-full h-full" />
			</div>
		</CanvasDiv>
	);
}

export function RowContextInput() {
	return (
		<CanvasDiv
			className="w-[400px] h-[400px] flex justify-end pointer-events-none"
			left={-425}
		>
			<div className="rounded shadow-xl p-4 bg-background w-16 h-12 hover:w-32 hover:h-32 transition-[width,height] pointer-events-auto">
				<Input placeholder="Row Context" className="w-full h-full" />
			</div>
		</CanvasDiv>
	);
}
