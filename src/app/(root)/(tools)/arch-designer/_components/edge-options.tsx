import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ColorPicker from "@/app/_components/color-picker";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { type Edge, type Node, useReactFlow, useUpdateNodeInternals } from "reactflow";
import { toast } from "sonner";
import type { NodeData } from "./custom-node";
import { useDiagramContext } from "./diagram-context";
import HandleCreator from "./handle-creator";
import ServicePicker from "./service-picker";

const EdgeOptions = ({ id }: { id: string }) => {
  const { showEdgeOptions, setShowEdgeOptions, setSelectedEdge } = useDiagramContext();

  const { getEdge, setEdges } = useReactFlow();

  const edge: Edge | undefined = getEdge(id);

  if (!edge) {
    return null;
  }

  const handleDelete = () => {
    if (!edge) {
      return;
    }

    setEdges((edges) => edges.filter((edge) => edge.id !== id));
    setShowEdgeOptions(false);
    setSelectedEdge("");
    toast.success("Edge deleted");
    return;
  };

  return (
    <Sheet
      open={showEdgeOptions}
      onOpenChange={(isOpen) => {
        setShowEdgeOptions(isOpen);
        if (isOpen === false) {
          setSelectedEdge("");
        }
      }}
    >
      <SheetContent className="flex h-screen flex-col border-none">
        <SheetHeader>
          <SheetTitle>Edge options</SheetTitle>
          <SheetDescription>Modify edge options</SheetDescription>
        </SheetHeader>

        <div className="mt-5 flex h-full flex-col gap-5">
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </Button>
          </div>
          <Separator className="mt-5" />
          <div className="relative flex h-full flex-col gap-5 overflow-scroll" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EdgeOptions;
