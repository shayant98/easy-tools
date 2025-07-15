"use client";

import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import { json } from "@codemirror/lang-json";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { stringToJsonString } from "@utils/formatters";
import { useCallback, useEffect, useState } from "react";

const JsToJsonPage = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const jsonString = stringToJsonString(inputArea);
      const obj: Record<string, unknown> = JSON.parse(jsonString.trim()) as Record<string, unknown>;

      setoutputArea(JSON.stringify(obj, null, 2));
      seterror("");
    } catch (error: any) {
      seterror("Invalid JSON");
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <MultiEditorLayout>
      <Container errorMessage={error}>
        <Editor value={inputArea} setValue={setinputArea} placeholder="Enter JS here" />
      </Container>
      <Container>
        <Editor value={outputArea} setValue={setoutputArea} language={json()} disabled placeholder="JSON will apear here" />
      </Container>
    </MultiEditorLayout>
  );
};

export default JsToJsonPage;
