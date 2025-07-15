import { cn } from "@/lib/utils";
import { type NodeProps, NodeResizer } from "reactflow";

export type NodeParentData = {
  label: string;
  labelPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
  showLabel: boolean;
};

const CustomParentNode = (props: NodeProps<NodeParentData>) => {
  return (
    <>
      <NodeResizer isVisible={props.selected} minHeight={32} minWidth={112} />

      <div
        className={cn("relative h-full min-h-8 min-w-28 rounded border-primary border-dashed px-4 py-2 text-secondary-foreground shadow", {
          "border-2 border-secondary-foreground": props.selected,
          "border-2 border-secondary": !props.selected,
        })}
        style={
          {
            // background: `${props.data.color}` ?? "hsl(var(--secondary))",
          }
        }
      >
        <div
          className={cn("absolute font-bold text-secondary-foreground text-sm opacity-100", {
            "top-2 left-4": props.data.labelPosition === "topLeft",
            "top-2 right-4": props.data.labelPosition === "topRight",
            "right-4 bottom-2": props.data.labelPosition === "bottomRight",
            "bottom-2 left-4": props.data.labelPosition === "bottomLeft",
          })}
        >
          {props.data.label}
        </div>
      </div>
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

export default CustomParentNode;
