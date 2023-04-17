import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import { useDockerCompose } from "./DockerComposeContext";

const Output = () => {
  const { yaml } = useDockerCompose();

  return (
    <Container>
      <Editor
        disabled
        value={yaml}
        setValue={() => {
          return;
        }}
        language="yaml"
      />
    </Container>
  );
};

export default Output;
