import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const Container = ({ children, errorMessage }: ContainerProps) => {
  const [showFullError, setshowFullError] = useState(false);
  return (
    <div className="relative rounded-md flex flex-col border p-6 h-full border-slate-500 dark:border-slate-700">
      {children}
      <div
        onClick={() => setshowFullError(!showFullError)}
        className={`flex items-center text-xs gap-2 absolute right-5  top-5 p-2 bg-gray-100 rounded-full shadow cursor-pointer ${
          errorMessage == undefined || errorMessage?.trim().length == 0 ? "scale-0" : ""
        } origin-center duration-100 `}
      >
        {showFullError && <p className={`text-red-500 ml-2 text-xs `}>{errorMessage}</p>}

        <AiOutlineWarning className="text-red-500 text-xs hover:scale-200" />
      </div>
    </div>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  errorMessage?: string;
}

export default Container;
