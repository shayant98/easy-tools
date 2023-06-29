"use client";

import { useCallback, useEffect, useState } from "react";

import { jsonToZod } from "json-to-zod";
import Editor from "../../../../components/Editor/Editor";
import { toast } from "react-toastify";
import TwoEditorLayout from "../../../../layout/TwoEditorLayout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import { BsFlower1 } from "react-icons/bs";
import { useTool } from "context/ToolContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";

const JsonToZod = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim());
      const zod = jsonToZod(obj);
      setoutputArea(zod);
    } catch (error: any) {
      seterror(error.message);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  const handleBeatify = async () => {
    if (inputArea.trim().length < 1) {
      toast.error("Please enter JSON first");
      return;
    }
    if (error !== "") {
      toast.error("Please fix the error first");
      return;
    }
    setinputArea((prev) => JSON.stringify(JSON.parse(prev), null, 2));
  };

  return (
    <>
      <ToolButtons
        first={
          <Button className="mr-1" size={"sm"} onClick={handleBeatify}>
            <BsFlower1 /> Beautify
          </Button>
        }
        second={
          <SignedIn>
            <SnippetDialog value={outputArea} language="TS" />
          </SignedIn>
        }
      />
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor placeholder="Enter JSON here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" />
        </Container>
        <Container>
          <Editor
            placeholder="Output"
            value={outputArea}
            setValue={() => {
              return;
            }}
            language="typescript"
          />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default JsonToZod;
