import { generateRowsSchema } from "@/lib/types";
import { azure } from "@ai-sdk/azure";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const context = await req.json();

	const result = streamObject({
		model: azure("gpt-4.1-mini"),
		schema: generateRowsSchema,
		prompt:
			`Create a list of items for a research table. Each item represents a row in the table. Here is a description of what the data is and a description of what its for plus some additional context:` +
			context,
	});

	return result.toTextStreamResponse();
}
