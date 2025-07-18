import { z } from "zod";

export const FieldType = [
	"string",
	"number",
	"boolean",
	"date",
	"email",
	"url",
] as const;

export const fieldSchema = z.object({
	name: z.string().describe("Name of field"),
	type: z.enum(FieldType).describe("Type of field"),
	description: z.string().describe("Description of field"),
});
export type Field = z.infer<typeof fieldSchema>;
export const generateFieldsSchema = z.object({
	fields: z.array(fieldSchema),
});

export const defaultField: Field = {
	name: "",
	type: "string",
	description: "",
};

export const generateRowsSchema = z.object({
	rowNames: z
		.array(z.string())
		.describe(
			"A list of items to research further. Each item represents one row.",
		),
});
