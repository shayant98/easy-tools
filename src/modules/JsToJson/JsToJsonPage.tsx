"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";
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
    <TwoEditorLayout>
      <Container errorMessage={error}>
        <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="js" placeholder="Enter JS here" />
      </Container>
      <Container>
        <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="json" disabled placeholder="JSON will apear here" />
      </Container>
    </TwoEditorLayout>
  );
};

export default JsToJsonPage;
