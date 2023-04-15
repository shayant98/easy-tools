import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/Select";
import { Switch } from "@components/ui/Switch";
import { IFilter } from "app/(root)/[tools]/odata-generator/page";

const FilterInput = ({ filter, updateFilter, disabled }: FilterInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <p className=" rounded py-2 px-4 dark:bg-slate-700 dark:text-slate-300">{filter.id}</p>
      <Input disabled={disabled} className="grow" placeholder="eg. id" value={filter.key} onChange={(e) => updateFilter({ ...filter, key: e.target.value.trim() })} />
      <Select disabled={disabled} defaultValue={filter.comparator}>
        <SelectTrigger className="w-[200px]">
          <SelectValue className="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eq">Equals</SelectItem>
          <SelectItem value="ne">Not equals</SelectItem>
          <SelectItem value="contains">Contains</SelectItem>
        </SelectContent>
      </Select>
      <Input disabled={disabled} className="grow" placeholder="eg. foo" value={filter.value} onChange={(e) => updateFilter({ ...filter, value: e.target.value.trim() })} />
      <div className="flex flex-col self-start">
        <Label>Is Number</Label>
        <Switch disabled={disabled} checked={filter.isNumber} onCheckedChange={(v) => updateFilter({ ...filter, isNumber: v })} />
      </div>
    </div>
  );
};

interface FilterInputProps {
  filter: IFilter;
  updateFilter: (filter: IFilter) => void;
  disabled?: boolean;
}

export default FilterInput;
