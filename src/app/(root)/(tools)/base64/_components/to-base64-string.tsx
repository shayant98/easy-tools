"use client";

import Container from "@/components/Container/Container";
import { Textarea } from "@/components/ui/textarea";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { useEffect, useState } from "react";

const ToBase64String = () => {
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  useEffect(() => {
    if (!input) return;
    setoutput(Buffer.from(input).toString("base64"));
    return () => {
      setoutput("");
    };
  }, [input]);

  return (
    <MultiEditorLayout>
      <Container>
        <Textarea value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter your text here..." />
      </Container>
      <Container>
        <Textarea value={output} onChange={(e) => setoutput(e.target.value)} placeholder="Your base64 string will appear here..." />
      </Container>
    </MultiEditorLayout>
  );
};

export default ToBase64String;
