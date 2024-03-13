"use client";

import { forwardRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

import CodeMirror, { type Extension, type ViewUpdate, type ReactCodeMirrorRef } from "@uiw/react-codemirror";

const Editor = forwardRef<ReactCodeMirrorRef, EditorProps>((props, ref) => {
  const { value, setValue, language = javascript({ typescript: true }), disabled = false, placeholder = "" } = props;
  return (
    // <CodeEditor
    //   ref={ref}
    //   disabled={disabled}
    //   value={value}
    //   language={language}
    //   placeholder={placeholder}
    //   onChange={setValue}
    //   padding={15}
    //   className={cn("h-full  min-h-64 rounded-md bg-secondary font-mono text-primary-foreground")}
    // />
    <CodeMirror
      className="overflow-hidden h-full overflow-x"
      readOnly={disabled}
      placeholder={placeholder}
      ref={ref}
      theme={tokyoNight}
      maxWidth="100%"
      indentWithTab={true}
      value={value}
      minHeight="100%"
      extensions={[language]}
      onChange={(val, viewUpdate) => {
        setValue(val);
      }}
    />
  );
});

Editor.displayName = "Editor";

interface EditorProps {
  value: string;
  setValue: (val: string) => void;
  language?: Extension;
  disabled?: boolean;
  placeholder?: string;
}

export default Editor;
