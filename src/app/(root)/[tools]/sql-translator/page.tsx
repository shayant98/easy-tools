"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@components/ui/Button";

import { api } from "@utils/api";
import Editor from "@components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import Container from "@components/Container/Container";

const SqlTranslator = () => {
  const [naturalLanguage, setnaturalLanguage] = useState("");
  const [query, setQuery] = useState("");

  const { refetch } = api.ai.sqlTranslator.useQuery(
    { query: naturalLanguage },
    {
      enabled: false,
      retry: false,
      onError(err) {
        console.log(err);

        toast("You have reached your daily limit, please try again tommorow", { type: "error" });
        return;
      },
      onSuccess(data) {
        if (data.data == undefined) {
          return;
        }
        setQuery(data.data);
      },
    }
  );

  return (
    <>
      <div className="self-end mb-2">
        <Button
          onClick={() => {
            refetch();
          }}
        >
          <p>Translate</p>
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <Editor placeholder="Enter question here" value={naturalLanguage} setValue={(e) => setnaturalLanguage(e.target.value)} language="sql" />
        </Container>
        <Container>
          <Editor value={query} setValue={(e) => setQuery(e.target.value)} disabled language="sql" />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default SqlTranslator;
