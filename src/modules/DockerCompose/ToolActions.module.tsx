import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import { useDockerCompose } from "./DockerComposeContext";
import { Cog, Download } from "lucide-react";

const ToolActions = () => {
  const { generateDockerComposeFromServices, downloadYaml } = useDockerCompose();

  return (
    <ToolButtons
      second={
        <>
          <Button onClick={generateDockerComposeFromServices}>
            <Cog className="h-4 w-4" />
            Generate
          </Button>
          <Button onClick={downloadYaml}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </>
      }
    />
  );
};

export default ToolActions;
