import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import { cn } from "@utils/utils";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { Panel } from "reactflow";
import { useDiagramContext } from "./diagram-context";
import { toast } from "sonner";

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
      <div className="px-4 py-4 bg-muted rounded shadow-lg">
        <div className="flex items-center justify-evenly gap-4">
          <span
            className={cn("text-xl font-bold", {
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
            className={cn("text-xl font-bold ", {
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
