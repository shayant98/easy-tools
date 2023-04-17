import { IFilter } from "app/(root)/[tools]/odata-generator/page";
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

    const filterValue = filter.valueType == "string" ? `'${filter.value}'` : filter.value;

    if (filter.comparator === "contains") {
      return `contains(${filter.key}, ${filterValue})`;
    }

    return `${filter.key} ${filter.comparator} ${filterValue}`;
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
    skip?: number;
  }
) => {
  let paramCount = 0;
  let orderBy = "";
  let filterString = "";
  let skipString = "";
  let topString = "";

  const regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "i" // fragment locator
  );

  if (!regex.test(url)) {
    toast("Please enter a valid URL", {
      type: "error",
    });
    return "";
  }

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

  if (orderByKey && orderByDirection) {
    orderBy = generateOrderby(orderByKey, orderByDirection);
    if (paramCount > 0) {
      orderBy = `&${orderBy}`;
    }
    paramCount++;
  }

  return `${url}?${filterString}${orderBy}${topString}${skipString}`;
};

export { generateFilter, buildUrl };
