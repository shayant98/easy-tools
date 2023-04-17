import { IMenuItem } from "@data/menuItems";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface ToolContextProps {
  tool?: IMenuItem;
  setTool: (tool: IMenuItem) => void;
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

  useEffect(() => {
    const tool = localStorage.getItem("tool");

    if (tool) {
      setTool(JSON.parse(tool));
    }

    return () => {
      localStorage.removeItem("tool");
    };
  }, []);

  const saveTool = (tool: IMenuItem) => {
    localStorage.setItem("tool", JSON.stringify(tool));
    setTool(tool);
  };

  return <ToolContext.Provider value={{ tool, setTool: saveTool }}>{children}</ToolContext.Provider>;
};

export { ToolProvider, useTool };
