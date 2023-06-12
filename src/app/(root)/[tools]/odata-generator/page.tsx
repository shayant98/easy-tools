"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import FilterInput from "@components/FilterInput/FilterInput";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/Select";
import { Switch } from "@components/ui/Switch";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { buildUrl } from "@utils/odata";
import { cn } from "@utils/utils";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";
import FilterTemplates from "modules/OdataGenerator/Filter/FilterTemplates";

export interface IFilter {
  id: number;
  key: string;
  type: string;
  comparator: string;
  value: string[];
  valueType: string;
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
  const [searchKeyValue, setsearchKeyValue] = useState("");
  const [orderDirectionValue, setOrderDirectionValue] = useState("asc");
  const [filterValue, setfilterValue] = useState<IFilter[]>();
  const [generatedUrl, setgeneratedUrl] = useState("");
  const [count, setcount] = useState(false);
  const [search, setsearch] = useState(false);

  useEffect(() => {
    setfilterValue([
      {
        id: 0,
        key: "",
        type: "default",
        comparator: "eq",
        value: [""],
        valueType: "string",
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

  const addFilter = (type?: string) => {
    setfilterValue((prev) => {
      const newFilter = prev?.concat({
        id: prev?.length || 0,
        value: [""],
        key: "",
        type: type ?? "default",
        comparator: "eq",
        valueType: "string",
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
                value: [""],
                key: "",
                type: "default",
                comparator: "eq",
                valueType: "string",
              },
            ],
          };
        }
        return filter;
      });
      return newFilter;
    });
  };

  const updateOptionalFilter = (id: number, newOptionalFilter: IFilter) => {
    setfilterValue((prev) => {
      const newFilter = prev?.map((f) => {
        if (f.id === id) {
          return {
            ...f,
            optionalComparisons: [...(f.optionalComparisons?.filter((of) => of.id !== newOptionalFilter.id) ?? []), newOptionalFilter],
          };
        }
        return f;
      });
      return newFilter;
    });
  };

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
    setgeneratedUrl(
      buildUrl(baseUrl, {
        filters: filterIsActive ? filterValue : undefined,
        orderByDirection: order ? "asc" : undefined,
        orderByKey: order ? orderKeyValue : undefined,
        skip: skip ? skipValue : undefined,
        top: limit ? limitValue : undefined,
        count: count,
        search: search ? searchKeyValue : undefined,
      })
    );
  };

  const copyFilter = (filter: IFilter) => {
    setfilterValue((prev) => [...(prev ?? []), { ...filter, id: prev?.length || 0 }]);
  };

