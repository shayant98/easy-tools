"use client";

import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";
import Editor from "@components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import BaseLayout from "@layout/BaseLayout";
import { Cog, Flower } from "lucide-react";

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
  }, [inputArea, handleParsing]);

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
    <BaseLayout title="JSON to TypeScript" desc="Convert JSON to TypeScript interfaces" toolId={0}>
      <ToolButtons
        first={
          <>
            <Button size={"sm"} onClick={handleBeatify}>
              <Flower className="mr-2 h-4 w-4" /> Beautify
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"}>
                  <Cog className=" h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-sm ">Set properties of on the type object</p>
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
          </>
        }
        second={
          <SignedIn>
            <SnippetDialog value={outputArea} language="TS" />
          </SignedIn>
        }
      />
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled placeholder="TS will appear here" />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTsPage;
