import { useCallback, useEffect, useMemo, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { TailwindConverter } from "css-to-tailwindcss";
import Editor from "../components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";

const OdataGenerator = () => {
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
    <BaseLayout showBackButton title="CSS to Tailwind">
      <TwoEditorLayout>
        <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled />
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default OdataGenerator;
