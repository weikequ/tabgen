"use client";
import { Field, generateFieldsSchema, generateRowsSchema } from "@/lib/types";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { DeepPartial } from "ai";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { CellBase, Matrix } from "react-spreadsheet";

export const SheetContext = createContext<{
	fields: DeepPartial<{ fields: Field[] }> | undefined;
	setFields: Dispatch<
		SetStateAction<DeepPartial<{ fields: Field[] }> | undefined>
	>;
	isLoadingFields: boolean;
	submitFields: (context: string) => void;
	rowNames: DeepPartial<{ rowNames: string[] }> | undefined;
	setRowNames: Dispatch<
		SetStateAction<DeepPartial<{ rowNames: string[] }> | undefined>
	>;
	isLoadingRowNames: boolean;
	submitRowNames: (context: string) => void;
	sheetData: Matrix<CellBase>;
	setSheetData: Dispatch<SetStateAction<Matrix<CellBase>>>;
	openConfig: boolean;
	setOpenConfig: Dispatch<SetStateAction<boolean>>;
	resetData: () => void;
}>({
	fields: undefined,
	setFields: () => {},
	rowNames: undefined,
	setRowNames: () => {},
	isLoadingFields: false,
	submitFields: () => {},
	isLoadingRowNames: false,
	submitRowNames: () => {},
	sheetData: [],
	setSheetData: () => {},
	openConfig: true,
	setOpenConfig: () => {},
	resetData: () => {},
});

export function SheetContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [fields, setFields] = useState<
		DeepPartial<{ fields: Field[] }> | undefined
	>(undefined);
	const [data, setData] = useState<Matrix<CellBase>>([]);
	const [openConfig, setOpenConfig] = useState(true);
	const [rowNames, setRowNames] = useState<
		DeepPartial<{ rowNames: string[] }> | undefined
	>(undefined);

	const {
		object: fieldsObject,
		submit: submitFields,
		isLoading: isLoadingFields,
	} = useObject({
		api: "/api/generate-fields",
		schema: generateFieldsSchema,
	});

	const {
		object: rowNamesObject,
		submit: submitRowNames,
		isLoading: isLoadingRowNames,
	} = useObject({
		api: "/api/generate-rows",
		schema: generateRowsSchema,
	});

	useEffect(() => {
		setFields(fieldsObject);
	}, [fieldsObject]);

	useEffect(() => {
		setRowNames(rowNamesObject);
	}, [rowNamesObject]);

	const resetData = () => {
		setFields(undefined);
		setRowNames(undefined);
	};

	return (
		<SheetContext.Provider
			value={{
				fields,
				setFields,
				isLoadingFields,
				submitFields,
				rowNames,
				setRowNames,
				isLoadingRowNames,
				submitRowNames,
				sheetData: data,
				setSheetData: setData,
				openConfig,
				setOpenConfig,
				resetData,
			}}
		>
			{children}
		</SheetContext.Provider>
	);
}
