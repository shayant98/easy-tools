import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import { yaml } from "@codemirror/lang-yaml";
import { useDockerCompose } from "./docker-compose-context";

const Output = () => {
  const { yaml: yamlValue } = useDockerCompose();

  return (
    <Container>
      <Editor
        disabled
        value={yamlValue}
        setValue={() => {
          return;
        }}
        language={yaml()}
      />
    </Container>
  );
};

export default Output;
