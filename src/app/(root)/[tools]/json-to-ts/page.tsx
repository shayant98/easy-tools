"use client";

import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import Editor from "../../../../components/Editor/Editor";
import TwoEditorLayout from "../../../../layout/TwoEditorLayout";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/Label";
import Input from "@components/ui/Input";
import { IoSettings } from "react-icons/io5";
import { BsFlower1 } from "react-icons/bs";
import { useTool } from "context/ToolContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";

const JsonToTs = () => {
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
      const obj = JSON.parse(inputArea.trim());
      const tsObj = JsonToTS(obj, { rootName: name ?? "Root" });
      setoutputArea(tsObj.join("\n\n"));
    } catch (error: any) {
      seterror(error.message);
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
    <>
      <ToolButtons
        first={
          <>
            <Button size={"sm"} onClick={handleBeatify}>
              <BsFlower1 /> Beautify
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"sm"} className="w-9">
                  <IoSettings />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Set properties of on the type object</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type-name">Name</Label>
                  <Input
                    id="type-name"
                    placeholder="Enter name"
                    className="col-span-1 h-8"
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

      {/* <div className="flex gap-2 mb-2">
        <div className="flex gap-2 basis-2/4 items-center justify-end">
          <Button size={"sm"} onClick={handleBeatify}>
            <BsFlower1 /> Beautify
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"sm"} className="w-9">
                <IoSettings />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Set properties of on the type object</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type-name">Name</Label>
                <Input
                  id="type-name"
                  placeholder="Enter name"
                  className="col-span-1 h-8"
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="basis-2/4  flex justify-end">
          <div className="">
            <SignedIn>
              <SnippetDialog value={outputArea} language="TS" />
            </SignedIn>
          </div>
        </div>
      </div> */}
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled placeholder="TS will appear here" />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default JsonToTs;
