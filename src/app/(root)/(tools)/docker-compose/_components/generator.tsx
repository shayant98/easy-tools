"use client";

import HeaderLayout from "@/layout/header-layout";
import TabbedLayout from "@/layout/tabbed-layout";
import { DockerComposeContextProvider } from "./docker-compose-context";
import CommandParser from "./command-parser";
import DockerFileGenerator from "./docker-file-generator";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <HeaderLayout title="Docker Compose Generator" desc="Generate docker-compose.yml files" toolId={7}>
        <TabbedLayout
          defaultTab="gen"
          options={[
            { label: "Generate docker file", value: "gen", child: <DockerFileGenerator /> },
            { label: "Parse docker command", value: "parse", child: <CommandParser /> },
          ]}
        />
      </HeaderLayout>
    </DockerComposeContextProvider>
  );
};

export default DockerGenerator;
