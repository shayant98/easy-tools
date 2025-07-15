"use client";

import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Button } from "@/components/ui/button";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { yaml } from "@codemirror/lang-yaml";
import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { useDockerCompose } from "./DockerComposeContext";
import Output from "./Output.module";

const CommandParser = () => {
	const { parseDockerCommand, generateDockerComposeFromServices } =
		useDockerCompose();
	const [commandInput, setcommandInput] = useState("");

	const onSubmit = () => {
		parseDockerCommand(commandInput);
	};

	return (
		<>
			<ToolButtons
				first={
					<Button onClick={onSubmit}>
						<Cog className="mr-2 h-4 w-4" />
						Parse
					</Button>
				}
			/>
			<MultiEditorLayout>
				<Container>
					<Editor
						value={commandInput}
						setValue={setcommandInput}
						language={yaml()}
					/>
				</Container>
				<Output />
			</MultiEditorLayout>
		</>
	);
};

export default CommandParser;
