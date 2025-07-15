import BaseComponent from "@/app/_components/base-component";
import type { Metadata } from "next";
import DockerGenerator from "./_components/DockerGenerator.module";

export const metadata: Metadata = {
	title: "Tools | Docker Compose Generator",
	description: "Generate docker-compose.yml files",
};

const DockerCompose = () => {
	return (
		<BaseComponent>
			<DockerGenerator />
		</BaseComponent>
	);
};

export default DockerCompose;
