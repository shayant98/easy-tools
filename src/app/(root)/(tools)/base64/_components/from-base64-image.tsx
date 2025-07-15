"use client";

import Container from "@/components/Container/Container";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { base64toFile } from "@utils/formatters";
import JSZip from "jszip";
import { ArrowRight, Cog, Download, FileArchive } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FromBase64 = () => {
  const [input, setinput] = useState("");
  const [seperator, setseperator] = useState("");
  const [generatedFiles, setgeneratedFiles] = useState<File[]>([]);

  const handleConversion = async () => {
    if (input === "") {
      return;
    }
    setgeneratedFiles([]);
    let strings;
    if (seperator !== "") {
      strings = input.trim().split(seperator);
    } else {
      strings = [input];
    }
    try {
      if (strings.length > 1) {
        for (const item of strings) {
          const file = await base64toFile(item);
          setgeneratedFiles((prev) => [...prev, file]);
        }
        return;
      }
      if (strings[0]) {
        const file = await base64toFile(strings[0]);
        if (!file) {
          return;
        }
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = file.name;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        return;
      }
    } catch (error) {
      toast.error("Failed to convert base64 string to file");
    }
  };

  const handledownload = async () => {
    if (generatedFiles.length > 1) {
      const zip = new JSZip();
      for (const file of generatedFiles) {
        zip.file(file.name, file);
      }
      await zip.generateAsync({ type: "blob" }).then((content) => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(content);
        element.download = "files.zip";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      });
      return;
    }
  };

  return (
    <>
      <ToolButtons
        first={
          <div className="mb-2 flex gap-2">
            <Button onClick={handleConversion}>
              <ArrowRight className="mr-2 h-4 w-4" /> Generate
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <Cog className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Settings</h4>
                  <p className="text-slate-500 text-sm dark:text-slate-400">Set options for Base64 string</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type-seperator">Seperator</Label>
                  <Input
                    id="type-seperator"
                    placeholder="Enter seperator value (Optional)"
                    className="col-span-1 h-8"
                    defaultValue={seperator}
                    onChange={(e) => {
                      setseperator(e.target.value);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        }
        second={
          <Button onClick={handledownload} variant={"secondary"}>
            <FileArchive className="mr-2 h-4 w-4" /> Download All
          </Button>
        }
      />
      <MultiEditorLayout>
        <Container>
          <Textarea value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter base64 string here" />
        </Container>
        <Container className="h-full">
          <div className="grid h-full grid-cols-3 gap-2">
            {generatedFiles.map((file) => (
              <div key={`converted-file-${file.name}`} className="flex flex-col justify-between gap-2 rounded bg-slate-100 p-2 text-xs leading-7 dark:bg-slate-700">
                <p className="overflow-hidden text-ellipsis font-medium text-slate-800 text-sm leading-2 dark:text-slate-100">Name: {file.name}</p>
                <p className="mt-1 overflow-hidden text-ellipsis text-slate-500 text-sm dark:text-slate-400">Size: {Math.ceil(file.size / 1024)} Kb</p>

                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </MultiEditorLayout>
    </>
  );
};

export default FromBase64;
