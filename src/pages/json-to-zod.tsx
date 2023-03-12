import BaseLayout from "../layout/BaseLayout";
import { useCallback, useEffect, useState } from "react";
import { highlight, languages, highlightElement } from "prismjs";
import "node_modules/prismjs/components/prism-javascript";
import "node_modules/prismjs/components/prism-typescript";
import Editor from "react-simple-code-editor";
import { jsonToZod } from "json-to-zod";
const JsonToZod = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim());
      const zod = jsonToZod(obj);
      setoutputArea(zod);
    } catch (error) {
      console.error(error);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout showBackButton title="JSON to Typescript">
      <div className="flex gap-x-2 h-30">
        <div className="w-1/2 ">
          <Editor
            placeholder="Enter JSON here"
            value={inputArea}
            onValueChange={(value: string) => setinputArea(value)}
            highlight={(code: string) => highlight(code, languages.javascript!, "javascript")}
            padding={10}
            className="bg-gray-900 rounded h-full overflow-visible"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <div className=" min-h-32 h-min grow">
          <Editor
            readOnly
            value={outputArea}
            onValueChange={(value: string) => {
              return;
            }}
            highlight={(code) => highlight(code, languages.ts!, "ts")}
            padding={10}
            className="bg-gray-900 rounded h-full overflow-visible"
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

export default JsonToZod;
