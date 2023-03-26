import BaseLayout from "../layout/BaseLayout";
import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { toast } from "react-toastify";
import Editor from "../components/Editor/Editor";
import TwoEditorLayout from "../layout/TwoEditorLayout";
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
      toast("TS successfully generated", {
        toastId: "json-error",
        type: "error",
      });
    } catch (error) {
      toast("JSON is invalid", {
        toastId: "json-error",
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
        <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled />
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTs;
