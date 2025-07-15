import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ZodOptions } from "@/types/zod-options";
import { Cog } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type OptionsProps = { options: ZodOptions; setOptions: Dispatch<SetStateAction<ZodOptions>> };
const Options = ({ options: { addImport, name, addExport, camelCase }, setOptions }: OptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"}>
          <Cog className=" h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-4" align="start">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Settings</h4>
          <p className="text-sm ">Set properties on the type object</p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add import</Label>
          <Switch id="type-import" checked={addImport} onCheckedChange={(v) => setOptions((prev) => ({ ...prev, addImport: v }))} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="type-import">Add export</Label>
          <Switch id="type-export" checked={addExport} onCheckedChange={(v) => setOptions((prev) => ({ ...prev, addExport: v }))} />
        </div>
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Label htmlFor="type-camelCase" className="cursor-pointer border-b border-dashed">
                  Auto Camel Case
                </Label>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] bg-secondary text-secondary-foreground">
                <p>
                  Replace all keys seperated by <span className="font-bold">underscores</span> & <span className="font-bold">spaces</span> with camelCase.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Switch id="type-camelCase" checked={camelCase} onCheckedChange={(v) => setOptions((prev) => ({ ...prev, camelCase: v }))} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="type-name">Name</Label>
          <Input id="type-name" value={name} onChange={(e) => setOptions((prev) => ({ ...prev, name: e.target.value }))} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Options;