  return (
    <>
      <ToolButtons
        first={
          <Button onClick={handleGenerate}>
            <BsGear />
            Generate
          </Button>
        }
      />
      <TwoEditorLayout>
        <Container>
          <div className="flex flex-col gap-3">
            <Label className="">Base URL</Label>
            <Input onChange={(e) => setBaseUrl(e.target.value)} value={baseUrl} placeholder="eg. https://www.yourdomain.com/odata" />
          </div>
          <div className="mt-2">
            <Label>Options</Label>
            <div className="grid grid-cols-1 place-items-stretch gap-3">
              <div className="flex items-center gap-2 mt-2">
                <Switch checked={count} onCheckedChange={() => setcount((prev) => !prev)} />
                <Label>Count</Label>
              </div>

              <div className=" ">
                <div className={cn("flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2", !filterIsActive && "dark:bg-gray-900 opacity-40")}>
                  <div className="flex justify-between   items-center gap-4">
                    <Label className="flex gap-2 items-center">
                      Filter
                      <FilterTemplates onClick={addFilter} />
                    </Label>

                    <Switch checked={filterIsActive} onCheckedChange={(e) => setFilterIsActive(e)} />
                  </div>
                  {filterIsActive && (
                    <>
                      {filterValue?.map((filter) => (
                        <div key={`filter-${filter.id}`} className=" w-full ">
                          <div className="flex justify-between items-end w-full gap-2">
                            <FilterInput disabled={!filterIsActive} filter={filter} updateFilter={updateFilter} deleteFilter={deleteFilter} copyFilter={copyFilter} />
                          </div>
                          {filter.optionalComparisons != undefined && filter.optionalComparisons.length > 0 && (
                            <div className="mt-2">
                              {filter.optionalComparisons?.map((optionalFilter, i) => (
                                <Card key={`filter-optional-${optionalFilter.id}`} className="flex gap-2">
                                  <CardHeader>
                                    <div className="flex justify-between items-center">
                                      <CardTitle>Optional Comparison {i + 1}</CardTitle>{" "}
                                      <Button onClick={() => deleteOptionalFilter(filter.id, optionalFilter.id)} variant={"default"}>
                                        <AiOutlineMinus />
                                      </Button>
                                    </div>
                                    <CardContent>
                                      <FilterInput
                                        disabled={!filter}
                                        filter={optionalFilter}
                                        deleteFilter={() => deleteOptionalFilter(filter.id, optionalFilter.id)}
                                        copyFilter={() => copyFilter(optionalFilter)}
                                        updateFilter={(newOptionalFilter) =>
                                          updateFilter({
                                            ...filter,
                                            optionalComparisons: [...(filter.optionalComparisons?.filter((of) => of.id !== newOptionalFilter.id) ?? []), newOptionalFilter],
                                          })
                                        }
                                      />
                                    </CardContent>
                                  </CardHeader>
                                </Card>
                                // <div  className="flex gap-2 justify-between mt-2">

                                // </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {!count && (
                  <div className={cn("flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2", !search && "dark:bg-gray-900 opacity-40")}>
                    <div className="flex justify-between mt-2 items-center gap-4">
                      <Label>Search</Label>
                      <Switch checked={search} onCheckedChange={(e) => setsearch(e)} />
                    </div>
                    {search && (
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col grow">
                          <Label className="mb-2">Query</Label>
                          <Input value={searchKeyValue} onChange={(e) => setsearchKeyValue(e.target.value)} disabled={!search} placeholder="eg. Harold" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {!count && (
                  <div className={cn("flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2", !order && "dark:bg-gray-900 opacity-40")}>
                    <div className="flex justify-between mt-2 items-center gap-4">
                      <Label className="">Order</Label>
                      <Switch checked={order} onCheckedChange={(e) => setOrder(e)} />
                    </div>
                    {order && (
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col grow">
                          <Label className="mb-2">Key</Label>
                          <Input value={orderKeyValue} onChange={(e) => setOrderKeyValue(e.target.value)} disabled={!order} placeholder="eg. id" />
                        </div>
                        <div className="flex flex-col">
                          <Label className="mb-2">Direction</Label>
                          <Select disabled={!order} defaultValue={orderDirectionValue} onValueChange={(v) => setOrderDirectionValue(v)}>
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
                    )}
                  </div>
                )}
                {!count && (
                  <div className={cn("flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2", !skip && "dark:bg-gray-900 opacity-40")}>
                    <div className="flex justify-between mt-2 items-center gap-4">
                      <Label>Skip</Label>
                      <Switch checked={skip} onCheckedChange={(e) => setSkip(e)} />
                    </div>
                    {skip && <Input value={skipValue} onChange={(e) => setskipValue(e.target.valueAsNumber)} disabled={!limit} placeholder="eg. 10" type="number" />}
                  </div>
                )}
                {!count && (
                  <div className={cn("flex flex-col gap-2 bg-gray-100 dark:bg-gray-900  p-4 rounded mt-2", !limit && "dark:bg-gray-900 opacity-40")}>
                    <div className="flex justify-between mt-2 items-center gap-4">
                      <Label htmlFor="limit-input">Limit</Label>
                      <Switch id="limit-input" checked={limit} onCheckedChange={(e) => setLimit(e)} />
                    </div>
                    {limit && <Input value={limitValue} onChange={(e) => setlimitValue(e.target.valueAsNumber)} disabled={!limit} placeholder="eg. 10" type="number" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <Editor
            disabled
            value={generatedUrl}
            setValue={() => {
              return;
            }}
            placeholder="Generated URL will appear here"
            language="js"
          />
        </Container>
      </TwoEditorLayout>

      <div className="mt-4">
        <div className="mt-4 flex justify-end"></div>
      </div>
    </>
  );
};

export default OdataGenerator;
