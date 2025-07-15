"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { useEffect, useState } from "react";
import Output from "./Output.module";
import { useDockerCompose } from "./DockerComposeContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import { Cog } from "lucide-react";
import { yaml } from "@codemirror/lang-yaml";

const CommandParser = () => {
  const { parseDockerCommand, generateDockerComposeFromServices } = useDockerCompose();
  const [commandInput, setcommandInput] = useState("");

  const onSubmit = () => {
    parseDockerCommand(commandInput);
  };

  return (
    <>
      <ToolButtons
        first={
          <Button onClick={onSubmit}>
            <Cog className="w-4 h-4 mr-2" />
            Parse
          </Button>
        }
      />
      <MultiEditorLayout>
        <Container>
          <Editor value={commandInput} setValue={setcommandInput} language={yaml()} />
        </Container>
        <Output />
      </MultiEditorLayout>
    </>
  );
};

export default CommandParser;
