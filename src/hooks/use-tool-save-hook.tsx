"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "savedTools";

const useSaveTool = (tool?: number) => {
  const [savedTools, setsavedTools] = useState<number[]>([]);

  useEffect(() => {
    setsavedTools(getToolsFromLocalStorage());
  }, []);

  const saveTool = (tool: number) => {
    const newTools = [...new Set([...getToolsFromLocalStorage(), tool])];
    setsavedTools(() => newTools);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTools));

    toast.success("Tool saved");
  };

  const getToolsFromLocalStorage = () => {
    const savedToolsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedToolsString ? (JSON.parse(savedToolsString) as number[]) : [];
  };

  const removeTool = (tool: number) => {
    console.log("Removing tool  ");
    const newTools = savedTools.filter((t) => t !== tool);
    setsavedTools(newTools);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTools));

    toast.success("Tool removed from saved list");
  };

  const hasTool = (tool: number) => {
    return savedTools.includes(tool);
  };

  const getAllTools = () => {
    return savedTools;
  };

  const hasCurrentTool = tool != undefined ? hasTool(tool) : false;

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
