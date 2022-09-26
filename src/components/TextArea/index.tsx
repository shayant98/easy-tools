import CodeMirror from "@uiw/react-codemirror";
import { Dispatch, SetStateAction, useCallback } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";

const TextArea = ({ value, setValue, readOnly }: TextAreaProps) => {
  const onChange = useCallback(
    (value: string) => {
      setValue && setValue(value);
    },
    [setValue]
  );

  return (
    <CodeMirror
      theme={darcula}
      height="100%"
      width="100%"
      maxWidth="100%"
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      extensions={[javascript({ typescript: true })]}
      className=" w-full h-full bg-gray-300 rounded resize-none"
    />
  );
};

interface TextAreaProps {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
}

export default TextArea;
