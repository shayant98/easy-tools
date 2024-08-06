"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import { json } from "@codemirror/lang-json";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import BaseLayout from "@layout/BaseLayout";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { Cog, Copy, Flower } from "lucide-react";
import { useEffect, useState } from "react";
import { createDartClassFromJson } from "../../../../services/dart/dart";
import { toast } from "sonner";
import OptionsMenu from "./_components/options-menu";
import { useClipboard } from "hooks/use-clipboard";
import CopyButton from "app/_components/basic-buttons/copy-button";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@components/ui/toolbar";
import BeautifyButton from "app/_components/basic-buttons/beautify-button";

const JsonToDart = () => {
  const [jsonValue, setJsonValue] = useState("");
  const [dart, setDart] = useState("");
  const [className, setclassName] = useState("root");
  const [error, seterror] = useState("");
  const [addJsonKey, setAddJsonKey] = useState(true);
  const [autoCamelCase, setAutoCamelCase] = useState(true);
  const [addConstructor, setAddConstructor] = useState(false);
  const [addGeneratedParts, setaddGeneratedParts] = useState(true);
  const [addFreezedImport, setAddFreezedImport] = useState(true);

  const { copy } = useClipboard();

  const onSubmit = () => {
    if (jsonValue.trim().length < 1) {
      seterror("");

      toast.error("Please enter JSON first");
      return;
    }
    try {
      JSON.stringify(JSON.parse(jsonValue), null, 2);

      const dartClass = createDartClassFromJson({
        json: jsonValue,
        className: className,
        addJsonKey: addJsonKey,
        autoCamelCase: autoCamelCase,
        addConstructor: addConstructor,
        addFreezedImport: addFreezedImport,
        addGeneratedParts: addGeneratedParts,
      });

      setDart(dartClass.trim());
      return;
    } catch (error: unknown) {
      console.log(error);

      toast.error("Please enter valid JSON");
      return;
    }
  };

  useEffect(() => {
    if (jsonValue.trim().length < 1) {
      seterror("");
      return;
    }

    try {
      JSON.stringify(JSON.parse(jsonValue), null, 2);
      seterror("");
    } catch (error: unknown) {}

    return () => {
      return;
    };
  }, [jsonValue]);

  return (
    <BaseLayout
      title="Json to Dart"
      desc="Convert Json to Dart freezed classes"
      toolId={4}
    >
      <Toolbar>
        <ToolbarButton asChild>
          <Button onClick={() => onSubmit()}>
            <Cog className="mr-2 h-4 w-4" /> Generate
          </Button>
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarGroup type="multiple" className="space-x-2">
          <ToolbarButton asChild>
            <OptionsMenu
              className={className}
              setclassName={setclassName}
              addJsonKey={addJsonKey}
              setaddJsonKey={setAddJsonKey}
              autoCamelCase={autoCamelCase}
              setAutoCamelCase={setAutoCamelCase}
              addConstructor={addConstructor}
              setAddConstructor={setAddConstructor}
              addFreezedImport={addFreezedImport}
              setAddFreezedImport={setAddFreezedImport}
              addGeneratedParts={addGeneratedParts}
              setaddGeneratedParts={setaddGeneratedParts}
            />
          </ToolbarButton>
          <ToolbarButton asChild>
            <BeautifyButton value={jsonValue} setValue={setJsonValue} />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton asChild>
          <CopyButton onClick={() => dart} />
        </ToolbarButton>
      </Toolbar>

      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Editor
            value={jsonValue}
            setValue={setJsonValue}
            language={json()}
            placeholder="Enter JSON here"
          />
        </Container>
        <Container>
          <Editor
            value={dart}
            setValue={setDart}
            disabled
            placeholder="Dart will appear here"
          />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default JsonToDart;
