import { Separator } from "@components/ui/separator";
import { type ReactNode } from "react";

const ToolButtons = ({ first, second }: ToolButtonsProps) => {
  return (
    <div className="flex gap-2 mb-2 justify-end">
      {first}
      <Separator orientation="vertical" />
      {second}
    </div>
  );
};

interface ToolButtonsProps {
  first?: ReactNode;
  second?: ReactNode;
}

export default ToolButtons;
