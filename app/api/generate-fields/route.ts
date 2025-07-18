import { generateFieldsSchema } from "@/lib/types";
import { azure } from "@ai-sdk/azure";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const context = await req.json();

	const result = streamObject({
		model: azure("gpt-4.1-mini"),
		schema: generateFieldsSchema,
		prompt:
			`Generate fields for a data structure in the following context. Always have the first column as the name as a string. Context:` +
			context,
	});

	return result.toTextStreamResponse();
}
