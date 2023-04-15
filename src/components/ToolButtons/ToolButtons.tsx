import { ReactNode } from "react";

const ToolButtons = ({ first, second }: ToolButtonsProps) => {
  return (
    <div className="flex gap-2 mb-2">
      <div className="flex w-full  items-center gap-2 justify-end">{first}</div>
      <div className="  w-full gap-2 flex justify-end">{second}</div>
    </div>
  );
};

interface ToolButtonsProps {
  first?: ReactNode;
  second?: ReactNode;
}

export default ToolButtons;
