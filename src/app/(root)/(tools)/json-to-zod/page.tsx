"use client";

import { useCallback, useEffect, useState } from "react";

import Editor from "../../../../components/Editor/Editor";
import { toast } from "sonner";
import TwoEditorLayout from "../../../../layout/TwoEditorLayout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/button";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Flower } from "lucide-react";
import BaseLayout from "@layout/BaseLayout";
import { createZodSchemaFromJson } from "@utils/zod";

const JsonToZod = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim()) as Record<string, unknown>;
      const zod = createZodSchemaFromJson({ json: obj });
      setoutputArea(zod);
    } catch (error) {
      if (typeof error === "string") {
        error.toUpperCase(); // works, `e` narrowed to string
      } else if (error instanceof Error) {
        error.message; // works, `e` narrowed to Error
      }
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
    <BaseLayout toolId={10} title="JSON to ZOD generator" desc="Convert JSON to ZOD schema">
      <ToolButtons
        first={
          <Button className="mr-1" size={"sm"} onClick={handleBeatify}>
            <Flower /> Beautify
          </Button>
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
    </BaseLayout>
  );
};

export default JsonToZod;
