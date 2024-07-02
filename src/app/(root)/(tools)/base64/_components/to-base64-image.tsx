"use client";

import Container from "@components/Container/Container";
import { Button } from "@components/ui/button";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { toBase64 } from "@utils/formatters";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown";
import { ArrowDown, Copy, Download, Eraser, XCircle } from "lucide-react";
import ToolButtons from "@components/ToolButtons/ToolButtons";

const ToBase64 = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  const handleRemove = (file: File) => {
    setFiles(files.filter((f) => f.name !== file.name));
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleDownload = async () => {
    const element = document.createElement("a");

    const base64Array = await Promise.all(files.map((file) => toBase64(file)));

    const string = base64Array.join("\n-----COPY TILL NEXT SEPERATOR-----\n");

    const file = new Blob([string], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "strings.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleCopyBase64 = async (
    file: File,
    { excludeData = false }: { excludeData?: boolean },
  ) => {
    let string = await toBase64(file);
    if (excludeData) string = string.replace(/^data:(.*,)?/, ""); //remove "data:*" from string
    navigator.clipboard.writeText(string);
    toast.success("Copied to clipboard");
  };

  // on command + o press open file dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "o") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return (
    <>
      <ToolButtons
        first={
          <div className="flex gap-2 self-end">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download TXT File
            </Button>
            <Button onClick={handleClear} variant={"outline"}>
              <Eraser className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        }
      />

      <MultiEditorLayout>
        <Container>
          <div
            {...getRootProps({
              className:
                " leading-none peer-disabled:cursor-not-allowed rounded peer-disabled:opacity-70 border-4 text-slate-800 dark:text-slate-100 h-full flex items-center justify-center text-sm font-medium   border-dashed border-gray-300 p-4",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drop file here to be converted</p>
            )}
          </div>
        </Container>
        <Container>
          <div className="grid grid-cols-3 flex-wrap gap-2">
            {files.map((file) => (
              <div
                key={`converted-file-${file.name}`}
                className="flex flex-col justify-between gap-2 rounded bg-slate-100 p-2 text-xs leading-7 dark:bg-slate-700"
              >
                <div className="self-end">
                  <XCircle
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleRemove(file)}
                  />
                </div>
                <p className="leading-2 overflow-hidden overflow-ellipsis text-sm font-medium text-slate-800 dark:text-slate-100">
                  Name: {file.name}
                </p>
                <p className="mt-1 overflow-hidden overflow-ellipsis text-sm text-slate-500 dark:text-slate-400">
                  Size: {Math.ceil(file.size / 1024)} Kb
                </p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex justify-between">
                      <div className="flex items-center gap-2">Copy as...</div>
                      <ArrowDown className="mr-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      onClick={() =>
                        handleCopyBase64(file, { excludeData: false })
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" /> Full Base64
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      onClick={() =>
                        handleCopyBase64(file, { excludeData: true })
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" /> Without MIME data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </Container>
      </MultiEditorLayout>
    </>
  );
};

export default ToBase64;
