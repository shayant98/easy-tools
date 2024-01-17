import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full items-center justify-center grow flex">
      <Loader2 size={48} className="animate-spin text-slate-600 dark:text-slate-200 " />
    </div>
  );
};

export default Loading;
