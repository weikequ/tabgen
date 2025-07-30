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
		prompt: context,
	});

	return result.toTextStreamResponse();
}
