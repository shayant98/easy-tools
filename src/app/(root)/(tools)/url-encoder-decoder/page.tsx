"use client";

import { useState } from "react";
import Editor from "@components/Editor/Editor";

import ToolButtons from "@components/ToolButtons/ToolButtons";
import Container from "@components/Container/Container";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Button } from "@components/ui/button";
import SnippetDialog from "@components/SnippetDialog";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Copy, Eraser } from "lucide-react";
import BaseLayout from "@layout/BaseLayout";

const UrlEncoderDecoder = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleDecode = () => {
    //Split url before ? and decode only the part after ?
    const url = outputArea.split("?")[0] ?? "";
    const query = outputArea.split("?")[1] ?? "";

    //Decode the query part
    const decodedQuery = decodeURIComponent(query.replace(/\+/g, " "));
    //Decode the url part
    const decodedUrl = decodeURI(url);

    //Join the decoded url and query
    setinputArea(decodedUrl + "?" + decodedQuery);
  };
  const handleEncode = () => {
    //Split url before ? and encode only the part after ?
    const url = inputArea.split("?")[0] ?? "";
    const query = inputArea.split("?")[1] ?? "";

    //Encode the query part
    const encodedQuery = encodeURIComponent(query).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });

    //Encode the url part
    const encodedUrl = encodeURI(url);

    //Join the encoded url and query
    setoutputArea(encodedUrl + "?" + encodedQuery);
  };
  const handleClear = () => {
    setinputArea("");
    setoutputArea("");
  };

  const handleCopy = (input: string) => {
    navigator.clipboard.writeText(input);
    toast.success("Copied to clipboard");
  };
  return (
    <BaseLayout toolId={5} title="URL encoder & decoder">
      <ToolButtons
        first={
          <>
            <Button variant={"outline"} onClick={handleClear}>
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={() => handleCopy(inputArea)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={handleEncode}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Encode
            </Button>
          </>
        }
        second={
          <>
            <Button onClick={() => handleCopy(outputArea)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={handleDecode}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Decode
            </Button>
          </>
        }
      />
      <TwoEditorLayout>
        <Container>
          <Editor placeholder="Enter encoded URL here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="html" />
        </Container>
        <Container>
          <Editor placeholder="Enter decoded URL here" value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="html" />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default UrlEncoderDecoder;
