"use client";

import { DockerComposeContextProvider } from "./DockerComposeContext";
import BaseLayout from "@layout/BaseLayout";
import TabbedLayout from "@layout/TabbedLayout";
import DockerFileGenerator from "./docker-file-generator";
import CommandParser from "./command-parser";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <BaseLayout
        title="Docker Compose Generator"
        desc="Generate docker-compose.yml files"
        toolId={7}
      >
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
