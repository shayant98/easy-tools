"use client";

import BeautifyButton from "@/app/_components/basic-buttons/beautify-button";
import CopyButton from "@/app/_components/basic-buttons/copy-button";
import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar";
import HeaderLayout from "@/layout/header-layout";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { json } from "@codemirror/lang-json";
import JsonToTS from "json-to-ts";
import { Cog, Copy, Flower } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

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
      const obj: Record<string, unknown> = JSON.parse(inputArea.trim()) as Record<string, unknown>;
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
  }, [handleParsing]);

  return (
    <HeaderLayout title="JSON to TypeScript" desc="Convert JSON to TypeScript interfaces" toolId={2}>
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
          <Editor value={inputArea} setValue={setinputArea} language={json()} placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={setoutputArea} disabled placeholder="TS will appear here" />
        </Container>
      </MultiEditorLayout>
    </HeaderLayout>
  );
};

export default JsonToTsPage;
