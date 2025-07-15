import BaseComponent from "@/app/_components/base-component";
import BaseLayout from "@/layout/BaseLayout";

const ToolLayout = ({ children }: { children: React.ReactNode }) => {
	return <BaseComponent>{children}</BaseComponent>;
};

export default ToolLayout;
