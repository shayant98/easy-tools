import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/Button";
import { useDockerCompose } from "./DockerComposeContext";
import { Cog, Download } from "lucide-react";

const ToolActions = () => {
  const { generateDockerComposeFromServices, downloadYaml } = useDockerCompose();

  return (
    <ToolButtons
      second={
        <>
          <Button onClick={generateDockerComposeFromServices}>
            <Cog className="w-4 h-4" />
            Generate
          </Button>
          <Button onClick={downloadYaml}>
            <Download className="w-4 h-4" /> Download
          </Button>
        </>
      }
    />
  );
};

export default ToolActions;
