"use client";

import cuid2 from "@paralleldrive/cuid2";
import { Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-2">
            <Button
              size={"sm"}
              onClick={async () => {
                await navigator.clipboard.writeText(ids.join("\n"));
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy all
            </Button>
            <Button size={"sm"} onClick={setId}>
              <RefreshCcw className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-4  text-center">
          {ids.map((_, i) => (
            <div
              key={i}
              className="cursor-pointer rounded bg-secondary py-2 text-secondary-foreground hover:bg-primary"
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
      </CardContent>
    </Card>
  );
};

export default Keys;
