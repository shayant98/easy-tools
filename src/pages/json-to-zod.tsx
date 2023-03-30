import BaseLayout from "../layout/BaseLayout";
import { MouseEvent, useCallback, useEffect, useState } from "react";

import { jsonToZod } from "json-to-zod";
import Editor from "../components/Editor/Editor";
import { toast } from "react-toastify";
import TwoEditorLayout from "../layout/TwoEditorLayout";
import Container from "@components/Container/Container";
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
        <Container>
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
