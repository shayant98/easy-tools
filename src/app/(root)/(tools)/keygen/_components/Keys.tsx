"use client";

import TabbedLayout from "@/layout/tabbed-layout";
import cuid2 from "@paralleldrive/cuid2";
import { useState } from "react";
import { ulid } from "ulid";
import KeyContainer from "./key-container";

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
          child: <KeyContainer ids={uuids} setId={() => setUuids(Array.from({ length: 8 }).map(() => crypto.randomUUID()))} title="UUID - Universally Unique Identifier" />,
        },
        {
          value: "cuid",
          label: "CUID",
          child: <KeyContainer ids={cuids} setId={() => setCuids(Array.from({ length: 8 }).map(() => cuid2.createId()))} title="CUID - Collision-resistant Unique Identifiers" />,
        },
        {
          value: "ulid",
          label: "ULID",
          child: (
            <KeyContainer ids={ulids} setId={() => setUlids(Array.from({ length: 8 }).map(() => ulid()))} title="ULID - Universally Unique Lexicographically Sortable Identifier" />
          ),
        },
      ]}
    />
  );
};

export default Keys;
