"use client";

import { SignedIn } from "@clerk/nextjs";
import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import SnippetDialog from "@components/SnippetDialog";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/Button";
import BaseLayout from "@layout/BaseLayout";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Cog, Copy, Flower, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { createDartClassFromJson } from "../../../../services/dart/dart";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/Label";
import Input from "@components/ui/Input";
import { toast } from "react-toastify";

const JsonToDart = () => {
  const [json, setJson] = useState("");
  const [dart, setDart] = useState("");
  const [className, setclassName] = useState("root");
  const [error, seterror] = useState("");

  const onSubmit = () => {
    if (json.trim().length < 1) {
      seterror("");

      toast.error("Please enter JSON first");
      return;
    }
    try {
      JSON.stringify(JSON.parse(json), null, 2);

      const dartClass = createDartClassFromJson({
        json: json,
        className: className,
      });

      setDart(dartClass.trim());
      return;
    } catch (error: any) {
      seterror(error.message);
      toast.error("Please enter valid JSON");
      return;
    }
  };

  const handleBeatify = async () => {
    try {
      if (json.trim().length < 1) {
        seterror("");
        toast.error("Please enter JSON first");
        return;
      }
      if (error !== "") {
        toast.error("Please fix the error first");
        return;
      }
      const beatified = JSON.stringify(JSON.parse(json), null, 2);

      setJson(beatified);
    } catch (error: any) {
      seterror(error.message);
    }
  };

  useEffect(() => {
    if (json.trim().length < 1) {
      seterror("");
      return;
    }

    return () => {
      return;
    };
  }, [json]);

  return (
    <BaseLayout title="Json to Dart" desc="Convert Json to Dart freezed classes">
      <ToolButtons
        first={
          <>
            <Button size={"sm"} onClick={() => handleBeatify()}>
              <Flower /> Beautify
            </Button>
            <Button size={"sm"} onClick={() => onSubmit()}>
              <Cog /> Generate
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"sm"} className="w-9">
                  <Settings />
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
                    defaultValue={className}
                    onChange={(e) => {
                      setclassName(e.target.value);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </>
        }
        second={
          <>
            <SignedIn>
              <SnippetDialog value={dart} language="TS" />
            </SignedIn>
            <Button
              size={"sm"}
              onClick={() => {
                if (dart.trim().length < 1) return;
                navigator.clipboard.writeText(dart);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy /> Copy
            </Button>
          </>
        }
      />
      <TwoEditorLayout>
        <Container errorMessage={error}>
          <Editor value={json} setValue={(e) => setJson(e.target.value)} language="json" placeholder="Enter JSON here" />
        </Container>
        <Container>
          <Editor value={dart} setValue={(e) => setDart(e.target.value)} language="dart" disabled placeholder="Dart will appear here" />
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default JsonToDart;
