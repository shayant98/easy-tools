"use client";

import Container from "@components/Container/Container";
import FilterInput from "@components/FilterInput/FilterInput";
import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/Select";
import { Switch } from "@components/ui/Switch";
import { buildUrl, generateFilter } from "@utils/odata";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface IFilter {
  id: number;
  key: string;
  comparator: string;
  value: string;
  isNumber: boolean;
  optionalComparisons?: IFilter[];
}

const OdataGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [filterIsActive, setFilterIsActive] = useState(true);
  const [order, setOrder] = useState(false);
  const [skip, setSkip] = useState(false);
  const [limit, setLimit] = useState(false);
  const [limitValue, setlimitValue] = useState<number>();
  const [skipValue, setskipValue] = useState<number>();
  const [orderKeyValue, setOrderKeyValue] = useState("");
  const [filterValue, setfilterValue] = useState<IFilter[]>();

  useEffect(() => {
    setfilterValue([
      {
        id: 0,
        key: "",
        comparator: "eq",
        value: "",
        isNumber: false,
      },
    ]);

    return () => {
      setfilterValue(undefined);
    };
  }, []);

  const deleteFilter = (id: number) => {
    setfilterValue((prev) => prev?.filter((filter) => filter.id !== id));
  };

  const updateFilter = (filter: IFilter) => {
    setfilterValue((prev) => {
      const newFilter = prev?.map((prevFilter) => {
        if (prevFilter.id === filter.id) {
          return {
            ...filter,
          };
        }
        return prevFilter;
      });
      return newFilter;
    });
  };

  const addFilter = () => {
    setfilterValue((prev) => {
      const newFilter = prev?.concat({
        id: prev?.length || 0,
        value: "",
        isNumber: false,
        key: "",
        comparator: "eq",
      });
      return newFilter;
    });
  };

  const addOptionalFilter = (id: number) => {
    setfilterValue((prev) => {
      const newFilter = prev?.map((filter) => {
        if (filter.id === id) {
          return {
            ...filter,
            optionalComparisons: [
              ...(filter.optionalComparisons ?? []),
              {
                id: filter.optionalComparisons?.length || 0,
                value: "",
                isNumber: false,
                key: "",
                comparator: "eq",
              },
            ],
          };
        }
        return filter;
      });
      return newFilter;
    });
  };

  //   const updateOptionalFilter = (id: number, newOptionalFilter: IFilter) => {
  //     setfilterValue((prev) => {
  //       const newFilter = prev?.map((filter) => {
  //         if (filter.id === id) {
  //           return {
  //             ...filter,
  //             optionalComparisons: [...(filter.optionalComparisons?.filter((filter) => filter.id !== newFilter.id) ?? []), newOptionalFilter],
  //           };
  //         }
  //         return filter;
  //       });
  //       return newFilter;
  //     });
  //   };

  const deleteOptionalFilter = (id: number, optionalId: number) => {
    setfilterValue((prev) => {
      const newFilter = prev?.map((filter) => {
        if (filter.id === id) {
          return {
            ...filter,
            optionalComparisons: filter.optionalComparisons?.filter((filter) => filter.id !== optionalId),
          };
        }
        return filter;
      });
      return newFilter;
    });
  };

  const handleGenerate = () => {
    console.log(
      buildUrl(baseUrl, {
        filters: filterValue,
        orderByDirection: "asc",
        orderByKey: orderKeyValue,
        // skip: skipValue,
        // limit: limitValue,
      })
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Label className="">Base URL</Label>
        <Input onChange={(e) => setBaseUrl(e.target.value)} value={baseUrl} placeholder="eg. https://www.yourdomain.com/odata" />
      </div>
      <div className="mt-4">
        <Label>Options</Label>
        <div className="grid grid-cols-1 place-items-stretch gap-3">
          <div className=" ">
            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2">
              <div className="flex justify-between   items-center gap-4">
                <Label>
                  Filter
                  <Button onClick={addFilter} variant={"default"} className="ml-2 bg-green-400">
                    <AiOutlinePlus />
                  </Button>
                </Label>
                <Switch checked={filterIsActive} onCheckedChange={(e) => setFilterIsActive(e)} />
              </div>
              {filterValue?.map((filter) => (
                <div key={`filter-${filter.id}`} className="  ">
                  <div className="flex justify-between">
                    <FilterInput disabled={!filterIsActive} filter={filter} updateFilter={updateFilter} />
                    <div className="flex gap-2">
                      <Button onClick={() => deleteFilter(filter.id)} variant={"default"} className="bg-red-400">
                        <AiOutlineMinus />
                      </Button>
                      <Button onClick={() => addOptionalFilter(filter.id)} variant={"default"} className="bg-red-400"></Button>
                    </div>
                  </div>
                  {filter.optionalComparisons != undefined && filter.optionalComparisons.length > 0 && (
                    <div className="mt-2 px-10 py-4 dark:bg-slate-600">
                      {filter.optionalComparisons?.map((optionalFilter) => (
                        <div key={`filter-optional-${optionalFilter.id}`} className="flex justify-between mt-2">
                          <FilterInput disabled={!filter} filter={optionalFilter} updateFilter={updateFilter} />
                          <div className="flex gap-2">
                            <Button onClick={() => deleteOptionalFilter(filter.id, optionalFilter.id)} variant={"default"} className="bg-red-400">
                              <AiOutlineMinus />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2">
              <div className="flex justify-between mt-2 items-center gap-4">
                <Label>Order</Label>
                <Switch checked={order} onCheckedChange={(e) => setOrder(e)} />
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col grow">
                  <Label className="">Key</Label>
                  <Input value={orderKeyValue} onChange={(e) => setOrderKeyValue(e.target.value)} disabled={!order} placeholder="eg. id" />
                </div>
                <div className="flex flex-col">
                  <Label>Direction</Label>
                  <Select disabled={!order} defaultValue="asc">
                    <SelectTrigger>
                      <SelectValue className="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Ascending</SelectItem>
                      <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2">
              <div className="flex justify-between mt-2 items-center gap-4">
                <Label>Skip</Label>
                <Switch checked={skip} onCheckedChange={(e) => setSkip(e)} />
              </div>
              <Input value={skipValue} onChange={(e) => setskipValue(e.target.valueAsNumber)} disabled={!skip} placeholder="eg. 10" type="number" />
            </div>
            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2">
              <div className="flex justify-between mt-2 items-center gap-4">
                <Label htmlFor="limit-input">Limit</Label>
                <Switch id="limit-input" checked={limit} onCheckedChange={(e) => setLimit(e)} />
              </div>
              <Input value={limitValue} onChange={(e) => setlimitValue(e.target.valueAsNumber)} disabled={!limit} placeholder="eg. 10" type="number" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate}>Generate</Button>
        </div>
        <div className="mt-4">
          <Label>Generated URL</Label>
          <Container>
            <div className=""></div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default OdataGenerator;
