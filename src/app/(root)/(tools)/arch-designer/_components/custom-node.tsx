import { cn } from "@utils/utils";
import { Handle, type NodeProps, type Position, NodeResizer, type HandleType } from "reactflow";
import { SiAzuredevops } from "react-icons/si";
import { services } from "@data/arch-services";

export type NodeData = {
  label: string;
  color?: string;
  service: number;
  handles: {
    id: string;
    location: Position;
    type: HandleType;
  }[];
};

const CustomNode = (props: NodeProps<NodeData>) => {
  const Icon = services.find((v) => v.id == props.data.service)?.icon;

  return (
    <>
      <NodeResizer isVisible={props.selected} minHeight={32} minWidth={112} />

      <div
        className={cn("relative flex items-center justify-center px-4 min-w-28 min-h-8 h-full py-2 rounded shadow  text-secondary-foreground", {
          "border-2 border-secondary-foreground": props.selected,
          "border-2 border-secondary": !props.selected,
        })}
        style={{
          background: props.data.color ?? "hsl(var(--secondary))",
        }}
      >
        <div className="flex justify-between gap-3 items-center rounded">
          <div className="bg-muted rounded">
            <div className="bg-yellow-500 rounded p-1.5 flex items-center justify-center">
              {Icon != undefined ? <Icon className="w-2 h-2" /> : <SiAzuredevops className="w-2 h-2" />}
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
