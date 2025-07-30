"use server";
import { FieldType, getFieldTypeSchema } from "@/lib/types";
import { azure } from "@ai-sdk/azure";
import { generateObject } from "ai";

export async function generateCell(
	prompt: string,
	type: (typeof FieldType)[number],
) {
	const result = await generateObject({
		model: azure("gpt-4.1-mini"),
		prompt,
		schema: getFieldTypeSchema(type),
	});

	return result.object.value;
}
