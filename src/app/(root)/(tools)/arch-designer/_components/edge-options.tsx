import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";
import { cn } from "@utils/utils";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { type Node, useReactFlow, useUpdateNodeInternals, type Edge } from "reactflow";
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
        if (isOpen == false) {
          setSelectedEdge("");
        }
      }}
    >
      <SheetContent className="flex h-screen flex-col border-none">
        <SheetHeader>
          <SheetTitle>Edge options</SheetTitle>
          <SheetDescription>Modify edge options</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 mt-5 h-full">
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </Button>
          </div>
          <Separator className="mt-5" />
          <div className="relative h-full overflow-scroll flex flex-col gap-5"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EdgeOptions;
