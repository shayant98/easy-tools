import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@components/ui/popover";
import { Separator } from "@components/ui/separator";
import { Switch } from "@components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Cog } from "lucide-react";

type OptionsMenuProps = {
  className: string;
  setclassName: (v: string) => void;
  addJsonKey: boolean;
  setaddJsonKey: (v: boolean) => void;
  autoCamelCase: boolean;
  setAutoCamelCase: (v: boolean) => void;
  addConstructor: boolean;
  setAddConstructor: (v: boolean) => void;
  addFreezedImport: boolean;
  setAddFreezedImport: (v: boolean) => void;
  addGeneratedParts: boolean;
  setaddGeneratedParts: (v: boolean) => void;
};

const OptionsMenu = ({
  className,
  setclassName,
  addJsonKey,
  setaddJsonKey,
  autoCamelCase,
  setAutoCamelCase,
  addConstructor,
  setAddConstructor,
  addFreezedImport,
  setAddFreezedImport,
  addGeneratedParts,
  setaddGeneratedParts,
}: OptionsMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Cog className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-4" align="start">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Settings</h4>
          <p className="text-sm">Modify how the class is generated</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type-name">Name</Label>
          <Input
            id="type-name"
            placeholder="Enter name"
            className="col-span-1 h-8"
            defaultValue={className}
            onChange={(e) => {
              setclassName(e.target.value);
            }}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add JSON keys</Label>
          <Switch
            id="type-export"
            checked={addJsonKey}
            onCheckedChange={setaddJsonKey}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add constructor</Label>
          <Switch
            id="type-export"
            checked={addConstructor}
            onCheckedChange={setAddConstructor}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Auto camelcase</Label>
          <Switch
            id="type-export"
            checked={autoCamelCase}
            onCheckedChange={setAutoCamelCase}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add freezed import</Label>
          <Switch
            id="type-export"
            checked={addFreezedImport}
            onCheckedChange={setAddFreezedImport}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add generated parts</Label>
          <Switch
            id="type-export"
            checked={addGeneratedParts}
            onCheckedChange={setaddGeneratedParts}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OptionsMenu;
