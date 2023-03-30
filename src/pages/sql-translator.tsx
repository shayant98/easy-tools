import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@components/ui/Button";

import BaseLayout from "@layout/BaseLayout";
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
    <BaseLayout
      showBackButton
      title="SQL Translator"
      desc="With the power of ChatGPT and natural language processing, our tool can translate natural language queries into corresponding SQL queries. Save time and reduce errors by taking advantage of our easy-to-use tool, which is perfect for developers of all levels. "
    >
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
    </BaseLayout>
  );
};

export default SqlTranslator;
