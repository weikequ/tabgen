import { KeyRound, Trash } from "lucide-react";
import { use } from "react";
import { SheetContext } from "../context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function CurrentFields() {
	const { fields, resetData } = use(SheetContext);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-foreground">
					Current Fields ({fields?.fields?.length || 0})
				</h3>
				<Button
					variant="outline"
					className="hover:bg-muted "
					size="icon"
					onClick={resetData}
				>
					<Trash />
				</Button>
			</div>
			{fields?.fields?.length === 0 ? (
				<div className="text-center py-8 text-muted-foreground">
					No fields configured yet. Add fields manually or generate them with
					AI.
				</div>
			) : (
				<ScrollArea>
					<div className="flex gap-4 mb-4">
						{fields?.fields?.map((field, index) => (
							<div
								className="flex flex-col gap-2 w-32 overflow-hidden p-2 border rounded-md"
								key={index}
							>
								<div className="text-xs font-bold overflow-ellipsis">
									{field?.name}
								</div>
								<div className="flex items-center gap-2">
									<Badge
										variant="outline"
										className="overflow-ellipsis text-muted-foreground"
									>
										{field?.type}
									</Badge>
									{index === 0 && (
										<KeyRound className="size-4 text-muted-foreground/50" />
									)}
								</div>
								<p className="text-xs overflow-ellipsis text-wrap">
									{field?.description}
								</p>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			)}
		</div>
	);
}
