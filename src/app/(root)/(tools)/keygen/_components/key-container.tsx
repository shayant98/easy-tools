import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

const KeyContainer = ({ ids, setId, title }: { ids: string[]; setId: () => void; title: string }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
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
        <div className="grid grid-cols-2 gap-4 py-4 text-center">
          {ids.map((id) => (
            <button
              type="button"
              key={id}
              aria-label="Copy ID"
              className="w-full cursor-pointer rounded bg-secondary py-2 text-secondary-foreground hover:bg-primary"
              onClick={async () => {
                await navigator.clipboard.writeText(id);
                toast.success("Copied to clipboard");
              }}
            >
              <p>{id}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyContainer;
