import type { IODataFilter } from "@/types/odata-filter";
import { format } from "date-fns";
import { s } from "node_modules/framer-motion/dist/types.d-Bq-Qm38R";
import { toast } from "sonner";

// Generate OData filter string from string value
// param filters: Array of IODataFilter objects
// param optional: Optional parameter to indicate if the filter is optional
const generateFilter = (filters: IODataFilter[], { optional = false }): string => {
  if (filters.length === 0) {
    return "";
  }

  if (filters.every((filter) => filter.value.every((value) => value === "") && filter.key === "")) {
    return "";
  }

  const filterStringArray = filters.map((filter) => {
    if (filter.value.every((value) => value === "") && filter.key === "") {
      return "";
    }

    if (filter.valueType === "date") {
      return handleDate({ key: filter.key, firstDate: filter.value[0] ?? "", secondDate: filter.value[1] ?? "", comparator: filter.comparator });
    }
    const filterValue = filter.valueType === "string" ? `'${filter.value.toString()}'` : filter.value[0];

    let filterParam = "";

    if (filter.comparator === "contains") {
      filterParam = `contains(${filter.key}, ${filterValue})`;
    } else if (filter.comparator === "endswith") {
      filterParam = `endswith(${filter.key}, ${filterValue})`;
    } else if (filter.comparator === "startswith") {
      filterParam = `startswith(${filter.key}, ${filterValue})`;
    } else if (filter.comparator === "between") {
      const fistValue = filter.value[0] ?? "";
      const sendValue = filter.value[1] ?? "";
      filterParam = `${filter.key} ge ${fistValue} and ${filter.key} le ${sendValue}`;
    } else {
      filterParam = `${filter.key} ${filter.comparator} ${filterValue}`;
    }

    if (filter.optionalComparisons !== undefined && filter.optionalComparisons.length > 0) {
      const optionalComparisons = filter.optionalComparisons.map((optionalComparison) => {
        return generateFilter([optionalComparison], { optional: true });
      });

      return `(${filterParam} or ${optionalComparisons.join(" or ")})`;
    }

    return `${filterParam}`;
  });

  const filterString = filterStringArray.join(" and ");

  if (optional) {
    return `${filterString}`;
  }

  return `$filter=${filterString}`;
};

const handleDate = ({ key, firstDate, secondDate, comparator }: { key: string; firstDate: string; secondDate: string; comparator: string }) => {
  if (firstDate === "" && secondDate === "") {
    return "";
  }
  if (comparator === "between") {
    return `${key} ge ${format(new Date(firstDate), "dd/MM/yyy")} and ${key} le ${format(new Date(secondDate), "dd/MM/yyy")}`;
  }

  return `${key} ${comparator} ${firstDate}`;
};

const generateOrderby = (key: string, direction: string) => {
  return `$orderBy=${key} ${direction}`;
};

const buildUrl = (
  url: string,
  {
    filters,
    orderByDirection,
    orderByKey,
    count = false,
    ...opt
  }: { filters?: IODataFilter[]; orderByKey?: string; orderByDirection?: string; top?: number; skip?: number; count: boolean; search?: string }
) => {
  let paramCount = 0;
  let orderBy = "";
  let filterString = "";
  let skipString = "";
  let topString = "";
  let countString = "";
  let searchString = "";

  if (filters !== undefined && filters.length > 0) {
    filterString = generateFilter(filters, { optional: false });
    paramCount++;
  }

  if (url === "") {
    toast.error("Please enter a valid URL");
    return "";
  }

  if (opt.top) {
    topString = `$top=${opt.top}`;
    paramCount++;

    if (paramCount > 1) {
      topString = `&${topString}`;
    }
  }

  if (opt.skip) {
    skipString = `$skip=${opt.skip}`;
    paramCount++;

    if (paramCount > 1) {
      skipString = `&${skipString}`;
    }
  }

  if (opt.search) {
    searchString = `$search=${opt.search}`;
    paramCount++;

    if (paramCount > 1) {
      searchString = `&${searchString}`;
    }
  }

  if (orderByKey && orderByDirection) {
    orderBy = generateOrderby(orderByKey, orderByDirection);
    if (paramCount > 0) {
      orderBy = `&${orderBy}`;
    }
    paramCount++;
  }

  if (count) {
    countString = `$count=${count}`;
    if (paramCount > 0) {
      countString = `&${countString}`;
    }
    paramCount++;
  }

  return `${url}?${filterString}${searchString}${countString}${orderBy}${topString}${skipString}`;
};

const comparatorOptions: { value: string; label: string }[] = [
  { value: "eq", label: "Equals" },
  { value: "ne", label: "Not equals" },
  { value: "gt", label: "Greater than" },
  { value: "ge", label: "Greater than or equals" },
  { value: "lt", label: "Less than" },
  { value: "le", label: "Less than or equals" },
  { value: "contains", label: "Contains" },
  { value: "endswith", label: "Ends with" },
  { value: "startswith", label: "Starts with" },
  { value: "between", label: "Between" },
];

export { generateFilter, buildUrl, comparatorOptions };
