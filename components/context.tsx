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
	baseContext: string;
	setBaseContext: Dispatch<SetStateAction<string>>;
	fieldCtx: string;
	setFieldCtx: Dispatch<SetStateAction<string>>;
	rowCtx: string;
	setRowCtx: Dispatch<SetStateAction<string>>;
	isLoadingCells: boolean;
	setIsLoadingCells: Dispatch<SetStateAction<boolean>>;
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
	baseContext: "",
	setBaseContext: () => {},
	fieldCtx: "",
	setFieldCtx: () => {},
	rowCtx: "",
	setRowCtx: () => {},
	isLoadingCells: false,
	setIsLoadingCells: () => {},
});

export function SheetContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [fields, setFields] = useState<
		DeepPartial<{ fields: Field[] }> | undefined
	>(undefined);
	const [sheetData, setSheetData] = useState<Matrix<CellBase>>([]);
	const [openConfig, setOpenConfig] = useState(true);
	const [rowNames, setRowNames] = useState<
		DeepPartial<{ rowNames: string[] }> | undefined
	>(undefined);
	const [baseContext, setBaseContext] = useState("");
	const [fieldCtx, setFieldCtx] = useState("");
	const [rowCtx, setRowCtx] = useState("");
	const [isLoadingCells, setIsLoadingCells] = useState(false);
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
				sheetData,
				setSheetData,
				openConfig,
				setOpenConfig,
				resetData,
				baseContext,
				setBaseContext,
				fieldCtx,
				setFieldCtx,
				rowCtx,
				setRowCtx,
				isLoadingCells,
				setIsLoadingCells,
			}}
		>
			{children}
		</SheetContext.Provider>
	);
}
