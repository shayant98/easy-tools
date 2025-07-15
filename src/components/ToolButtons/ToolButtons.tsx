import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

const ToolButtons = ({ first, second }: ToolButtonsProps) => {
	return (
		<div className="mb-2 flex h-full justify-end gap-2">
			{first}
			<Separator orientation="vertical" className="h-10 " />
			{second}
		</div>
	);
};

interface ToolButtonsProps {
	first?: ReactNode;
	second?: ReactNode;
}

export default ToolButtons;
