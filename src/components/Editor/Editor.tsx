"use client";

import { Textarea } from "@components/ui/textarea";
import { type TextareaCodeEditorProps } from "@uiw/react-textarea-code-editor";
import "@uiw/react-textarea-code-editor/dist.css";
import { cn } from "@utils/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
const Editor = forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  const { value, setValue, language = "javascript", disabled = false, placeholder = "" } = props;
  return (
    <CodeEditor
      ref={ref}
      disabled={disabled}
      value={value}
      language={language}
      placeholder={placeholder}
      onChange={setValue}
      padding={15}
      className={cn("h-full  min-h-64 rounded-md bg-secondary font-mono text-primary-foreground")}
    />
  );
});

Editor.displayName = "Editor";

interface EditorProps {
  value: string;
  setValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default Editor;
