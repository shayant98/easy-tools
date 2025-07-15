"use client";

import MultiEditorLayout from "@/layout/multi-editor-layout";
import { useCallback, useEffect, useState } from "react";
import { stringToJsonString } from "@/utils/formatters";
import JsToJsonInput from "./js-to-json-input";
import JsToJsonOutput from "./js-to-json-output";

const JsToJsonPage = () => {
  const [inputArea, setInputArea] = useState("");
  const [outputArea, setOutputArea] = useState("");
  const [error, setError] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const jsonString = stringToJsonString(inputArea);
      const obj: Record<string, unknown> = JSON.parse(jsonString.trim()) as Record<string, unknown>;
      setOutputArea(JSON.stringify(obj, null, 2));
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [handleParsing]);

  return (
    <MultiEditorLayout>
      <JsToJsonInput value={inputArea} setValue={setInputArea} errorMessage={error} />
      <JsToJsonOutput value={outputArea} setValue={setOutputArea} />
    </MultiEditorLayout>
  );
};

export default JsToJsonPage;
