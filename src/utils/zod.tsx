// Convert json schema to zod schema

import { type ZodOptions } from "app/(root)/(tools)/json-to-zod/_components/options";
import { parse } from "path";
import { convertStringToCamelCase } from "./utils";

export type ZodKeyMappedObject = {
  name: string;
  type: string;
  zodType: string;
  id: string;
  level?: number;
  options: Record<string, { value: boolean; message?: string; keyValue?: string }>;
};

export const createMappedObjectFromJson = (json: Record<string, unknown>, level = 0, options: ZodOptions) => {
  let tabbedObject: ZodKeyMappedObject[] = [];

  const keys = Object.keys(json);

  keys.map((key) => {
    const value = json[key];
    if (value === undefined) {
      throw new Error("Value is undefined");
    }
    const zodType = getTypeAsString(value, level, { options });

    tabbedObject = [...tabbedObject, { name: key, type: typeof value, zodType, id: Math.random().toString(), options: {} }];
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
  const start = generateStart({ options, subObject, level });
  const end = generateEnd({ options, subObject, level });

  const zopProps = json.map((key) => {
    const numberOfTabs = level + 1;
    const tabs = Array(numberOfTabs).fill("\t").join("");
    const flags = generateFlags(key.options);

    const name = options.camelCase ? convertStringToCamelCase(key.name) : key.name;

    return `${tabs} ${name}: ${key.zodType}${flags.trim()},`;
  });

  return [start, ...zopProps, end].join("\n");
};

const getTypeAsString = (value: unknown, level: number, { options }: { options: ZodOptions }) => {
  switch (typeof value) {
    case "string":
      return "z.string()";
    case "number":
      return "z.number()";
    case "boolean":
      return "z.boolean()";
    case "object":
      if (Array.isArray(value)) {
        return "z.array(z.unknown())";
      }

    // return createMappedObjectFromJson(value as Record<string, unknown>, level + 1, options);
    default:
      return "z.unknown()";
  }
};

const generateEnd = ({ options, subObject, level }: { subObject: boolean; options: ZodOptions; level: number }) => {
  const numberOfTabs = level;
  const tabs = Array(numberOfTabs).fill("\t").join("");

  const exportString = options.addExport && !subObject ? `\n\nexport { ${options.name} }` : "";

  return `${tabs}})${exportString}`;
};
function generateStart({ options, subObject, level }: { subObject: boolean; options: ZodOptions; level: number }) {
  if (subObject) {
    return `z.object({`;
  }
  const importString = options.addImport ? `import * as z from "zod";\n\n` : "";

  return `${importString}const ${options.name} = z.object({`;
}

export const toggleOption = (id: string, key: string, object: ZodKeyMappedObject[]) => {
  const value = object.find((o) => o.id === id);
  if (!value) {
    throw new Error("Value not found");
  }

  if (value.options === undefined) {
    return { ...value, options: { [key]: true } };
  }
};

const generateStringFlags = (options: Record<string, { value: boolean; message?: string; keyValue?: string }>, string: string) => {
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

const generateAdvancedFlags = (options: Record<string, { value: boolean; message?: string; keyValue?: string }>, string: string) => {
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

const generateFlags = (options: Record<string, { value: boolean; message?: string; keyValue?: string }>) => {
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
    string = `${string}.default("${options.default.keyValue}")`;
  }

  string = generateStringFlags(options, string);

  string = generateAdvancedFlags(options, string);

  return string;
};
