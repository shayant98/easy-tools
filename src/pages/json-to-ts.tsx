import BaseLayout from "../layout/BaseLayout";
import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { toast } from "react-toastify";
import Editor from "../components/Editor/Editor";
import TwoEditorLayout from "../layout/TwoEditorLayout";
import { api } from "@utils/api";
import { SignedIn } from "@clerk/nextjs";
import SnippetDialog from "@components/SnippetDialog";
import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/Label";
import Input from "@components/ui/Input";
import { AiOutlineAccountBook, AiOutlineRadiusSetting } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";

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

  return (
    <BaseLayout
      showBackButton
      title="JSON to Typescript"
      desc="Introducing our JSON to TypeScript tool! With just a JSON object, our tool can generate a corresponding TypeScript model for efficient and organized development. Save time and reduce errors by taking advantage of our easy-to-use tool. "
    >
      <div className="flex mb-2">
        <div className="flex basis-2/4 justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"sm"} className="w-9 self-end rounded-full p-0">
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
      </div>
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="json" placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="ts" disabled />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToTs;
