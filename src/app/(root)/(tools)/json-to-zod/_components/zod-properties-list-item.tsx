import { Input } from "@components/ui/Input";
import { AccordionItem, AccordionContent, AccordionTrigger } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@components/ui/select";
import { Switch } from "@components/ui/switch";
import { type zodPropertyOption, zodPropertyOptions } from "@data/zod-property-options";
import { cn } from "@utils/utils";
import { type ZodKeyMappedObject } from "@utils/zod";
import { Reorder, useDragControls } from "framer-motion";
import { BookOpen, GripVertical } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction } from "react";

const ZodPropertiesListItem = ({ item, setMappedObject }: { item: ZodKeyMappedObject; setMappedObject: Dispatch<SetStateAction<ZodKeyMappedObject[]>> }) => {
  const controls = useDragControls();

  const handleOptionMessageChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, id: string) => {
    setMappedObject((prev) => {
      const map = prev.map((i) => {
        if (i.id === id) {
          i.options[key] = { value: i.options[key]?.value ?? false, message: e.target.value };
        }
        return i;
      });
      return map;
    });
  };

  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <AccordionItem value={item.id} className="bg-primary-foreground pr-4 w-full rounded  items-center">
        <div className="flex items-center gap-2 px-4 w-full">
          <Button
            size={"sm"}
            variant={"ghost"}
            onPointerDown={(e) => {
              e.stopPropagation();
              controls.start(e);
            }}
          >
            <GripVertical className="w-4 h-4" />
          </Button>
          <AccordionTrigger className="gap-4 w-max grow">
            <div className="flex gap-1 items-center justify-between grow">
              <div className="flex gap-1 items-center">
                <span className="">
                  {item.name}: {item.type.toLocaleString()}
                </span>
              </div>
              <SelectedOptionsCounter options={item.options} />
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="pl-4 flex flex-col gap-2">
          {zodPropertyOptions.map((option) => {
            if (option.availableFor && !option.availableFor.includes(item.type)) return null;
            return (
              <div key={option.key} className="flex flex-col gap-2 border-2 p-4 rounded border-muted">
                <div className="flex justify-between">
                  <span>{option.title}</span>
                  <div className="flex gap-2 items-center">
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
                      <BookOpen className="w-4 h-4" />
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
          i.options[key] = { value: i.options[key]?.value ?? false, keyValue: val };
        }
        return i;
      });
      return map;
    });
  };

  if (item.type == "boolean")
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
    <div className="flex gap-1 items-center">
      <span className="text-muted-foreground text-xs">Options</span>
      {Object.keys(options).filter((val, i, arr) => {
        return options[val]?.value === true;
      }).length > 0 && (
        <div className="bg-muted px-1 py-0.5 rounded">
          <span className="text-muted-foreground text-xs">{Object.keys(options).length} selected</span>
        </div>
      )}
    </div>
  );
};
