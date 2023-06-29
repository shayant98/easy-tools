import DatePicker from "@components/Datepicker/Datepicker";
import { Button } from "@components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/Dropdown";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/Select";
import { IFilter } from "app/(root)/(tools)/odata-generator/page";
import { parseISO } from "date-fns";
import { AiOutlineCopy, AiOutlineMinus } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { IoRemoveOutline } from "react-icons/io5";
import { TiFlowChildren } from "react-icons/ti";

const FilterInput = ({ filter, updateFilter, disabled, deleteFilter, copyFilter }: FilterInputProps) => {
  const updateValue = (newValue: string, index: number) => {
    const value = [...filter.value];
    value[index] = newValue;
    console.log(value);

    updateFilter({ ...filter, value });
  };
  if (filter.type == "default") {
    return (
      <div className="flex w-full mb-5 flex-col gap-3 ">
        <div className="flex gap-2 items-center justify-between mb-2">
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
                <BiDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => copyFilter(filter)}>
                  <AiOutlineCopy />
                  Copy filter
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onClick={() =>
                    updateFilter({
                      ...filter,
                      optionalComparisons: [
                        ...(filter.optionalComparisons ?? []),
                        {
                          id: filter.optionalComparisons?.length || 0,
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
                  <TiFlowChildren />
                  Add optional comparison
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-between w-full   ">
          <div className="flex items-center w-full gap-2 mr-2">
            <Input disabled={disabled} className="grow" placeholder="eg. id" value={filter.key} onChange={(e) => updateFilter({ ...filter, key: e.target.value.trim() })} />
            <Select
              disabled={disabled}
              defaultValue={filter.comparator}
              onValueChange={(v) => {
                if (v != "between" && filter.value.length > 1) {
                  updateFilter({ ...filter, comparator: v, value: [filter.value[0] ?? ""] });
                  return;
                }

                updateFilter({ ...filter, comparator: v });
              }}
            >
              <SelectTrigger className="w-min gap-2">
                <SelectValue className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eq">Equals</SelectItem>
                <SelectItem value="ne">Not equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="between">Between</SelectItem>
              </SelectContent>
            </Select>
            {filter.valueType == "date" ? (
              <DatePicker date={filter.value[0] ? parseISO(filter.value[0] ?? "") : undefined} setDate={(date) => updateValue(date?.toISOString() ?? "", 0)} />
            ) : (
              <Input disabled={disabled} placeholder="eg. foo" value={filter.value[0] ?? ""} onChange={(e) => updateValue(e.target.value.trim(), 0)} />
            )}
            {filter.comparator == "between" && (
              <>
                <span>&</span>
                {filter.valueType == "date" ? (
                  <DatePicker date={filter.value[1] ? parseISO(filter.value[1] ?? "") : undefined} setDate={(date) => updateValue(date?.toISOString() ?? "", 1)} />
                ) : (
                  <Input disabled={disabled} placeholder="eg. foo" value={filter.value[1] ?? ""} onChange={(e) => updateValue(e.target.value.trim(), 1)} />
                )}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => deleteFilter(filter.id)} variant={"destructive"}>
              <IoRemoveOutline />
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
}

export default FilterInput;
