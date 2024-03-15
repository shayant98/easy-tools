import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Skeleton } from "@components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className=" w-full px-20">
      <div className="">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-1/4 h-8 rounded " />
          <Skeleton className="h-9 w-9 rounded " />
        </div>

        <Skeleton className="w-1/3 h-5 mt-3 mb-5  rounded mt05" />
      </div>
      <ToolButtons
        first={
          <div className="flex gap-2">
            <Skeleton className="w-20 h-9 rounded " />
            <Skeleton className="w-20 h-9 rounded " />
            <Skeleton className="w-20 h-9 rounded " />
          </div>
        }
        second={
          <div className="flex gap-2">
            <Skeleton className="w-20 h-9 rounded " />
            <Skeleton className="w-9 h-9 rounded " />
            <Skeleton className="w-9 h-9 rounded " />
          </div>
        }
      />

      <div className="flex gap-2">
        <Skeleton className="w-1/2 rounded" />
        <Skeleton className="w-1/2 h-56 rounded " />
      </div>
    </div>
  );
};

export default Loading;
