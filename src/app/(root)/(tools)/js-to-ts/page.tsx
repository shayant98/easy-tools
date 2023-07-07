"use client";

import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import Editor from "../../../../components/Editor/Editor";
import TwoEditorLayout from "../../../../layout/TwoEditorLayout";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";
import Container from "@components/Container/Container";
import { useTool } from "context/ToolContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
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
      const obj = JSON.parse(jsonString.trim());

      const tsObj = JsonToTS(obj);
      setoutputArea(tsObj.join("\n\n"));
      seterror("");

      toast("TS successfully generated", {
        toastId: "json-error",
        type: "error",
      });
    } catch (error: any) {
      seterror(error.message);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout title="JavaScript to TypeScript" desc="Convert JavaScript objects to TypeScript interfaces">
      <ToolButtons
        second={
          <SignedIn>
            <SnippetDialog value={outputArea} language="TS" />
          </SignedIn>
        }
      />
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled placeholder="TS will appear here" />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTs;
