import CodeMirror from "@uiw/react-codemirror";
import { Dispatch, SetStateAction, useCallback } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { darcula } from "@uiw/codemirror-theme-darcula";

const TextArea = ({ value, setValue, readOnly, language = "JS" }: TextAreaProps) => {
  return (
    <CodeMirror
      basicSetup={{
        lineNumbers: false,
        bracketMatching: true,
      }}
      height="100%"
      width="100%"
      theme={darcula}
      value={value}
      readOnly={readOnly}
      onChange={setValue}
      className="h-full rounded-full p-1"
      extensions={[language == "MD" ? markdown({}) : javascript({ typescript: true })]}
    />
  );
};

interface TextAreaProps {
  language?: "JS" | "MD";
  value: string;
  setValue?: (value: string) => void;
  readOnly?: boolean;
}

export default TextArea;
