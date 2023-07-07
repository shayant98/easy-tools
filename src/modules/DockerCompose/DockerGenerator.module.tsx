"use client";

import TwoEditorLayout from "@layout/TwoEditorLayout";
import { DockerComposeContextProvider } from "./DockerComposeContext";
import Form from "./Form.module";
import Output from "./Output.module";
import ToolActions from "./ToolActions.module";
import BaseLayout from "@layout/BaseLayout";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <BaseLayout title="Docker Compose Generator" desc="Generate docker-compose.yml files">
        <ToolActions />
        <TwoEditorLayout>
          <Form />
          <Output />
        </TwoEditorLayout>
      </BaseLayout>
    </DockerComposeContextProvider>
  );
};

export default DockerGenerator;
