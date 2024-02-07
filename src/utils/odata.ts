import { type IFilter } from "app/(root)/(tools)/odata-generator/page";
import { format } from "date-fns";
import { toast } from "react-toastify";

// Generate OData filter string from string value
const generateFilter = (filters: IFilter[]): string => {
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

    if (filter.valueType == "date") {
      console.log(filter);

      return handleDate({ key: filter.key, firstDate: filter.value[0] ?? "", secondDate: filter.value[1] ?? "", comparator: filter.comparator });
    }
    const filterValue = filter.valueType == "string" ? `'${filter.value.toString()}'` : filter.value;

    if (filter.comparator === "contains") {
      return `contains(${filter.key}, ${filterValue})`;
    }

    if (filter.optionalComparisons != undefined && filter.optionalComparisons.length > 0) {
      const optionalComparisons = filter.optionalComparisons.map((optionalComparison) => {
        if (optionalComparison.valueType == "string") {
          return `${optionalComparison.key} ${optionalComparison.comparator} '${optionalComparison.value}'`;
        }

        return `${optionalComparison.key} ${optionalComparison.comparator} ${optionalComparison.value}`;
      });

      return `(${filter.key} ${filter.comparator} ${filterValue} or ${optionalComparisons.join(" or ")})`;
    }

    return `${filter.key} ${filter.comparator} ${filterValue}`;
  });

  const filterString = filterStringArray.join(" and ");

  return `$filter=${filterString}`;
};

const handleDate = ({ key, firstDate, secondDate, comparator }: { key: string; firstDate: string; secondDate: string; comparator: string }) => {
  if (firstDate === "" && secondDate === "") {
    return "";
  }
  if (comparator == "between") {
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
  }: {
    filters?: IFilter[];
    orderByKey?: string;
    orderByDirection?: string;
    top?: number;
    skip?: number;
    count: boolean;
    search?: string;
  }
) => {
  let paramCount = 0;
  let orderBy = "";
  let filterString = "";
  let skipString = "";
  let topString = "";
  let countString = "";
  let searchString = "";

  if (filters != undefined && filters.length > 0) {
    filterString = generateFilter(filters);
    paramCount++;
  }

  if (url == "") {
    toast("Please enter a valid URL", {
      type: "error",
    });
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

export { generateFilter, buildUrl };
