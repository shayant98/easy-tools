// Convert json schema to zod schema

import { type ZodOptions } from "app/(root)/(tools)/json-to-zod/_components/options";

export const createZodSchemaFromJson = ({
  json,
  subObject = false,
  level = 0,
  options,
}: {
  json: Record<string, unknown>;
  options: ZodOptions;
  subObject?: boolean;
  level?: number;
}) => {
  const start = generateStart({ options, subObject, level });
  const end = generateEnd({ options, subObject, level });
  const keys = Object.keys(json);

  const zopProps = keys.map((key) => {
    const value = json[key];
    const type = getType(value, level, {
      options,
    });
    const numberOfTabs = level + 1;
    const tabs = Array(numberOfTabs).fill("\t").join("");

    return `${tabs} ${key}: ${type},`;
  });

  return [start, ...zopProps, end].join("\n");
};

const getType = (value: unknown, level: number, { options }: { options: ZodOptions }): string => {
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
      return createZodSchemaFromJson({ json: value as Record<string, unknown>, subObject: true, level: level + 1, options: options });

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
