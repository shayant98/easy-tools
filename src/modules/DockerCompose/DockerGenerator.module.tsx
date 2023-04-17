"use client";

import TwoEditorLayout from "@layout/TwoEditorLayout";
import { DockerComposeContextProvider } from "./DockerComposeContext";
import Form from "./Form.module";
import Output from "./Output.module";
import ToolActions from "./ToolActions.module";

const DockerGenerator = () => {
  return (
    <DockerComposeContextProvider>
      <ToolActions />
      <TwoEditorLayout>
        <Form />
        <Output />
      </TwoEditorLayout>
    </DockerComposeContextProvider>
  );
};

export default DockerGenerator;
