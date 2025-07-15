import DockerGenerator from "./_components/DockerGenerator.module";

export const metadata = {
	title: "Tools | Docker Compose Generator",
	description: "Generate docker-compose.yml files",
};

const DockerCompose = () => {
	return <DockerGenerator />;
};

export default DockerCompose;
