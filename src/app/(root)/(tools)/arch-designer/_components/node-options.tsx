import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@components/ui/sheet";
import { Trash2 } from "lucide-react";
import { type Node, useReactFlow } from "reactflow";
import { type NodeData } from "./custom-node";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { Separator } from "@components/ui/separator";
import ColorPicker from "app/_components/color-picker";
import ServicePicker from "./service-picker";
import HandleCreator from "./handle-creator";
import { useDiagramContext } from "./diagram-context";
import { Switch } from "@components/ui/switch";
import { type NodeParentData } from "./custom-parent-node";

const NodeOptions = () => {
  const { showNodeOptions, setShowNodeOptions, selectedNode: node, setSelectedNode } = useDiagramContext();

  const { setNodes, getNodes, deleteElements } = useReactFlow();

  if (!node) {
    return null;
  }

  const handleDataChange = (value: unknown, key: string) => {
    if (!node) {
      return;
    }

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        [key]: value,
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  };

  const handleDelete = () => {
    if (!node) {
      return;
    }

    //check if node has children
    const updatedNodes = getNodes()
      .map((n) => {
        if (n.parentNode === node.id) {
          n.parentNode = undefined;
          n.extent = undefined;
        }
        return n;
      })
      .filter((n) => n.id !== node.id);

    setNodes((nodes) => updatedNodes);
    toast.success("Node deleted");
  };

  return (
    <Sheet open={showNodeOptions} onOpenChange={setShowNodeOptions}>
      <SheetContent className="flex h-screen flex-col border-none">
        <SheetHeader>
          <SheetTitle>{node?.data.label}</SheetTitle>
          <SheetDescription>Modify node data</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 mt-5 h-full">
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </Button>
          </div>
          <Separator className="mt-5" />
          <div className="relative h-full overflow-scroll flex flex-col gap-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={node.data.label}
                onChange={(e) => {
                  handleDataChange(e.target.value, "label");
                }}
              />
              <Separator className="mb-10" />

              {node.type === "archParentNode" && (
                <>
                  <div className="flex flex-row items-center justify-between rounded-lg border border-muted p-3 mt-10 shadow-sm">
                    <div className="space-y-0.5">
                      <Label>Show Label</Label>
                    </div>
                    <Switch checked={(node as Node<NodeParentData>).data.showLabel} onCheckedChange={(val) => handleDataChange(val, "showLabel")} />
                  </div>
                </>
              )}

              {node.type !== "archParentNode" && (
                <>
                  <div className="">
                    <Label>Color</Label>
                  </div>
                  <ColorPicker background={(node as Node<NodeData>).data.color ?? ""} setBackground={(v) => handleDataChange(v, "color")} />
                  <Separator className="my-5" />
                </>
              )}
            </div>

            {node.type !== "archParentNode" && (
              <>
                <HandleCreator node={node as Node<NodeData>} />
                <Separator className="my-2.5" />
              </>
            )}

            {node.type !== "archParentNode" && <ServicePicker node={node as Node<NodeData>} />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NodeOptions;
