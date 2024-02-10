"use client";

import TwoEditorLayout from "@layout/TwoEditorLayout";
import { DockerComposeContextProvider } from "./DockerComposeContext";
import Form from "./Form.module";
import Output from "./Output.module";
import ToolActions from "./ToolActions.module";
import BaseLayout from "@layout/BaseLayout";
import TabbedLayout from "@layout/TabbedLayout";
import DockerFileGenerator from "./docker-file-generator";
import CommandParser from "./command-parser";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <BaseLayout title="Docker Compose Generator" desc="Generate docker-compose.yml files">
        <TabbedLayout
        defaultTab="gen"
        options={[
          {
            label: "Generate docker file",
            value: "gen",
            child: <DockerFileGenerator />,
          },
          {
            label: "Parse docker command",
            value: "parse",
            child: <CommandParser />,
          },
        ]}
        />
      </BaseLayout>
    </DockerComposeContextProvider>
  );
};

export default DockerGenerator;
