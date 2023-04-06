import "@uiw/react-textarea-code-editor/dist.css";
import { cn } from "@utils/utils";
import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default), { ssr: false });
const Editor = ({ value, setValue, language = "js", disabled = false, placeholder = "Enter code here" }: EditorProps) => {
  return (
    <>
      <CodeEditor
        disabled={disabled}
        value={value}
        language={language}
        placeholder={placeholder}
        onChange={setValue}
        padding={15}
        className={cn("font-mono  h-full rounded-md bg-gray-50 dark:bg-slate-900")}
      />
    </>
  );
};

interface EditorProps {
  value: string;
  setValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default Editor;
