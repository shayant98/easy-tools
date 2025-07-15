"use client";

import { Button } from "@/components/ui/button";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { Cog, Download } from "lucide-react";
import { useDockerCompose } from "./DockerComposeContext";
import Output from "./Output.module";
import Form from "./form";

const DockerFileGenerator = () => {
  const { generateDockerComposeFromServices, downloadYaml } = useDockerCompose();

  return (
    <>
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
