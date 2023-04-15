"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import Editor from "@components/Editor/Editor";

import { useTool } from "context/ToolContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import Container from "@components/Container/Container";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Button } from "@components/ui/Button";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";

const NAME = "URL Encoder/Decoder";
const DESCRIPTION = "Encode and decode URLs";

const UrlEncoderDecoder = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleDecode = () => {
    setoutputArea(decodeURI(inputArea));
  };
  const handleEncode = () => {
    setoutputArea(encodeURI(inputArea));
  };
  const handleClear = () => {
    setinputArea("");
    setoutputArea("");
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
            <Button onClick={handleEncode}>
              <IoArrowForwardOutline />
              Encode
            </Button>
          </>
        }
        second={
          <>
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
