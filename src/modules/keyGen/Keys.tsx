"use client";

import cuid2 from "@paralleldrive/cuid2";
import { Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@components/ui/Button";

const Keys = () => {
  const [uuids, setUuids] = useState<string[]>(Array.from({ length: 8 }).map(() => crypto.randomUUID()));
  const [cuids, setCuids] = useState<string[]>(Array.from({ length: 8 }).map(() => cuid2.createId()));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2 gap-4">
        <KeyContainer
          ids={uuids}
          setId={() => {
            setUuids(Array.from({ length: 8 }).map(() => crypto.randomUUID()));
          }}
          title="UUID"
        />
        <KeyContainer
          ids={cuids}
          setId={() => {
            setCuids(Array.from({ length: 8 }).map(() => cuid2.createId()));
          }}
          title="CUID"
        />
      </div>
    </div>
  );
};

const KeyContainer = ({ ids, setId, title }: { ids: string[]; setId: () => void; title: string; description?: string }) => {
  return (
    <div className="px-6 py-3 rounded bg-slate-500">
      <div className="flex justify-between">
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">{title}</h2>
        <div className="flex space-x-2">
          <Button
            size={"sm"}
            onClick={() => {
              navigator.clipboard.writeText(ids.join("\n"));
              toast.success("Copied to clipboard");
            }}
          >
            <Copy /> Copy all
          </Button>
          <Button size={"sm"} onClick={setId}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 text-center py-4  gap-4">
        {ids.map((_, i) => (
          <div
            key={i}
            className="bg-slate-400 py-2 rounded hover:bg-slate-800 text-slate-700 hover:text-slate-50 cursor-pointer"
            onClick={() => {
              if (ids.at(i) == undefined) return;
              navigator.clipboard.writeText(ids.at(i) ?? "");
              toast.success("Copied to clipboard");
            }}
          >
            <p>{_}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keys;
