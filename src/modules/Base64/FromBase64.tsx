"use client";

import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Textarea } from "@components/ui/Textarea";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { base64toFile } from "@utils/formatters";
import JSZip from "jszip";
import { ArrowRight, Cog, Download, FileArchive } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const FromBase64 = () => {
  const [input, setinput] = useState("");
  const [seperator, setseperator] = useState("");
  const [generatedFiles, setgeneratedFiles] = useState<File[]>([]);

  const handleConversion = async () => {
    if (input == "") {
      return;
    }
    setgeneratedFiles([]);
    let strings;
    if (seperator != "") {
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
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handledownload = () => {
    if (generatedFiles.length > 1) {
      const zip = new JSZip();
      for (const file of generatedFiles) {
        zip.file(file.name, file);
      }
      zip.generateAsync({ type: "blob" }).then((content) => {
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
      <div className="mb-2 flex gap-2">
        <div className="basis-1/2 flex justify-end ">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-9 self-end rounded-md mr-1 p-0">
                <Cog className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Set options for Base64 string</p>
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
          <Button onClick={handleConversion}>
            <ArrowRight className="w-4 h-4" /> Generate
          </Button>
        </div>
        <div className="flex basis-1/2 justify-end">
          <Button onClick={handledownload}>
            <FileArchive className="w-4 h-4" /> Download all
          </Button>
        </div>
      </div>
      <TwoEditorLayout>
        <Container>
          <Textarea className="h-full  " value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter base64 string here" />
        </Container>
        <Container>
          <div className="grid grid-cols-3 gap-2">
            {generatedFiles.map((file) => (
              <div key={`converted-file-${file.name}`} className="dark:bg-slate-700 p-2 bg-slate-100 justify-between  rounded text-xs leading-7 flex flex-col gap-2">
                <p className="overflow-hidden overflow-ellipsis text-sm text-slate-800 dark:text-slate-100 font-medium leading-2">Name: {file.name}</p>
                <p className="overflow-hidden overflow-ellipsis text-sm text-slate-500 dark:text-slate-400 mt-1">Size: {Math.ceil(file.size / 1024)} Kb</p>

                <Button>
                  <Download className="w-4 h-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default FromBase64;
