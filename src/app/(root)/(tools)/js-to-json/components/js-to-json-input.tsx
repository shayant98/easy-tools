import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";

interface JsToJsonInputProps {
  value: string;
  setValue: (val: string) => void;
  errorMessage?: string;
}

const JsToJsonInput = ({ value, setValue, errorMessage }: JsToJsonInputProps) => (
  <Container errorMessage={errorMessage}>
    <Editor value={value} setValue={setValue} placeholder="Enter JS here" />
  </Container>
);

export default JsToJsonInput;
