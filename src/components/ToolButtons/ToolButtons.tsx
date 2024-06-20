import { Separator } from "@components/ui/separator";
import { type ReactNode } from "react";

const ToolButtons = ({ first, second }: ToolButtonsProps) => {
  return (
    <div className="flex gap-2 mb-2 justify-end h-full">
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
