import BaseLayout from "../layout/BaseLayout";
import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
const JsonToTs = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim());
      const tsObj = JsonToTS(obj);
      setoutputArea(tsObj.join("\n\n"));
    } catch (error) {
      console.error(error);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout showBackButton title="JSON to Typescript">
      <div className="flex gap-x-2 ">
        <div className="w-1/2 ">
          <Editor
            placeholder="Enter JSON here"
            value={inputArea}
            onValueChange={(value: string) => setinputArea(value)}
            highlight={(code: string) => highlight(code, languages.js!, "js")}
            padding={10}
            className="bg-gray-900 rounded h-full overflow-visible"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <div className=" grow">
          <Editor
            readOnly
            value={outputArea}
            onValueChange={(value: string) => {
              return;
            }}
            highlight={(code: string) => highlight(code, languages.js!, "js")}
            padding={10}
            className="bg-gray-900 rounded h-full "
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default JsonToTs;
