import { IFilter } from "app/(root)/[tools]/odata-generator/page";

// Generate OData filter string from string value
const generateFilter = (filters: IFilter[]): string => {
  if (filters.length === 0) {
    return "";
  }

  if (filters.every((filter) => filter.value === "" && filter.key === "")) {
    return "";
  }

  const filterStringArray = filters.map((filter) => {
    if (filter.value === "") {
      return "";
    }
    return `${filter.key} ${filter.comparator} ${filter.isNumber ? filter.value : `'${filter.value}'`}`;
  });

  const filterString = filterStringArray.join(" and ");

  return `$filter=${filterString}`;
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
    ...opt
  }: {
    filters?: IFilter[];
    orderByKey?: string;
    orderByDirection?: string;
    top?: number;
  }
) => {
  let paramCount = 0;
  let orderBy = "";
  let filterString = "";

  console.log("filters", filters);

  if (filters != undefined && filters.length > 0) {
    filterString = generateFilter(filters);
    paramCount++;
  }

  if (orderByKey && orderByDirection) {
    orderBy = generateOrderby(orderByKey, orderByDirection);
    if (paramCount > 0) {
      orderBy = `&${orderBy}`;
    }
    paramCount++;
  }

  return `${url}?${filterString}${orderBy}`;
};

export { generateFilter, buildUrl };
