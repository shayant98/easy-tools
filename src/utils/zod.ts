// Convert json schema to zod schema

import type { ZodOptions } from "@/app/(root)/(tools)/json-to-zod/_components/options";
import { convertStringToCamelCase } from "@/lib/utils";

export type ZodKeyMappedObject = {
	name: string;
	type: string;
	zodType: string;
	id: string;
	level?: number;
	options: Record<
		string,
		{ value: boolean; message?: string; keyValue?: string }
	>;
};

export const createMappedObjectFromJson = (
	json: Record<string, unknown>,
	options: ZodOptions,
) => {
	let tabbedObject: ZodKeyMappedObject[] = [];

	const keys = Object.keys(json);

	keys.map((key) => {
		const value = json[key];
		if (value === undefined) {
			throw new Error("Value is undefined");
		}
		const zodType = getTypeAsString(value);

		tabbedObject = [
			...tabbedObject,
			{
				name: key,
				type: typeof value,
				zodType,
				id: Math.random().toString(),
				options: {},
			},
		];
	});

	return tabbedObject;
};

export const createStringZodSchemaFromMappedObject = ({
	json,
	subObject = false,
	level = 0,
	options,
}: {
	json: ZodKeyMappedObject[];
	options: ZodOptions;
	subObject?: boolean;
	level?: number;
}) => {
	const start = generateStart({ options, subObject });
	const end = generateEnd({ options, subObject });

	const zopProps = json.map((key) => {
		const flags = generateFlags(key.options, key.zodType);

		const name = options.camelCase
			? convertStringToCamelCase(key.name)
			: key.name;

		return ` ${name}: ${key.zodType}${flags.trim()},`;
	});

	return [start, ...zopProps, end].join("\n");
};

const getArrayContent = (value: unknown): string => {
	const val = value as unknown[];

	if (val.length === 0) {
		return "z.array(z.any())";
	}

	const isSameType = val.every((v) => typeof v === typeof val[0]);

	if (isSameType) {
		return `z.array(${getTypeAsString(val[0])})`;
	}

	return "z.array(z.any())";
};

const getTypeAsString = (value: unknown) => {
	switch (typeof value) {
		case "string":
			return "z.string()";
		case "number":
			return "z.number()";
		case "boolean":
			return "z.boolean()";
		case "object":
			if (Array.isArray(value)) {
				return getArrayContent(value);
			}
			if (value === null) {
				return "z.any()";
			}
			return "z.object({})";
		case "undefined":
			return "z.any()";
		// return createMappedObjectFromJson(value as Record<string, unknown>, level + 1, options);
		default:
			return "z.unknown()";
	}
};

const generateEnd = ({
	options,
	subObject,
}: { subObject: boolean; options: ZodOptions }) => {
	const exportString =
		options.addExport && !subObject ? `\n\nexport { ${options.name} }` : "";

	return `})${exportString}`;
};
function generateStart({
	options,
	subObject,
}: { subObject: boolean; options: ZodOptions }) {
	if (subObject) {
		return "z.object({";
	}
	const importString = options.addImport ? `import * as z from "zod";\n\n` : "";

	return `${importString}const ${options.name} = z.object({`;
}

export const toggleOption = (
	id: string,
	key: string,
	object: ZodKeyMappedObject[],
) => {
	const value = object.find((o) => o.id === id);
	if (!value) {
		throw new Error("Value not found");
	}

	if (value.options === undefined) {
		return { ...value, options: { [key]: true } };
	}
};

const generateStringFlags = (
	options: Record<
		string,
		{ value: boolean; message?: string; keyValue?: string }
	>,
	string: string,
) => {
	let curValue = string;

	if (options.isEmail?.value) {
		curValue = `${curValue}.email()`;
	}
	if (options.isURL?.value) {
		curValue = `${curValue}.url()`;
	}
	if (options.isIP?.value) {
		curValue = `${curValue}.ip()`;
	}
	if (options.length?.value) {
		curValue = `${curValue}.length(${options.length.keyValue})`;
	}
	if (options.isUUID?.value) {
		curValue = `${curValue}.uuid()`;
	}
	if (options.includes?.value) {
		curValue = `${curValue}.includes("${options.includes.keyValue}")`;
	}
	if (options.startsWith?.value) {
		curValue = `${curValue}.startsWith("${options.startsWith.keyValue}")`;
	}
	if (options.endsWith?.value) {
		curValue = `${curValue}.endsWith("${options.endsWith.keyValue}")`;
	}

	if (options.min?.value) {
		curValue = `${curValue}.min(${options.min.keyValue})`;
	}
	if (options.max?.value) {
		curValue = `${curValue}.max(${options.max.keyValue})`;
	}

	return curValue;
};

const generateAdvancedFlags = (
	options: Record<
		string,
		{ value: boolean; message?: string; keyValue?: string }
	>,
	string: string,
) => {
	let curValue = string;

	if (options.catch?.value) {
		curValue = `${curValue}.catch((ctx) => {
      // Add fallback value here
      return "cccc";
    })`;
	}

	if (options.refine?.value) {
		curValue = `${curValue}.refine((data) => {
      // Add your custom validation here
      return true;
    }, {
      message: "${options.refine.message ?? "Invalid value"}" ,
    })`;
	}

	if (options.transform?.value) {
		curValue = `${curValue}.transform((val, ctx) => {
      // Add your custom transformation here
      return val;
    })`;
	}

	return curValue;
};

const generateFlags = (
	options: Record<
		string,
		{ value: boolean; message?: string; keyValue?: string }
	>,
	type: string,
) => {
	let string = "";
	if (options.isOptional?.value) {
		string = `${string}.optional()`;
	}
	if (options.isNullable?.value) {
		string = `${string}.nullable()`;
	}
	if (options.isNullish?.value) {
		string = `${string}.nullish()`;
	}
	if (options.default?.value) {
		string = `${string}.default(${type === "z.string()" ? `"${options.default.keyValue}"` : options.default.keyValue})`;
	}

	string = generateStringFlags(options, string);

	string = generateAdvancedFlags(options, string);

	return string;
};
