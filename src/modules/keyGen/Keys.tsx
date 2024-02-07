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
      <div className="flex flex-col gap-4 space-y-2">
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
    <div className="rounded border-2 border-slate-300 px-6 py-3 dark:border-slate-900 dark:bg-slate-900">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2  text-3xl font-semibold tracking-tight text-slate-800 first:mt-0 dark:text-slate-100">{title}</h2>
        <div className="flex space-x-2">
          <Button
            size={"sm"}
            onClick={async () => {
              await navigator.clipboard.writeText(ids.join("\n"));
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="h-4 w-4" /> Copy all
          </Button>
          <Button size={"sm"} onClick={setId}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-4  text-center">
        {ids.map((_, i) => (
          <div
            key={i}
            className="cursor-pointer rounded bg-slate-400 py-2 text-slate-700 hover:bg-slate-800 hover:text-slate-50"
            onClick={async () => {
              if (ids.at(i) == undefined) return;
              await navigator.clipboard.writeText(ids.at(i) ?? "");
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
