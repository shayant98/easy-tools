import BaseLayout from "../layout/BaseLayout";
import { MouseEvent, useCallback, useEffect, useState } from "react";

import { jsonToZod } from "json-to-zod";
import Editor from "../components/Editor/Editor";
import { toast } from "react-toastify";
import TwoEditorLayout from "../layout/TwoEditorLayout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import { BsFlower1 } from "react-icons/bs";
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
    <BaseLayout showBackButton title="JSON to Typescript">
      <div className="flex mb-2">
        <div className="flex gap-2  basis-2/4 justify-end">
          <Button className="mr-1" size={"sm"} onClick={handleBeatify}>
            <BsFlower1 /> Beautify
          </Button>
        </div>
      </div>
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
