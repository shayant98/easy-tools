import { DockerGenerator } from "modules/DockerCompose";

export const metadata = {
  title: "Tools | Docker Compose Generator",
  description: "Generate docker-compose.yml files",
};

const DockerCompose = () => {
  return <DockerGenerator />;
};

export default DockerCompose;
