"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TailwindConverter } from "css-to-tailwindcss";
import Editor from "../../../../components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import { AiOutlineCopy } from "react-icons/ai";
import { useTool } from "context/ToolContext";

const TailwindConverters = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const converter = useMemo(
    () =>
      new TailwindConverter({
        remInPx: 16, // set null if you don't want to convert rem to pixels
        postCSSPlugins: [require("postcss-nested")], // add any postcss plugins to this array
        tailwindConfig: {
          // your tailwind config here
          content: [],
          theme: {
            extend: {
              colors: {
                "custom-color": {
                  100: "#123456",
                  200: "hsla(210, 100%, 51.0%, 0.016)",
                  300: "#654321",
                  gold: "hsl(41, 28.3%, 79.8%)",
                  marine: "rgb(4, 55, 242, 0.75)",
                },
              },
              screens: {
                "custom-screen": { min: "768px", max: "1024px" },
              },
            },
            supports: {
              grid: "display: grid",
              flex: "display: flex",
            },
          },
        },
      }),
    []
  );

  const handleParsing = useCallback(async () => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const { convertedRoot } = await converter.convertCSS(inputArea);
      setoutputArea(convertedRoot.toString());
    } catch (error) {
      console.error(error);
    }
  }, [converter, inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <>
      <div className="justify-end flex mb-2">
        <Button>
          {" "}
          <AiOutlineCopy /> Copy
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="css" placeholder="Enter CSS here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="css" disabled />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default TailwindConverters;
