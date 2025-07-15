import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

const CopyButton = ({ onClick, primaryAction = false }: { onClick: () => string; primaryAction?: boolean }) => {
  const { copy } = useClipboard();
  return (
    <Button
      className={primaryAction ? "ml-auto" : ""}
      variant={primaryAction ? "default" : "secondary"}
      size={primaryAction ? "default" : "icon"}
      onClick={() => {
        void copy(onClick());
      }}
    >
      <Copy className="h-4 w-4" />
      <span
        className={cn("hidden", {
          "ml-2 block": primaryAction,
        })}
      >
        Copy
      </span>
    </Button>
  );
};

export default CopyButton;
