import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import BaseLayout from "@layout/BaseLayout";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { stringToJsonString } from "@utils/formatters";
import { useCallback, useEffect, useState } from "react";

const JsToJson = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const jsonString = stringToJsonString(inputArea);
      const obj = JSON.parse(jsonString.trim());

      setoutputArea(JSON.stringify(obj, null, 2));
      seterror("");
    } catch (error: any) {
      seterror(error.message);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout title="JS to JSON" showBackButton>
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="js" placeholder="Enter JS here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="json" disabled />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsToJson;
