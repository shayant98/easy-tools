import { IMenuItem } from "@data/menuItems";
import { createContext, useState, ReactNode, useContext } from "react";

interface ToolContextProps {
  tool?: IMenuItem;
  setTool: (tool?: IMenuItem) => void;
}

const ToolContext = createContext<ToolContextProps>({
  tool: undefined,
  setTool: () => {
    return;
  },
});

const useTool = () => {
  return useContext(ToolContext);
};

const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [tool, setTool] = useState<IMenuItem>();

  return <ToolContext.Provider value={{ tool, setTool }}>{children}</ToolContext.Provider>;
};

export { ToolProvider, useTool };
