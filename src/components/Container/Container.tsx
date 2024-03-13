import { AlertOctagon } from "lucide-react";
import { useState } from "react";

const Container = ({ children, errorMessage }: ContainerProps) => {
  const [showFullError, setshowFullError] = useState(false);
  return (
    <div className="relative flex  min-h-80 h-min flex-col overflow-auto rounded-md border border-slate-500  p-1  dark:border-slate-700 md:p-6">
      {children}
      <div
        onClick={() => setshowFullError(!showFullError)}
        className={`absolute right-5 top-5 flex cursor-pointer items-center  gap-2 rounded-full bg-destructive  p-2 text-xs shadow ${
          errorMessage == undefined || errorMessage?.trim().length == 0 ? "scale-0" : ""
        } origin-center duration-100 `}
      >
        {showFullError && <p className={`ml-2 text-xs text-destructive-foreground `}>{errorMessage}</p>}

        <AlertOctagon className="hover:scale-200 text-xs text-destructive-foreground" />
      </div>
    </div>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  errorMessage?: string;
}

export default Container;
