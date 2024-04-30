"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import SnippetDialog from "@components/SnippetDialog";
import { json } from "@codemirror/lang-json";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import BaseLayout from "@layout/BaseLayout";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { Cog, Copy, Flower, MoreVertical, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { createDartClassFromJson } from "../../../../services/dart/dart";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown";
import OptionsMenu from "./_components/options-menu";

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
      toast.error("Please enter valid JSON");
      return;
    }
  };

  const handleBeatify = async () => {
    try {
      if (jsonValue.trim().length < 1) {
        seterror("");
        toast.error("Please enter JSON first");
        return;
      }
      if (error !== "") {
        toast.error("Please fix the error first");
        return;
      }
      const beatified = JSON.stringify(JSON.parse(jsonValue), null, 2);

      setJsonValue(beatified);
    } catch (error: any) {}
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
    <BaseLayout title="Json to Dart" desc="Convert Json to Dart freezed classes" toolId={4}>
      <ToolButtons
        first={
          <>
            <Button onClick={() => onSubmit()}>
              <Cog className="mr-2 h-4 w-4" /> Generate
            </Button>
            <Button className="ml-5" variant={"secondary"} onClick={() => handleBeatify()}>
              <Flower className="mr-2 h-4 w-4" /> Beautify
            </Button>
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
          </>
        }
        second={
          <>
            <Button
              size={"icon"}
              onClick={() => {
                if (dart.trim().length < 1) return;
                void navigator.clipboard.writeText(dart);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className=" h-4 w-4" />
            </Button>
          </>
        }
      />
      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Editor value={jsonValue} setValue={setJsonValue} language={json()} placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={dart} setValue={setDart} disabled placeholder="Dart will appear here" />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default JsonToDart;
