import DatePicker from "@/components/Datepicker/Datepicker";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { comparatorOptions } from "@/utils/odata";
import { cn } from "@/lib/utils";
import type { IFilter } from "app/(root)/(tools)/odata-generator/page";
import { parseISO } from "date-fns";
import { Copy, ListEnd, MoreVertical, Trash } from "lucide-react";

const FilterInput = ({ filter, updateFilter, disabled, deleteFilter, copyFilter, isOptional = false }: FilterInputProps) => {
  const updateValue = (newValue: string, index: number) => {
    const value = [...filter.value];
    value[index] = newValue;
    console.log(value);

    updateFilter({ ...filter, value });
  };
  if (filter.type === "default") {
    return (
      <div className="mb-5 flex w-full flex-col gap-3 ">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Label>Filter {filter.key}</Label>
          <div className="flex gap-2">
            <Select
              autoComplete="true"
              disabled={disabled}
              defaultValue={filter.valueType}
              onValueChange={(v) => {
                updateFilter({ ...filter, valueType: v, value: [] });
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="mr-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => copyFilter(filter)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy filter
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={cn("cursor-pointer gap-2", {
                    hidden: isOptional,
                  })}
                  onClick={() =>
                    updateFilter({
                      ...filter,
                      optionalComparisons: [
                        ...(filter.optionalComparisons ?? []),
                        {
                          id: filter.optionalComparisons?.length ?? 0,
                          value: [""],
                          key: "",
                          type: "default",

                          comparator: "eq",
                          valueType: "string",
                        },
                      ],
                    })
                  }
                >
                  <ListEnd className="mr-2 h-4 w-4" />
                  Add optional comparison
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div className="mr-2 flex w-full items-center gap-2">
            <Input disabled={disabled} className="grow" placeholder="eg. id" value={filter.key} onChange={(e) => updateFilter({ ...filter, key: e.target.value.trim() })} />
            <Select
              disabled={disabled}
              defaultValue={filter.comparator}
              onValueChange={(v) => {
                if (v !== "between" && filter.value.length > 1) {
                  updateFilter({
                    ...filter,
                    comparator: v,
                    value: [filter.value[0] ?? ""],
                  });
                  return;
                }

                updateFilter({ ...filter, comparator: v });
              }}
            >
              <SelectTrigger className="w-min gap-2">
                <SelectValue className="" />
              </SelectTrigger>
              <SelectContent>
                {comparatorOptions.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {filter.valueType === "date" ? (
              <DatePicker date={filter.value[0] ? parseISO(filter.value[0] ?? "") : undefined} setDate={(date) => updateValue(date?.toISOString() ?? "", 0)} />
            ) : (
              <Input disabled={disabled} placeholder="eg. foo" value={filter.value[0] ?? ""} onChange={(e) => updateValue(e.target.value.trim(), 0)} />
            )}
            {filter.comparator === "between" && (
              <>
                <span>&</span>
                {filter.valueType === "date" ? (
                  <DatePicker date={filter.value[1] ? parseISO(filter.value[1] ?? "") : undefined} setDate={(date) => updateValue(date?.toISOString() ?? "", 1)} />
                ) : (
                  <Input disabled={disabled} placeholder="eg. foo" value={filter.value[1] ?? ""} onChange={(e) => updateValue(e.target.value.trim(), 1)} />
                )}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => deleteFilter(filter.id)} variant={"destructive"} size={"icon"}>
              <Trash className="h-4 w-4" />
            </Button>

            {/* <Button onClick={() => addOptionalFilter(filter.id)} variant={"default"} ></Button> */}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

interface FilterInputProps {
  filter: IFilter;
  updateFilter: (filter: IFilter) => void;
  deleteFilter: (id: number) => void;
  copyFilter: (filter: IFilter) => void;
  disabled?: boolean;
  isOptional: boolean;
}

export default FilterInput;
