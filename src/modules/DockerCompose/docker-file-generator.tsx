"use client";

import MultiEditorLayout from "@layout/multi-editor-layout";
import Form from "./form";
import Output from "./Output.module";
import { useDockerCompose } from "./DockerComposeContext";
import { Button } from "@components/ui/button";
import { Cog, Download } from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "@components/ui/toolbar";

const DockerFileGenerator = () => {
  const { generateDockerComposeFromServices, downloadYaml } =
    useDockerCompose();

  return (
    <>
      {/* <ToolButtons
        second={
          <>

            <Button onClick={downloadYaml}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </>
        }
      /> */}
      <Toolbar>
        <ToolbarButton asChild>
          <Button onClick={generateDockerComposeFromServices}>
            <Cog className="h-4 w-4" />
            Generate
          </Button>
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton asChild>
          <Button onClick={downloadYaml}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </ToolbarButton>
      </Toolbar>
      <MultiEditorLayout>
        <Form />
        <Output />
      </MultiEditorLayout>
    </>
  );
};

export default DockerFileGenerator;
