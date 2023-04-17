import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/Button";
import { AiOutlineDownload } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { useDockerCompose } from "./DockerComposeContext";

const ToolActions = () => {
  const { generateDockerComposeFromServices, downloadYaml } = useDockerCompose();

  return (
    <ToolButtons
      second={
        <>
          <Button onClick={generateDockerComposeFromServices}>
            <BsGear />
            Generate
          </Button>
          <Button onClick={downloadYaml}>
            <AiOutlineDownload /> Download
          </Button>
        </>
      }
    />
  );
};

export default ToolActions;
