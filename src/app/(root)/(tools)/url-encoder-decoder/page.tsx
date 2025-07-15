"use client";

import Editor from "@/components/Editor/Editor";
import { useState } from "react";

import Container from "@/components/Container/Container";
import SnippetDialog from "@/components/SnippetDialog";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Button } from "@/components/ui/button";
import HeaderLayout from "@/layout/header-layout";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { ArrowLeft, ArrowRight, Copy, Eraser } from "lucide-react";
import { toast } from "sonner";

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
    setinputArea(`${decodedUrl}?${decodedQuery}`);
  };
  const handleEncode = () => {
    //Split url before ? and encode only the part after ?
    const url = inputArea.split("?")[0] ?? "";
    const query = inputArea.split("?")[1] ?? "";

    //Encode the query part
    const encodedQuery = encodeURIComponent(query).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);

    //Encode the url part
    const encodedUrl = encodeURI(url);

    //Join the encoded url and query
    setoutputArea(`${encodedUrl}?${encodedQuery}`);
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
    <HeaderLayout toolId={5} title="URL encoder & decoder">
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
      <MultiEditorLayout>
        <Container>
          <Editor placeholder="Enter encoded URL here" value={inputArea} setValue={setinputArea} />
        </Container>
        <Container>
          <Editor placeholder="Enter decoded URL here" value={outputArea} setValue={setoutputArea} />
        </Container>
      </MultiEditorLayout>
    </HeaderLayout>
  );
};

export default UrlEncoderDecoder;
