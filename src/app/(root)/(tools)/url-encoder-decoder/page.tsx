"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline, IoArrowBackOutline, IoCopy, IoCopyOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import Editor from "@components/Editor/Editor";

import { useTool } from "context/ToolContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import Container from "@components/Container/Container";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Button } from "@components/ui/Button";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";

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
    <>
      <ToolButtons
        first={
          <>
            <Button variant={"outline"} onClick={handleClear}>
              <MdClear />
              Clear
            </Button>
            <Button onClick={() => handleCopy(inputArea)}>
              <IoCopyOutline />
              Copy
            </Button>
            <Button onClick={handleEncode}>
              <IoArrowForwardOutline />
              Encode
            </Button>
          </>
        }
        second={
          <>
            <Button onClick={() => handleCopy(outputArea)}>
              <IoCopyOutline />
              Copy
            </Button>
            <Button onClick={handleDecode}>
              <IoArrowBackOutline />
              Decode
            </Button>
            <SignedIn>
              <SnippetDialog language="html" value={outputArea} />
            </SignedIn>
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
    </>
  );
};

export default UrlEncoderDecoder;
