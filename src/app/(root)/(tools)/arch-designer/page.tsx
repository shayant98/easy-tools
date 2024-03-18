"use client";

import Designer from "./_components/designer";
import { DiagramContextProvider } from "./_components/diagram-context";

const Page = () => {
  return (
    <DiagramContextProvider>
      <div className="flex flex-1 gap-2">
        <div className="grow">
          <Designer />
        </div>
      </div>
    </DiagramContextProvider>
  );
};

export default Page;
