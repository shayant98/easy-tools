import BaseLayout from "../layout/BaseLayout";
import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { toast } from "react-toastify";
import Editor from "../components/Editor/Editor";
import TwoEditorLayout from "../layout/TwoEditorLayout";
import { api } from "@utils/api";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";

const JsonToTs = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim());
      const tsObj = JsonToTS(obj);
      setoutputArea(tsObj.join("\n\n"));
      toast("TS successfully generated", {
        toastId: "json-error",
        type: "error",
      });
    } catch (error) {
      toast("JSON is invalid", {
        toastId: "json-error",
        type: "error",
      });
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout
      showBackButton
      title="JSON to Typescript"
      desc="Introducing our JSON to TypeScript tool! With just a JSON object, our tool can generate a corresponding TypeScript model for efficient and organized development. Save time and reduce errors by taking advantage of our easy-to-use tool. "
    >
      <div className="self-end mb-4">
        <SignedIn>
          <SnippetDialog value={outputArea} language="TS" />
        </SignedIn>
      </div>
      <TwoEditorLayout>
        <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled />
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTs;
