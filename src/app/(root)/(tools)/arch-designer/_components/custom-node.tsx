import { cn } from "@utils/utils";
import { Plus, Save } from "lucide-react";
import { useState } from "react";
import { Handle, type NodeProps, type Position, NodeResizer } from "reactflow";
import NodeOptions from "./node-options";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import { SiAzuredevops } from "react-icons/si";
import { type IconType } from "react-icons";

export type NodeData = {
  label: string;
  color?: string;
  handles: {
    id: string;
    location: Position;
    type: "source" | "target";
  }[];
};

const CustomNode = (props: NodeProps<NodeData>) => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <>
      <NodeResizer isVisible={props.selected} minHeight={32} minWidth={112} />

      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          setshowMenu(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setshowMenu(false);
        }}
        className={cn("relative flex items-center justify-center px-4 min-w-28 min-h-8 h-full py-2 rounded shadow  text-secondary-foreground", {
          "border-2 border-secondary-foreground": props.selected,
          "border-2 border-secondary": !props.selected,
        })}
        style={{
          backgroundColor: props.data.color ?? "var(--color-secondary)",
        }}
      >
        <NodeOptions showMenu={showMenu} id={props.id} />
        <div className="flex justify-between gap-3 items-center rounded">
          <div className="bg-muted rounded">
            <div className="bg-yellow-500 rounded p-2 flex items-center justify-center">
              <SiAzuredevops size={10} />
            </div>
          </div>
          <p className={cn("text-xs font-bold")}>{props.data.label} </p>
        </div>
      </div>

      {props.data.handles.map((handle, index) => (
        <Handle id={handle.id} type={handle.type} key={handle.id} position={handle.location} />
      ))}
    </>
  );
};

// const CustomHandle = ({ position }: { position: Position }) => {
//   return (
//     <>
//       <Handle
//         className=" w-5 h-5 p-0.5 rounded-full flex items-center bg-secondary -bottom-3 border-2 border-secondary-foreground  justify-center "
//         type="source"
//         position={position}
//       />
//     </>
//   );
// };

export default CustomNode;
