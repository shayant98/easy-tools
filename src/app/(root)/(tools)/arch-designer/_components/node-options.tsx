import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";
import { cn } from "@utils/utils";
import { MoreHorizontal, PanelBottomDashed, PanelLeftDashed, PanelRightDashed, PanelTopDashed, Plus, Trash2 } from "lucide-react";
import { type Node, useReactFlow, Position } from "reactflow";
import { type NodeData } from "./custom-node";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { Separator } from "@components/ui/separator";
import { Toggle } from "@components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import cuid2 from "@paralleldrive/cuid2";

const NodeOptions = ({ showMenu, id }: { showMenu: boolean; id: string }) => {
  const { getNode, setNodes } = useReactFlow();

  const node: Node<NodeData> | undefined = getNode(id);

  if (!node) {
    return null;
  }

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!node) {
      return;
    }

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        [key]: e.target.value,
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === id ? updatedNode : n)));
  };

  const handleDelete = () => {
    if (!node) {
      return;
    }

    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    toast.success("Node deleted");
  };

  const handleHandleTypeChange = (type: string, index: number) => {
    if (!node) {
      return;
    }

    const updatedHandles = node.data.handles?.map((handle, i) => {
      if (i === index) {
        return {
          ...handle,
          type,
        };
      }

      return handle;
    });

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        handles: updatedHandles,
      },
    };
    setNodes((nodes) => nodes.map((n) => (n.id === id ? updatedNode : n)));
  };

  const handleHandlePositionChange = (position: string, id: string) => {
    if (!node) {
      return;
    }

    const updatedHandles = node.data.handles?.map((handle) => {
      if (handle.id === id) {
        return {
          ...handle,
          location: position,
        };
      }

      return handle;
    });

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        handles: updatedHandles,
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
  };

  const addHandle = () => {
    if (!node) {
      return;
    }

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        handles: [
          ...node.data.handles,
          {
            type: "source",
            location: Position.Top,
            id: cuid2.createId(),
          },
        ],
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
  };

  const removeHandle = (id: string) => {
    if (!node) {
      return;
    }

    const updatedHandles = node.data.handles?.filter((handle) => handle.id !== id);

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        handles: updatedHandles,
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div
          className={cn(
            {
              "opacity-0 transition duration-100": !showMenu,
              "opacity-100": showMenu,
            },
            "absolute top-0.5 right-0.5 bg-secondary rounded p-0.5"
          )}
        >
          <MoreHorizontal size={12} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{node?.data.label}</SheetTitle>
          <SheetDescription>Modify node data</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 mt-5">
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </Button>
          </div>
          <Separator className="mt-5" />
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={node.data.label}
              onChange={(e) => {
                handleDataChange(e, "label");
              }}
            />
            <div className="flex gap-2">
              <div className="">
                <Label>Color</Label>
                <Input
                  className="w-20"
                  type="color"
                  value={node.data.color ?? "#000000"}
                  onChange={(e) => {
                    handleDataChange(e, "color");
                  }}
                />
              </div>
            </div>
          </div>
          <Separator className="mt-5" />
          {node.data.handles?.map((handle, index) => (
            <div className="flex gap-4" key={`edit-handle-${handle.id}`}>
              <Select
                defaultValue={handle.type}
                onValueChange={(e) => {
                  handleHandleTypeChange(e, index);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="source">Source</SelectItem>
                  <SelectItem value="target">Target</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-evenly">
                <Toggle
                  pressed={handle.location == Position.Top}
                  onPressedChange={(v) => {
                    if (v == false) return;
                    handleHandlePositionChange(Position.Top, handle.id);
                  }}
                >
                  <PanelTopDashed />
                </Toggle>
                <Toggle
                  pressed={handle.location == Position.Left}
                  onPressedChange={(v) => {
                    console.log(v);

                    if (v == false) return;
                    handleHandlePositionChange(Position.Left, handle.id);
                  }}
                >
                  <PanelLeftDashed />
                </Toggle>
                <Toggle
                  pressed={handle.location == Position.Bottom}
                  onPressedChange={(v) => {
                    if (v == false) return;
                    handleHandlePositionChange(Position.Bottom, handle.id);
                  }}
                >
                  <PanelBottomDashed />
                </Toggle>
                <Toggle
                  pressed={handle.location == Position.Right}
                  onPressedChange={(v) => {
                    console.log(v);

                    if (v == false) return;
                    handleHandlePositionChange(Position.Right, handle.id);
                  }}
                >
                  <PanelRightDashed />
                </Toggle>
                <Button size={"icon"} variant={"destructive"} onClick={() => removeHandle(handle.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
          <Button disabled={node.data.handles.length > 5} variant={"secondary"} onClick={addHandle}>
            <Plus size={16} className="mr-2" />
            <span>Add Handle</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NodeOptions;
