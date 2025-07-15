"use client";

import BaseLayout from "@/layout/BaseLayout";
import TabbedLayout from "@/layout/TabbedLayout";
import { DockerComposeContextProvider } from "./DockerComposeContext";
import CommandParser from "./command-parser";
import DockerFileGenerator from "./docker-file-generator";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <BaseLayout title="Docker Compose Generator" desc="Generate docker-compose.yml files" toolId={7}>
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
