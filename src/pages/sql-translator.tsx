import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@components/ui/Button";

import BaseLayout from "@layout/BaseLayout";
import { api } from "@utils/api";
import Editor from "@components/Editor/Editor";
import TwoEditorLayout from "@layout/TwoEditorLayout";

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
    <BaseLayout showBackButton title="SQL Translator">
      <TwoEditorLayout>
        <Editor placeholder="Enter question here" value={naturalLanguage} setValue={(e) => setnaturalLanguage(e.target.value)} language="sql" />
        <Editor value={query} setValue={(e) => setQuery(e.target.value)} disabled language="sql" />
      </TwoEditorLayout>

      <div className="self-end mt-5">
        <Button
          onClick={() => {
            refetch();
          }}
        >
          <p>Translate</p>
        </Button>
      </div>
    </BaseLayout>
  );
};

export default SqlTranslator;
