import BaseLayout from "../layout/BaseLayout";
import { MouseEvent, useCallback, useEffect, useState } from "react";

import { jsonToZod } from "json-to-zod";
import Editor from "../components/Editor/Editor";
import { toast } from "react-toastify";
import TwoEditorLayout from "../layout/TwoEditorLayout";
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
      toast("Invalid JSON", {
        toastId: "json-to-zod",
        type: "error",
      });
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout showBackButton title="JSON to Typescript">
      <TwoEditorLayout>
        <Editor placeholder="Enter JSON here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" />
        <Editor value={outputArea} setValue={(e) => setinputArea(e.target.value)} language="js" disabled />
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToZod;
