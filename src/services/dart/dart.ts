import { convertStringToCamelCase } from "@utils/utils";

/**
 * Creates a Dart class from a JSON string.
 *
 * @param json - The JSON string.
 * @param className - The name of the class.
 * @param addConstructor - Optional. Whether to add a constructor to the class. Default is false.
 * @param addJsonKey - Optional. Whether to add @JsonKey annotations to the class properties. Default is false.
 * @param autoCamelCase - Optional. Whether to automatically convert property names to camel case. Default is false.
 * @returns The Dart class as a string.
 */
export const createDartClassFromJson = ({
  json,
  className,
  addConstructor = false,
  addJsonKey = false,
  autoCamelCase = false,
}: {
  json: string;
  className: string;
  addConstructor?: boolean;
  addJsonKey?: boolean;
  autoCamelCase?: boolean;
}) => {
  const jsonMap: Record<string, unknown> = JSON.parse(json) as Record<string, unknown>;

  const dartClassProperties: string[] = [];
  const subClasses: string[] = [];

  for (const key in jsonMap) {
    if (Object.prototype.hasOwnProperty.call(jsonMap, key)) {
      const element = jsonMap[key];

      const classPropterty = generateDartClassPropertiesFromJson({ key, value: element, addJsonKey, autoCamelCase });

      if (classPropterty.trim() !== "") {
        dartClassProperties.push(classPropterty);
      }

      if (Array.isArray(element)) {
        const isHomogenous = checkifArrayIsHomogenous(element);
        if (isHomogenous) {
          const isArrayOfObjects: boolean = checkIfArrayisArrayofObjects(element);

          if (isArrayOfObjects) {
            //If array of objects
            const className = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
            const subClass = createDartClassFromJson({ json: JSON.stringify(element[0]), className: `${className}`, autoCamelCase, addJsonKey, addConstructor });
            dartClassProperties.push(`List<${className}> ${key};`);
            subClasses.push(subClass);
          } else {
            //If not array of objects
            dartClassProperties.push(generateDartClassPropertiesFromJson({ key, value: element, isList: true, addJsonKey, autoCamelCase }));
          }
        } else {
          dartClassProperties.push(`List<dynamic> ${key};`);
        }
      }

      // if element is an object then we need to create a class for it, recursively run this function
      if (typeof element === "object" && !Array.isArray(element) && element !== null) {
        const className = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
        const subClass = createDartClassFromJson({ json: JSON.stringify(element), className: `${className}`, autoCamelCase, addJsonKey, addConstructor });
        dartClassProperties.push(`${addJsonKey ? `@JsonKey(name: '${key}') ` : "p"} ${className} ${key};`);
        subClasses.push(subClass);
      }
    }
  }

  const dartClass = `\nclass ${className.charAt(0).toUpperCase() + className.slice(1)} with _\$${className.charAt(0).toUpperCase() + className.slice(1)} {
    ${addConstructor ? `const ${className.charAt(0).toUpperCase() + className.slice(1)}._();` : ""}
            \n  @JsonSerializable()\n  factory ${className.charAt(0).toUpperCase() + className.slice(1)}({\n        ${dartClassProperties.join("\n        ")}\n   }) = _${
              className.charAt(0).toUpperCase() + className.slice(1)
            }

            \n  factory ${className.charAt(0).toUpperCase() + className.slice(1)}.fromJson(Map<String, dynamic> json) => _\$${
              className.charAt(0).toUpperCase() + className.slice(1)
            }FromJson(json);
}`;
  return `
        ${dartClass}
        ${subClasses.join("\n")}
      `;
};

/**
 * Generates Dart class properties from JSON.
 *
 * @param {Object} options - The options for generating the properties.
 * @param {string} options.key - The key of the property.
 * @param {unknown} options.value - The value of the property.
 * @param {boolean} [options.isList=false] - Indicates if the property is a list.
 * @param {boolean} [options.addJsonKey=false] - Indicates if the property should have a JSON key.
 * @param {boolean} [options.autoCamelCase=false] - Indicates if the property key should be converted to camel case.
 * @returns {string} The generated Dart class property.
 */
const generateDartClassPropertiesFromJson = ({
  key,
  value,
  isList = false,
  addJsonKey = false,
  autoCamelCase = false,
}: {
  key: string;
  value: unknown;
  isList?: boolean;
  autoCamelCase?: boolean;
  addJsonKey?: boolean;
}) => {
  let camelCaseKey = key;
  if (autoCamelCase) {
    camelCaseKey = convertStringToCamelCase(key);
  }

  let res = "";
  if (typeof value === "string") {
    res = `String ${camelCaseKey};`;
    if (isList) {
      res = `List<String> ${camelCaseKey};`;
    }
  }

  if (typeof value === "number") {
    res = `int ${camelCaseKey};`;
    if (isList) {
      res = `List<int> ${camelCaseKey};`;
    }
  }

  if (typeof value === "boolean") {
    res = `bool ${camelCaseKey};`;
    if (isList) {
      res = `List<bool> ${camelCaseKey};`;
    }
  }

  if (res.length > 0) {
    if (addJsonKey) {
      res = `@JsonKey(name: '${key}') ${res}`;
    }
  }

  return res;
};

const checkIfArrayisArrayofObjects = (arr: unknown[]) => {
  if (Array.isArray(arr)) {
    if (arr.length > 0) {
      if (typeof arr[0] == "object") {
        return true;
      }
    }
  }
  return false;
};

const checkifArrayIsHomogenous = (arr: unknown[]) => {
  return arr.every((val) => typeof val === typeof arr[0]);
};
