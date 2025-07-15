import { services } from "@/data/arch-services";
import { cn } from "@/lib/utils";
import { SiFirebase } from "react-icons/si";
import { Handle, type HandleType, type NodeProps, NodeResizer, type Position } from "reactflow";

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
  const Icon = services.find((v) => v.id === props.data.service)?.icon;

  return (
    <>
      <NodeResizer isVisible={props.selected} minHeight={32} minWidth={112} />

      <div
        className={cn("relative flex h-full min-h-8 min-w-28 items-center justify-center rounded px-4 py-2 text-secondary-foreground shadow", {
          "border-2 border-secondary-foreground": props.selected,
          "border-2 border-secondary": !props.selected,
        })}
        style={{
          background: props.data.color ?? "hsl(var(--secondary))",
        }}
      >
        <div className="flex items-center justify-between gap-3 rounded">
          <div className="rounded bg-muted">
            <div className="flex items-center justify-center rounded bg-yellow-500 p-1.5">
              {Icon !== undefined ? <Icon className="h-2 w-2" /> : <SiFirebase className="h-2 w-2" />}
            </div>
          </div>
          <p className={cn("font-bold text-xs")}>{props.data.label} </p>
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
