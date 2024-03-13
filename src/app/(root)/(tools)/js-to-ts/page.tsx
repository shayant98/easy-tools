"use client";

import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";
import { json } from "@codemirror/lang-json";

import { toast } from "sonner";
import Editor from "../../../../components/Editor/Editor";
import MultiEditorLayout from "../../../../layout/multi-editor-layout";
import Container from "@components/Container/Container";
import BaseLayout from "@layout/BaseLayout";

const JsonToTs = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const jsonString = inputArea.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      });
      const obj: Record<string, unknown> = JSON.parse(jsonString.trim()) as Record<string, unknown>;

      const tsObj = JsonToTS(obj);
      setoutputArea(tsObj.join("\n\n"));
      seterror("");

      toast.error("TS successfully generated");
    } catch (error: unknown) {
      seterror("Invalid JSON");
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout toolId={1} title="JavaScript to TypeScript" desc="Convert JavaScript objects to TypeScript interfaces">
      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={setinputArea} language={json()} placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={setoutputArea} disabled placeholder="TS will appear here" />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTs;
