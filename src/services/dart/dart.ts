export const createDartClassFromJson = ({
  json,
  className,
  isAbstract = false,
  addJsonKey = false,
}: {
  json: string;
  className: string;
  isAbstract?: boolean;
  addJsonKey?: boolean;
}) => {
  const jsonMap = JSON.parse(json);

  const dartClassProperties: string[] = [];
  const subClasses: string[] = [];

  for (const key in jsonMap) {
    if (Object.prototype.hasOwnProperty.call(jsonMap, key)) {
      const element = jsonMap[key];

      const classPropterty = generateDartClassPropertiesFromJson(key, element);
      console.log(classPropterty);

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
            const subClass = createDartClassFromJson({ json: JSON.stringify(element[0]), className: `${className}` });
            dartClassProperties.push(`List<${className}> ${key};`);
            subClasses.push(subClass);
          } else {
            //If not array of objects
            dartClassProperties.push(generateDartClassPropertiesFromJson(key, element[0], true));
          }
        } else {
          dartClassProperties.push(`List<dynamic> ${key};`);
        }
      }

      // if element is an object then we need to create a class for it, recursively run this function
      if (typeof element === "object" && !Array.isArray(element) && element !== null) {
        const className = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
        const subClass = createDartClassFromJson({ json: JSON.stringify(element), className: `${className}` });
        dartClassProperties.push(`${className} ${key};`);
        subClasses.push(subClass);
      }
    }
  }

  const dartClass = `\nclass ${className.charAt(0).toUpperCase() + className.slice(1)} with _\$${className.charAt(0).toUpperCase() + className.slice(1)} {
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

const generateDartClassPropertiesFromJson = (key: string, value: unknown, isList = false) => {
  console.log(typeof value);
  let res = "";
  if (typeof value === "string") {
    res = `String ${key};`;
    if (isList) {
      res = `List<String> ${key};`;
    }
  }

  if (typeof value === "number") {
    res = `int ${key};`;
    if (isList) {
      res = `List<int> ${key};`;
    }
  }

  if (typeof value === "boolean") {
    res = `bool ${key};`;
    if (isList) {
      res = `List<bool> ${key};`;
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
