export const zodPropertyOptions: {
	title: string;
	key: string;
	hasKeyValue?: boolean;
	hasMessage?: boolean;
	availableFor?: string[];
	docsLink: string;
}[] = [
	{
		title: "Nullish",
		key: "isNullish",
		docsLink: "https://zod.dev/?id=nullish",
	},
	{
		title: "Optional",
		key: "isOptional",
		docsLink: "https://zod.dev/?id=optional",
	},
	{
		title: "Nullable",
		key: "isNullable",
		docsLink: "https://zod.dev/?id=nullable",
	},
	{
		title: "E-mail",
		key: "isEmail",
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "Default",
		key: "default",
		hasKeyValue: true,
		docsLink: "https://zod.dev/?id=default",
	},

	{
		title: "URL",
		key: "isURL",
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "IP Address",
		key: "isIP",
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=ip-addresses",
	},
	{
		title: "Length",
		key: "length",
		hasKeyValue: true,
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "UUID",
		key: "isUUID",
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "Includes",
		key: "includes",
		hasKeyValue: true,
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "StartsWith",
		key: "startsWith",
		hasKeyValue: true,
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "Ends with",
		key: "endsWith",
		hasKeyValue: true,
		availableFor: ["string"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "Min length",
		key: "min",
		hasKeyValue: true,
		docsLink: "https://zod.dev/?id=strings",

		availableFor: ["string", "number"],
	},
	{
		title: "Max length",
		key: "max",
		hasKeyValue: true,
		availableFor: ["string", "number"],
		docsLink: "https://zod.dev/?id=strings",
	},
	{
		title: "Integers only",
		key: "int",
		availableFor: ["number"],
		docsLink: "https://zod.dev/?id=numbers",
	},
	{
		title: "Catch",
		key: "catch",
		docsLink: "https://zod.dev/?id=catch",
	},
	{
		title: "Transform",
		key: "transform",
		docsLink: "https://zod.dev/?id=transform",
	},
	{
		title: "Refine",
		key: "refine",
		hasMessage: true,
		docsLink: "https://zod.dev/?id=refine",
	},
] as const;

export type zodPropertyOption = (typeof zodPropertyOptions)[number];
