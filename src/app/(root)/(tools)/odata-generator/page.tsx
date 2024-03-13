"use client";

import Container from "@components/Container/Container";
import Editor from "@components/Editor/Editor";
import FilterInput from "@components/FilterInput/FilterInput";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Switch } from "@components/ui/switch";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { buildUrl } from "@utils/odata";
import { cn } from "@utils/utils";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import FilterTemplates from "modules/OdataGenerator/Filter/FilterTemplates";
import { Cog } from "lucide-react";
import BaseLayout from "@layout/BaseLayout";

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
    setfilterValue((prev) => [...(prev ?? []), { ...filter, id: prev?.length ?? 0 }]);
  };

  return (
    <BaseLayout title="ODATA Generator" desc="Generate ODATA queries with ease." toolId={12}>
      <ToolButtons
        first={
          <Button onClick={handleGenerate}>
            <Cog className="mr-2 h-4 w-4" />
            Generate
          </Button>
        }
      />
      <MultiEditorLayout>
        <Container>
          <div className="flex flex-col gap-3">
            <Label className="">Base URL</Label>
            <Input onChange={(e) => setBaseUrl(e.target.value)} value={baseUrl} placeholder="eg. https://www.yourdomain.com/odata" />
          </div>
          <div className="mt-2">
            <Label>Options</Label>
            <div className="grid grid-cols-1 place-items-stretch gap-3">
              <div className="mt-2 flex items-center gap-2">
                <Switch checked={count} onCheckedChange={() => setcount((prev) => !prev)} />
                <Label>Count</Label>
              </div>

              <div className=" ">
                <div className={cn("mt-2 flex flex-col gap-2 rounded  bg-gray-100 p-4 dark:bg-gray-900", !filterIsActive && "opacity-40 dark:bg-gray-900")}>
                  <div className="flex items-center   justify-between gap-4">
                    <Label className="flex items-center gap-2">
                      Filter
                      <FilterTemplates onClick={addFilter} />
                    </Label>

                    <Switch checked={filterIsActive} onCheckedChange={(e) => setFilterIsActive(e)} />
                  </div>
                  {filterIsActive && (
                    <>
                      {filterValue?.map((filter) => (
                        <div key={`filter-${filter.id}`} className=" w-full ">
                          <div className="flex w-full items-end justify-between gap-2">
                            <FilterInput
                              isOptional={false}
                              disabled={!filterIsActive}
                              filter={filter}
                              updateFilter={updateFilter}
                              deleteFilter={deleteFilter}
                              copyFilter={copyFilter}
                            />
                          </div>
                          {filter.optionalComparisons != undefined && filter.optionalComparisons.length > 0 && (
                            <div className="mt-2">
                              {filter.optionalComparisons?.map((optionalFilter, i) => (
                                <Card key={`filter-optional-${optionalFilter.id}`}>
                                  <CardHeader>
                                    <div className="flex w-full items-center justify-between">
                                      <CardTitle>Optional Comparison {i + 1}</CardTitle>{" "}
                                      {/* <Button onClick={() => deleteOptionalFilter(filter.id, optionalFilter.id)} variant={"destructive"} size={"icon"}>
                                        <MinusCircle className="h-4 w-4" />
                                      </Button> */}
                                    </div>
                                    <CardContent>
                                      <FilterInput
                                        isOptional={true}
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
                {
                  <div className={cn("mt-2 flex flex-col gap-2 rounded  bg-gray-100 p-4 dark:bg-gray-900", !search && "opacity-40 dark:bg-gray-900")}>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <Label>Search</Label>
                      <Switch checked={search} onCheckedChange={(e) => setsearch(e)} />
                    </div>
                    {search && (
                      <div className="flex items-center gap-2">
                        <div className="flex grow flex-col">
                          <Label className="mb-2">Query</Label>
                          <Input value={searchKeyValue} onChange={(e) => setsearchKeyValue(e.target.value)} disabled={!search} placeholder="eg. Harold" />
                        </div>
                      </div>
                    )}
                  </div>
                }
                {
                  <div className={cn("mt-2 flex flex-col gap-2 rounded  bg-gray-100 p-4 dark:bg-gray-900", !order && "opacity-40 dark:bg-gray-900")}>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <Label className="">Order</Label>
                      <Switch checked={order} onCheckedChange={(e) => setOrder(e)} />
                    </div>
                    {order && (
                      <div className="flex items-center gap-2">
                        <div className="flex grow flex-col">
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
                }
                {
                  <div className={cn("mt-2 flex flex-col gap-2 rounded  bg-gray-100 p-4 dark:bg-gray-900", !skip && "opacity-40 dark:bg-gray-900")}>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <Label>Skip</Label>
                      <Switch checked={skip} onCheckedChange={(e) => setSkip(e)} />
                    </div>
                    {skip && <Input value={skipValue} onChange={(e) => setskipValue(e.target.valueAsNumber)} disabled={!limit} placeholder="eg. 10" type="number" />}
                  </div>
                }
                {
                  <div className={cn("mt-2 flex flex-col gap-2 rounded  bg-gray-100 p-4 dark:bg-gray-900", !limit && "opacity-40 dark:bg-gray-900")}>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <Label htmlFor="limit-input">Limit</Label>
                      <Switch id="limit-input" checked={limit} onCheckedChange={(e) => setLimit(e)} />
                    </div>
                    {limit && <Input value={limitValue} onChange={(e) => setlimitValue(e.target.valueAsNumber)} disabled={!limit} placeholder="eg. 10" type="number" />}
                  </div>
                }
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <Editor disabled value={generatedUrl} setValue={setgeneratedUrl} placeholder="Generated URL will appear here" />
        </Container>
      </MultiEditorLayout>

      <div className="mt-4">
        <div className="mt-4 flex justify-end"></div>
      </div>
    </BaseLayout>
  );
};

export default OdataGenerator;
