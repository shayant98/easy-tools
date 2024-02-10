"use client"

import TwoEditorLayout from "@layout/TwoEditorLayout";
import Form from "./Form.module";
import Output from "./Output.module";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { useDockerCompose } from "./DockerComposeContext";
import { Button } from "@components/ui/button";
import { Cog, Download } from "lucide-react";

const DockerFileGenerator = () => {
      const { generateDockerComposeFromServices, downloadYaml } = useDockerCompose();

    return (
        <>
         <ToolButtons
      second={
        <>
          <Button onClick={generateDockerComposeFromServices}>
            <Cog className="h-4 w-4" />
            Generate
          </Button>
          <Button onClick={downloadYaml}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </>
      }
    />
         <TwoEditorLayout>
          <Form />
          <Output />
        </TwoEditorLayout></>
    );
}

export default DockerFileGenerator;