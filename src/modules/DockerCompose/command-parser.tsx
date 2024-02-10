"use client"

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { useEffect, useState } from "react";
import Output from "./Output.module";
import { useDockerCompose } from "./DockerComposeContext";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import { Cog } from "lucide-react";

const CommandParser = () => {
    const {parseDockerCommand, generateDockerComposeFromServices} = useDockerCompose();
    const [commandInput, setcommandInput] = useState("");

    const onSubmit = () => {
        parseDockerCommand(commandInput);
    }


    return (
        <div>
            <ToolButtons

                first={
                    <Button onClick={onSubmit}>
                        <Cog className="w-4 h-4 mr-2"/>
                        Parse</Button>

                }
            />
            <TwoEditorLayout>
                <Container>
                    <Editor value={commandInput} setValue={(e) => setcommandInput(e.target.value)} />
                </Container>
                          <Output />

            </TwoEditorLayout>
        </div>
    );
}

export default CommandParser;