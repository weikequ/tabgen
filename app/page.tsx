import { Canvas } from "@/components/canvas";
import Config from "@/components/config";
import {
	BaseContextInput,
	FieldContextInput,
	RowContextInput,
} from "@/components/inputs";
import Sheet from "@/components/sheet";
import Topbar from "@/components/top-bar";

export default function Home() {
	return (
		<div className="w-screen h-screen relative">
			<Topbar />
			<Config />
			<Canvas>
				<BaseContextInput />
				<FieldContextInput />
				<RowContextInput />
				<Sheet />
			</Canvas>
		</div>
	);
}
