import { createContext, useState, ReactNode, useContext } from "react";

interface ToolContextProps {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
}

const ToolContext = createContext<ToolContextProps>({
  name: "",
  description: "",
  setName: () => {
    return "";
  },
  setDescription: () => {
    return "";
  },
});

const useTool = () => {
  return useContext(ToolContext);
};

const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return <ToolContext.Provider value={{ name, description, setName, setDescription }}>{children}</ToolContext.Provider>;
};

export { ToolProvider, useTool };
