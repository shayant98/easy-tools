"use client";

import { SignedIn } from "@clerk/nextjs";
import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import SnippetDialog from "@components/SnippetDialog";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import BaseLayout from "@layout/BaseLayout";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Cog, Copy, Flower, MoreVertical, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { createDartClassFromJson } from "../../../../services/dart/dart";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown";

const JsonToDart = () => {
  const [json, setJson] = useState("");
  const [dart, setDart] = useState("");
  const [className, setclassName] = useState("root");
  const [error, seterror] = useState("");
  const [addJsonKey, setAddJsonKey] = useState(true);
  const [autoCamelCase, setAutoCamelCase] = useState(true);
  const [addConstructor, setAddConstructor] = useState(false);

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
        addJsonKey: addJsonKey,
        autoCamelCase: autoCamelCase,
        addConstructor: addConstructor,
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
    } catch (error: any) {}
  };

  useEffect(() => {
    if (json.trim().length < 1) {
      seterror("");
      return;
    }

    try {
      JSON.stringify(JSON.parse(json), null, 2);
      seterror("");
    } catch (error: unknown) {}

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
              <Flower className="mr-2 h-4 w-4" /> Beautify
            </Button>
            <Button size={"icon"} onClick={() => onSubmit()}>
              <Cog className="h-4 w-4" /> Generate
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"}>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreVertical className="mr-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={addJsonKey} onCheckedChange={setAddJsonKey}>
                  Add JSON keys
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={autoCamelCase} onCheckedChange={setAutoCamelCase}>
                  Auto camelcase
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={addConstructor} onCheckedChange={setAddConstructor}>
                  Add empty constructor
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Copy className="mr-2 h-4 w-4" /> Copy
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
