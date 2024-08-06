"use client";

import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";
import { json } from "@codemirror/lang-json";
import { toast } from "sonner";
import Editor from "@components/Editor/Editor";
import MultiEditorLayout from "@layout/multi-editor-layout";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import BaseLayout from "@layout/BaseLayout";
import { Cog, Copy, Flower } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "@components/ui/toolbar";
import BeautifyButton from "app/_components/basic-buttons/beautify-button";
import CopyButton from "app/_components/basic-buttons/copy-button";

const JsonToTsPage = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");
  const [error, seterror] = useState("");
  const [name, setName] = useState("root");

  const handleParsing = useCallback(() => {
    try {
      seterror("");

      if (inputArea.trim().length < 1) {
        seterror("");
        return;
      }
      const obj: Record<string, unknown> = JSON.parse(
        inputArea.trim(),
      ) as Record<string, unknown>;
      const tsObj = JsonToTS(obj, { rootName: name ?? "Root" });
      setoutputArea(tsObj.join("\n\n"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        seterror(error.message);
      }
    }
  }, [inputArea, name]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout
      title="JSON to TypeScript"
      desc="Convert JSON to TypeScript interfaces"
      toolId={2}
    >
      <Toolbar>
        <ToolbarButton asChild>
          <BeautifyButton value={inputArea} setValue={setinputArea} />
        </ToolbarButton>
        <ToolbarSeparator />
        <Popover>
          <PopoverTrigger asChild>
            <ToolbarButton asChild>
              <Button size={"icon"} variant={"secondary"}>
                <Cog className="h-4 w-4" />
              </Button>
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Settings</h4>
              <p className="text-sm">Set properties of on the type object</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type-name">Name</Label>
              <Input
                id="type-name"
                placeholder="Enter name"
                className="col-span-1"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <ToolbarSeparator />
        <ToolbarButton asChild>
          <CopyButton primaryAction onClick={() => outputArea} />
        </ToolbarButton>
      </Toolbar>
      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Editor
            value={inputArea}
            setValue={setinputArea}
            language={json()}
            placeholder="Enter JSON here"
          />
        </Container>
        <Container>
          <Editor
            value={outputArea}
            setValue={setoutputArea}
            disabled
            placeholder="TS will appear here"
          />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTsPage;
