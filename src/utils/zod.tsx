// Convert json schema to zod schema

export const createZodSchemaFromJson = ({
  json,
  name = "Schema",
  subObject = false,
  level = 0,
}: {
  json: Record<string, unknown>;
  name?: string;
  subObject?: boolean;
  level?: number;
}) => {
  const start = `${subObject ? "" : `const ${name} =`}z.object({`;
  const end = generateEnd(subObject, level);
  const keys = Object.keys(json);

  const zopProps = keys.map((key) => {
    const value = json[key];
    const type = getType(value, level);
    const numberOfTabs = level + 1;
    const tabs = Array(numberOfTabs).fill("\t").join("");

    return `${tabs} ${key}: ${type},`;
  });

  return [start, ...zopProps, end].join("\n");
};

const getType = (value: unknown, level: number): string => {
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
      return createZodSchemaFromJson({ json: value as Record<string, unknown>, subObject: true, level: level + 1 });

    default:
      return "z.unknown()";
  }
};

/**
 * Generates the end string for a given subObject and level.
 *
 * @param subObject - A boolean indicating whether the object is a subObject.
 * @param level - The level of the object.
 * @returns The generated end string.
 */
const generateEnd = (subObject: boolean, level: number) => {
  const numberOfTabs = level;
  const tabs = Array(numberOfTabs).fill("\t").join("");
  return `${tabs}})`;
};
