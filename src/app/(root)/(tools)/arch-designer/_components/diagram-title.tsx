import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { Panel } from "reactflow";
import { toast } from "sonner";
import { useDiagramContext } from "./diagram-context";

const DiagramTitle = () => {
  const { title, setTitle } = useDiagramContext();
  const [showTitleInput, setshowTitleInput] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleSave = () => {
    setTitle(currentTitle);
    setshowTitleInput(false);
    toast.success("Title saved");
  };

  const handleDiscard = () => {
    setCurrentTitle(title);
    setshowTitleInput(false);
  };

  return (
    <Panel position="top-left" className="mt-50">
      <div className="rounded bg-muted px-4 py-4 shadow-lg">
        <div className="flex items-center justify-evenly gap-4">
          <span
            className={cn("font-bold text-xl", {
              hidden: showTitleInput,
            })}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setshowTitleInput(true);
            }}
          >
            {title}
          </span>
          <Input
            autoFocus
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className={cn("font-bold text-xl ", {
              hidden: !showTitleInput,
            })}
          />
          <Button
            className={cn({
              hidden: showTitleInput,
            })}
            size={"icon"}
            onClick={(e) => {
              e.stopPropagation();
              setshowTitleInput(true);
            }}
            variant={"outline"}
          >
            <Pencil size={12} />
          </Button>
          <Button
            className={cn({
              hidden: !showTitleInput,
            })}
            onClick={(e) => {
              handleDiscard();
            }}
            size={"icon"}
            variant={"outline"}
          >
            <X size={12} />
          </Button>
          <Button
            className={cn({
              hidden: !showTitleInput,
            })}
            onClick={(e) => {
              handleSave();
            }}
            size={"icon"}
            variant={"outline"}
          >
            <Save size={12} />
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default DiagramTitle;
