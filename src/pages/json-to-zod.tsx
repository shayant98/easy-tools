import BaseLayout from "../layout/BaseLayout";
import { MouseEvent, useCallback, useEffect, useState } from "react";

import { jsonToZod } from "json-to-zod";
import Editor from "../components/Editor/Editor";
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
          <Editor placeholder="Enter JSON here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" />
        </div>
        <div className=" w-1/2">
          <Editor placeholder="Enter ZOD here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="js" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default JsonToZod;
