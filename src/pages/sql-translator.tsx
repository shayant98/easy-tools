import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";

import BaseLayout from "../layout/BaseLayout";
import { api } from "../utils/api";
import Editor from "../components/Editor/Editor";

const SqlTranslator = () => {
  const [naturalLanguage, setnaturalLanguage] = useState("");
  const [query, setQuery] = useState("");

  const { refetch } = api.ai.hello.useQuery(
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
      <div className="flex gap-2">
        <div className="w-1/2 h-auto">
          <h3 className="text-2xl mb-2">Natural language:</h3>
          <Editor placeholder="Enter question here" value={naturalLanguage} setValue={(e) => setnaturalLanguage(e.target.value)} language="sql" />
        </div>

        <div className=" w-1/2 ">
          <h3 className="text-2xl mb-2">SQL</h3>
          <Editor value={query} setValue={(e) => setQuery(e.target.value)} disabled language="sql" />
        </div>
      </div>
      <div className="self-end mt-10">
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
