import { useEffect, useState } from "react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "savedTools";

const useSaveTool = (tool?: number) => {
  const [savedTools, setsavedTools] = useState<number[]>(() => {
    return (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "") as number[]) || [];
  });

  useEffect(() => {
    setsavedTools(getToolsFromLocalStorage());
  }, []);

  const saveTool = (tool: number) => {
    setsavedTools(() => [...new Set([...getToolsFromLocalStorage(), tool])]);

    toast.success("Tool saved");
  };

  const getToolsFromLocalStorage = () => {
    const savedToolsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedToolsString ? (JSON.parse(savedToolsString) as number[]) : [];
  };

  const removeTool = (tool: number) => {
    console.log("Removing tool  ");

    setsavedTools(savedTools.filter((t) => t !== tool));

    toast.success("Tool removed from saved list");
  };

  const hasTool = (tool: number) => {
    return savedTools.includes(tool);
  };

  const getAllTools = () => {
    return savedTools;
  };

  const hasCurrentTool = tool != undefined ? hasTool(tool) : false;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTools));

    return () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    };
  }, [savedTools]);

  return {
    savedTools,
    saveTool,
    removeTool,
    hasCurrentTool,
    getAllTools,
    hasTool,
  };
};

export { useSaveTool };
