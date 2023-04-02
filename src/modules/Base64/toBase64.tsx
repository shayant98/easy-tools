import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { toBase64 } from "@utils/formatters";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClear, AiOutlineClose, AiOutlineCopy, AiOutlineDown, AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/Dropdown";

const ToBase64 = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop });

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

  const handleCopyBase64 = async (file: File, { excludeData = false }: { excludeData?: boolean }) => {
    let string = await toBase64(file);
    if (excludeData) string = string.replace(/^data:(.*,)?/, ""); //remove "data:*" from string
    navigator.clipboard.writeText(string);
    toast("Copied to clipboard", {
      type: "success",
    });
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
      <div className="flex self-end mb-2 gap-2">
        <Button onClick={handleClear} variant={"outline"}>
          <AiOutlineClear /> Clear
        </Button>

        <Button onClick={handleDownload}>
          <AiOutlineDownload /> Download TXT File
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <div
            {...getRootProps({
              className:
                " leading-none peer-disabled:cursor-not-allowed rounded peer-disabled:opacity-70 border-4 text-slate-800 dark:text-slate-100 h-full flex items-center justify-center text-sm font-medium   border-dashed border-gray-300 p-4",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drop file here to be converted</p>}
          </div>
        </Container>
        <Container>
          <div className="grid grid-cols-3 gap-2 flex-wrap">
            {files.map((file) => (
              <div key={`converted-file-${file.name}`} className="dark:bg-slate-700 p-2 bg-slate-100 justify-between  rounded text-xs leading-7 flex flex-col gap-2">
                <div className="self-end">
                  <AiOutlineClose className="cursor-pointer" onClick={() => handleRemove(file)} />
                </div>
                <p className="overflow-hidden overflow-ellipsis text-sm text-slate-800 dark:text-slate-100 font-medium leading-2">Name: {file.name}</p>
                <p className="overflow-hidden overflow-ellipsis text-sm text-slate-500 dark:text-slate-400 mt-1">Size: {Math.ceil(file.size / 1024)} Kb</p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex justify-between">
                      <div className="flex gap-2 items-center">Copy as...</div>
                      <AiOutlineDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleCopyBase64(file, { excludeData: false })}>
                      <AiOutlineCopy /> Full Base64
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleCopyBase64(file, { excludeData: false })}>
                      <AiOutlineCopy /> Without MIME data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default ToBase64;
