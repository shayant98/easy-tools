import BaseLayout from "@layout/BaseLayout";
import { api } from "@utils/api";

const Snippets = () => {
  const { data } = api.snippet.getAllSnippetsByUser.useQuery();

  return (
    <BaseLayout showBackButton>
      <div className="">
        {data?.map((snippet) => (
          <div key={snippet.id}>
            <div>{snippet.title}</div>
            <div>{snippet.description}</div>
            <div>{snippet.language}</div>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default Snippets;
