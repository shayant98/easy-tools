import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@components/ui/accordion";
import { Button } from "@components/ui/Button";
import BaseLayout from "@layout/BaseLayout";
import { api } from "@utils/api";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Snippets = () => {
  const { data } = api.snippet.getAllSnippetsByUser.useQuery();
  const { mutateAsync: deleteSnippet } = api.snippet.deleteSnippet.useMutation();
  const context = api.useContext();

  const handleDelete = (id: number) => {
    toast.promise(deleteSnippet({ id }), {
      pending: "Deleting snippet...",
      success: "Snippet deleted",
      error: "Failed to delete snippet",
    });
    context.snippet.getAllSnippetsByUser.invalidate();
  };

  return (
    <BaseLayout showBackButton title="Snippets" desc="View and manage all saved snippets">
      <div className="flex gap-2">
        {data?.map((snippet) => (
          <div className="border h-min w-full max-w-sm pb-5 max-h-96 px-5 rounded border-slate-800 dark:border-slate-500" key={snippet.id}>
            <div className=" flex items-center gap-5 justify-between ">
              <h4 className="mt-5 scroll-m-20 text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">{snippet.title}</h4>
              <Button className="mt-5" variant={"destructive"} onClick={() => handleDelete(snippet.id)}>
                <AiOutlineDelete /> Delete
              </Button>
            </div>
            <Accordion type="multiple">
              <AccordionItem value={`${snippet.id}-desc`}>
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{snippet.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value={`${snippet.id}-snippet`}>
                <AccordionTrigger>Snippet</AccordionTrigger>
                <AccordionContent>{snippet.content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default Snippets;