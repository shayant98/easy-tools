"use client";

import { useCallback, useEffect, useState } from "react";
import { json } from "@codemirror/lang-json";

import Editor from "../../../../components/Editor/Editor";
import { toast } from "sonner";
import MultiEditorLayout from "../../../../layout/multi-editor-layout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/button";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Flower } from "lucide-react";
import BaseLayout from "@layout/BaseLayout";
import {
  type ZodKeyMappedObject,
  createMappedObjectFromJson,
  createStringZodSchemaFromMappedObject,
} from "@utils/zod";
import Options, { type ZodOptions } from "./_components/options";
import TabbedLayout from "@layout/TabbedLayout";
import ZodPropertiesList from "./_components/zod-properties-list";

const JsonToZod = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [mappedObject, setMappedObject] = useState<ZodKeyMappedObject[]>([]);
  const [options, setOptions] = useState<ZodOptions>({
    addImport: false,
    name: "Schema",
    addExport: false,
    camelCase: false,
  });

  const [error, seterror] = useState("");

  const handleParsing = useCallback(() => {
    try {
      seterror("");
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim()) as Record<string, unknown>;
      const mappedObj = createMappedObjectFromJson(obj, 0, options);
      setMappedObject(mappedObj);
    } catch (error) {
      if (typeof error === "string") {
        seterror(error.toUpperCase());
        error.toUpperCase(); // works, `e` narrowed to string
      } else if (error instanceof Error) {
        seterror(error.message);
        error.message; // works, `e` narrowed to Error
      }
    }
  }, [inputArea, options]);

  const handleMappedObjectToString = useCallback(() => {
    try {
      const string = createStringZodSchemaFromMappedObject({
        json: mappedObject,
        options,
      });
      setoutputArea(string);
    } catch (error) {
      if (typeof error === "string") {
        seterror(error.toUpperCase());
        error.toUpperCase(); // works, `e` narrowed to string
      } else if (error instanceof Error) {
        seterror(error.message);
        error.message; // works, `e` narrowed to Error
      }
    }
  }, [mappedObject, options]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  useEffect(() => {
    handleMappedObjectToString();
  }, [mappedObject, handleMappedObjectToString]);

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
    <BaseLayout
      toolId={10}
      title="JSON to ZOD generator"
      desc="Convert JSON to ZOD schema"
    >
      <ToolButtons
        first={
          <div>
            <Button className="mr-1" size={"sm"} onClick={handleBeatify}>
              <Flower className="h-4 w-4" /> Beautify
            </Button>
            <Options options={options} setOptions={setOptions} />
          </div>
        }
      />
      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Editor
            placeholder="Enter JSON here"
            value={inputArea}
            setValue={setinputArea}
            language={json()}
          />
        </Container>
        <Container>
          <TabbedLayout
            defaultTab="string"
            options={[
              {
                value: "string",
                label: "Schema",
                child: (
                  <>
                    <Editor
                      disabled
                      placeholder="Output"
                      value={outputArea}
                      setValue={setoutputArea}
                    />
                  </>
                ),
              },
              {
                value: "mapped",
                label: "Playground",
                child: (
                  <>
                    <ZodPropertiesList
                      mappedObject={mappedObject}
                      setMappedObject={setMappedObject}
                    />
                  </>
                ),
              },
            ]}
          />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default JsonToZod;
