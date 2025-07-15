import { Input } from "@/components/ui/Input";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type zodPropertyOption, zodPropertyOptions } from "@/data/zod-property-options";
import { cn } from "@/lib/utils";
import type { ZodKeyMappedObject } from "@utils/zod";
import { Reorder, useDragControls } from "framer-motion";
import { BookOpen, GripVertical } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

const ZodPropertiesListItem = ({ item, setMappedObject }: { item: ZodKeyMappedObject; setMappedObject: Dispatch<SetStateAction<ZodKeyMappedObject[]>> }) => {
  const controls = useDragControls();

  const handleOptionMessageChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, id: string) => {
    setMappedObject((prev) => {
      const map = prev.map((i) => {
        if (i.id === id) {
          i.options[key] = {
            value: i.options[key]?.value ?? false,
            message: e.target.value,
          };
        }
        return i;
      });
      return map;
    });
  };

  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <AccordionItem value={item.id} className="w-full items-center rounded bg-primary-foreground pr-4">
        <div className="flex w-full items-center gap-2 px-4">
          <Button
            size={"sm"}
            variant={"ghost"}
            onPointerDown={(e) => {
              e.stopPropagation();
              controls.start(e);
            }}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <AccordionTrigger className="w-max grow gap-4">
            <div className="flex grow items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <span className="">
                  {item.name}: {item.type.toLocaleString()}
                </span>
              </div>
              <SelectedOptionsCounter options={item.options} />
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="flex flex-col gap-2 pl-4">
          {zodPropertyOptions.map((option) => {
            if (option.availableFor && !option.availableFor.includes(item.type)) return null;
            return (
              <div key={option.key} className="flex flex-col gap-2 rounded border-2 border-muted p-4">
                <div className="flex justify-between">
                  <span>{option.title}</span>
                  <div className="flex items-center gap-2">
                    {option.hasKeyValue && ZodKeyValueInput({ item, option, setMappedObject })}
                    <Switch
                      checked={item.options[option.key]?.value}
                      onCheckedChange={(v) => {
                        setMappedObject((prev) => {
                          const map = prev.map((i) => {
                            if (i.id === item.id) {
                              i.options[option.key] = { value: v };
                            }
                            return i;
                          });
                          return map;
                        });
                      }}
                    />
                    <Link href={option.docsLink}>
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                {option.hasMessage && (
                  <Input
                    disabled={!item.options[option.key]?.value}
                    placeholder="Error message"
                    value={item.options[option.key]?.message}
                    onChange={(e) => handleOptionMessageChange(e, option.key, item.id)}
                    className={cn({
                      hidden: !item.options[option.key]?.value,
                    })}
                  />
                )}
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Reorder.Item>
  );
};

export default ZodPropertiesListItem;

const ZodKeyValueInput = ({
  item,
  option,
  setMappedObject,
}: {
  item: ZodKeyMappedObject;
  option: zodPropertyOption;
  setMappedObject: Dispatch<SetStateAction<ZodKeyMappedObject[]>>;
}) => {
  const handleOptionsKeyValueChange = (val: string, key: string, id: string) => {
    setMappedObject((prev) => {
      const map = prev.map((i) => {
        if (i.id === id) {
          i.options[key] = {
            value: i.options[key]?.value ?? false,
            keyValue: val,
          };
        }
        return i;
      });
      return map;
    });
  };

  if (item.type === "boolean")
    return (
      <Select
        disabled={!item.options[option.key]?.value}
        defaultValue={item.options[option.key]?.keyValue}
        onValueChange={(val) => handleOptionsKeyValueChange(val, option.key, item.id)}
      >
        <SelectTrigger
          className={cn("w-[180px]", {
            hidden: !item.options[option.key]?.value,
          })}
        >
          <SelectValue placeholder="Value" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
    );

  return (
    <Input
      disabled={!item.options[option.key]?.value}
      placeholder="Value"
      type={item.type === "string" ? "text" : "number"}
      value={item.options[option.key]?.keyValue}
      onChange={(e) => handleOptionsKeyValueChange(e.target.value, option.key, item.id)}
      className={cn({
        hidden: !item.options[option.key]?.value,
      })}
    />
  );
};

const SelectedOptionsCounter = ({ options }: { options: Record<string, { value: boolean; message?: string; keyValue?: string }> }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-muted-foreground text-xs">Options</span>
      {Object.keys(options).filter((val, i, arr) => {
        return options[val]?.value === true;
      }).length > 0 && (
        <div className="rounded bg-muted px-1 py-0.5">
          <span className="text-muted-foreground text-xs">{Object.keys(options).length} selected</span>
        </div>
      )}
    </div>
  );
};
