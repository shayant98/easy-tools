"use client";

import cuid2 from "@paralleldrive/cuid2";
import { Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import TabbedLayout from "@layout/TabbedLayout";
import { ulid } from "ulid";

const Keys = () => {
  const [uuids, setUuids] = useState<string[]>(Array.from({ length: 8 }).map(() => crypto.randomUUID()));
  const [cuids, setCuids] = useState<string[]>(Array.from({ length: 8 }).map(() => cuid2.createId()));
  const [ulids, setUlids] = useState<string[]>(Array.from({ length: 8 }).map(() => ulid()));

  return (
    <TabbedLayout
      defaultTab="uuid"
      options={[
        {
          value: "uuid",
          label: "UUID",
          child: (
            <KeyContainer
              ids={uuids}
              setId={() => {
                setUuids(Array.from({ length: 8 }).map(() => crypto.randomUUID()));
              }}
              title="UUID - Universally Unique Identifier"
            />
          ),
        },
        {
          value: "cuid",
          label: "CUID",
          child: (
            <KeyContainer
              ids={cuids}
              setId={() => {
                setCuids(Array.from({ length: 8 }).map(() => cuid2.createId()));
              }}
              title="CUID - Collision-resistant Unique Identifiers"
            />
          ),
        },
        {
          value: "ulid",
          label: "ULID",
          child: (
            <KeyContainer
              ids={ulids}
              setId={() => {
                setUlids(Array.from({ length: 8 }).map(() => ulid()));
              }}
              title="ULID - Universally Unique Lexicographically Sortable Identifier"
            />
          ),
        },
      ]}
    />
  );
};

const KeyContainer = ({ ids, setId, title }: { ids: string[]; setId: () => void; title: string; description?: string }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center  justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-2">
            <Button
              size={"icon"}
              onClick={async () => {
                await navigator.clipboard.writeText(ids.join("\n"));
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className=" h-4 w-4" />
            </Button>
            <Button variant={"ghost"} size={"icon"} onClick={setId}>
              <RefreshCcw className=" h-3 w-3" />
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
