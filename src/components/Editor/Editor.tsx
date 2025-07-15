"use client";

import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { forwardRef } from "react";

import CodeMirror, {
	type Extension,
	type ViewUpdate,
	type ReactCodeMirrorRef,
} from "@uiw/react-codemirror";

const Editor = forwardRef<ReactCodeMirrorRef, EditorProps>((props, ref) => {
	const {
		value,
		setValue,
		language = javascript({ typescript: true }),
		disabled = false,
		placeholder = "",
	} = props;
	return (
		<CodeMirror
			className="overflow-x h-full overflow-hidden"
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
