"use client";

import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Button } from "@/components/ui/button";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { css } from "@codemirror/lang-css";
import { TailwindConverter } from "css-to-tailwindcss";
import { Copy } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const CssToTailwindForm = () => {
	const [inputArea, setinputArea] = useState("");
	const [outputArea, setoutputArea] = useState("");

	const converter = useMemo(
		() =>
			new TailwindConverter({
				remInPx: 16, // set null if you don't want to convert rem to pixels
				postCSSPlugins: [require("postcss-nested")], // add any postcss plugins to this array
				tailwindConfig: {
					// your tailwind config here
					content: [],
					theme: {
						extend: {
							colors: {
								"custom-color": {
									100: "#123456",
									200: "hsla(210, 100%, 51.0%, 0.016)",
									300: "#654321",
									gold: "hsl(41, 28.3%, 79.8%)",
									marine: "rgb(4, 55, 242, 0.75)",
								},
							},
							screens: { "custom-screen": { min: "768px", max: "1024px" } },
						},
						supports: { grid: "display: grid", flex: "display: flex" },
					},
				},
			}),
		[],
	);
	const handleParsing = useCallback(async () => {
		try {
			if (inputArea.trim().length < 1) {
				return;
			}
			const { convertedRoot } = await converter.convertCSS(inputArea);
			setoutputArea(convertedRoot.toString());
		} catch (error) {
			console.error(error);
		}
	}, [converter, inputArea]);

	useEffect(() => {
		handleParsing();
	}, [handleParsing]);

	return (
		<>
			<ToolButtons
				second={
					<Button>
						<Copy className="mr-2 h-4 w-4" /> Copy
					</Button>
				}
			/>
			<MultiEditorLayout>
				<Container>
					<Editor
						value={inputArea}
						setValue={setinputArea}
						language={css()}
						placeholder="Enter CSS here"
					/>
				</Container>
				<Container>
					<Editor
						value={outputArea}
						setValue={setoutputArea}
						language={css()}
						disabled
					/>
				</Container>
			</MultiEditorLayout>
		</>
	);
};

export default CssToTailwindForm;
