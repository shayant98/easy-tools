import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import { json } from "@codemirror/lang-json";

interface JsToJsonOutputProps {
  value: string;
  setValue: (val: string) => void;
}

const JsToJsonOutput = ({ value, setValue }: JsToJsonOutputProps) => (
  <Container>
    <Editor value={value} setValue={setValue} language={json()} disabled placeholder="JSON will appear here" />
  </Container>
);

export default JsToJsonOutput;
