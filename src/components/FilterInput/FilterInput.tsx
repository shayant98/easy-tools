import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/Select";
import { IFilter } from "app/(root)/[tools]/odata-generator/page";

const FilterInput = ({ filter, updateFilter, disabled }: FilterInputProps) => {
  if (filter.type == "default") {
    return (
      <div className="flex items-center gap-2">
        <Input disabled={disabled} className="grow" placeholder="eg. id" value={filter.key} onChange={(e) => updateFilter({ ...filter, key: e.target.value.trim() })} />
        <Select disabled={disabled} defaultValue={filter.comparator} onValueChange={(v) => updateFilter({ ...filter, comparator: v })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eq">Equals</SelectItem>
            <SelectItem value="ne">Not equals</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
          </SelectContent>
        </Select>

        <Input disabled={disabled} className="grow" placeholder="eg. foo" value={filter.value} onChange={(e) => updateFilter({ ...filter, value: [e.target.value.trim()] })} />
        <Select disabled={disabled} defaultValue={filter.valueType} onValueChange={(v) => updateFilter({ ...filter, valueType: v })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (filter.type == "date-between") {
    const updateValue = (v: string, index: number) => {
      const value = filter.value.map((v, i) => (i == index ? v : v));
      updateFilter({ ...filter, value });
    };

    return (
      <div className="flex items-center gap-2">
        <p className=" rounded py-2 px-4 dark:bg-slate-700 dark:text-slate-300">{filter.id}</p>
        <Input disabled={disabled} className="grow" placeholder="eg. 2023" value={filter.key} onChange={(e) => updateFilter({ ...filter, key: e.target.value.trim() })} />
        <p className="w-[200px] text-center rounded py-2 px-4 dark:bg-slate-700 dark:text-slate-300">BETWEEN</p>
        <Input disabled={disabled} className="grow" placeholder="eg. 2023" value={filter.value[0]} onChange={(e) => updateValue(e.target.value, 0)} />
        <p className="w-[200px] text-center rounded py-2 px-4 dark:bg-slate-700 dark:text-slate-300">AND</p>
        <Input disabled={disabled} className="grow" placeholder="eg. 2023" value={filter.value[1]} onChange={(e) => updateValue(e.target.value, 1)} />
      </div>
    );
  }

  return <></>;
};

interface FilterInputProps {
  filter: IFilter;
  updateFilter: (filter: IFilter) => void;
  disabled?: boolean;
}

export default FilterInput;
