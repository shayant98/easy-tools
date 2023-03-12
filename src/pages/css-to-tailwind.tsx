import { useCallback, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Editor from "react-simple-code-editor";
import Input from "../components/Input/Input";
import BaseLayout from "../layout/BaseLayout";
// import "node_modules/prismjs/components/prism-css";
import { TailwindConverter } from "css-to-tailwindcss";
import { highlight, languages, highlightElement } from "prismjs";

const OdataGenerator = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const converter = new TailwindConverter({
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
  });

  const handleParsing = useCallback(async () => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const { convertedRoot, nodes } = await converter.convertCSS(inputArea);
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
      <div className="flex gap-x-2 h-30">
        <div className="w-1/2 flex-1">
          <Editor
            placeholder="Enter CSS here"
            value={inputArea}
            onValueChange={(value: string) => setinputArea(value)}
            highlight={(code: string) => highlight(code, languages.css!, "css")}
            padding={10}
            className="bg-gray-900 rounded h-full overflow-visible"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <div className="w-1/2 min-h-32 h-min">
          <Editor
            readOnly
            value={outputArea}
            onValueChange={(value: string) => {
              return;
            }}
            highlight={(code) => highlight(code, languages.css!, "css")}
            padding={10}
            className="bg-gray-900 rounded h-full overflow-visible"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default OdataGenerator;
