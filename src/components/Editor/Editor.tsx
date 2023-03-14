import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default), { ssr: false });
const Editor = ({ value, setValue, language = "js", disabled = false, placeholder = "Enter code here" }: EditorProps) => {
  return (
    <div>
      <CodeEditor disabled={disabled} value={value} language={language} placeholder={disabled ? "" : placeholder} onChange={setValue} padding={15} className="bg-gray-900 " />
    </div>
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
