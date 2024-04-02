"use client";

import { Panel, Position, type ReactFlowJsonObject, getRectOfNodes, getViewportForBounds, useReactFlow } from "reactflow";
import { toJpeg, toPng } from "html-to-image";
import { Button } from "@components/ui/button";
import { Download, Globe, MoreVertical, Plus, PlusCircle, Settings, Upload, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown";
import { useDiagramContext } from "./diagram-context";
import { toast } from "sonner";
import cuid2 from "@paralleldrive/cuid2";
import { SelectSeparator } from "@components/ui/select";
import { type NodeData } from "./custom-node";
import { services } from "@data/arch-services";
import { useFilePicker } from "use-file-picker";

const downloadImage = (
  dataUrl: string,
  {
    title = "reactflow.png",
  }: {
    title?: string;
  }
) => {
  const a = document.createElement("a");

  a.setAttribute("download", title);
  a.setAttribute("href", dataUrl);
  a.click();
};

const downloadTxt = (
  dataUrl: string,
  {
    title = "reactflow.png",
  }: {
    title?: string;
  }
) => {
  const a = document.createElement("a");

  a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dataUrl));

  a.setAttribute("download", title);
  a.click();
};

const imageWidth = 1024;
const imageHeight = 768;

const DiagramOptions = () => {
  const { openFilePicker, filesContent } = useFilePicker({
    accept: ".json",
    multiple: false,
    onFilesSelected: () => {
      handleImport();
    },
  });
  const { title } = useDiagramContext();
  const { getNodes, toObject, setNodes, screenToFlowPosition, setEdges } = useReactFlow<NodeData>();

  const handlePng = async () => {
    const element: HTMLElement | null = document.querySelector(".react-flow__viewport");

    const nodesBounds = getRectOfNodes(getNodes());

    const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    if (!element) {
      return;
    }

    const fileString = await toPng(element, {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
      },
    });

    downloadImage(fileString, {
      title: `${title}.png`,
    });
    toast.success("PNG exported");
  };

  const handleJpeg = async () => {
    const element: HTMLElement | null = document.querySelector(".react-flow__viewport");

    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    if (!element) {
      return;
    }

    const dataString = await toJpeg(element, {
      quality: 0.95,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
      },
    });
    downloadImage(dataString, { title: `${title}.jpeg` });
    toast.success("JPEG exported");
  };
  const handleJson = () => {
    const obj = toObject();

    downloadTxt(JSON.stringify(obj), { title: `${title}.json` });
    toast.success("JSON exported");
  };

  const handleAddNode = () => {
    const nodes = getNodes();
    const position = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const firstService = services[0];
    if (firstService == undefined) return;
    setNodes([
      ...nodes,
      {
        id: cuid2.createId(),
        position,
        type: "customNode",
        data: {
          service: 1,
          label: `Node ${nodes.length + 1}`,
          handles: [
            {
              location: Position.Top,
              type: "source",
              id: cuid2.createId(),
            },
            {
              location: Position.Bottom,
              type: "target",
              id: cuid2.createId(),
            },
          ],
        },
      },
    ]);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);

    toast.success("Flow cleared");
  };

  const handleImport = () => {
    if (!filesContent) {
      return;
    }

    if (filesContent.length === 0) {
      return;
    }

    const importFile = filesContent.at(0);

    if (importFile === null) {
      return;
    }

    try {
      const flow: ReactFlowJsonObject = JSON.parse(importFile?.content ?? "") as ReactFlowJsonObject;
      if (!flow) {
        return;
      }

      setNodes(flow.nodes);
      setEdges(flow.edges);

      toast.success("Flow imported");
    } catch (error) {
      toast.error("Error importing flow");
      return;
    }
  };
  return (
    <Panel position="top-center">
      <div className="px-4 py-4 bg-muted rounded shadow-lg flex  gap-4 justify-evenly items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <Download size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Export as</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlePng}>PNG</DropdownMenuItem>
            <DropdownMenuItem onClick={handleJpeg}>JPEG</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleJson}>JSON</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size={"icon"} variant={"outline"} onClick={handleAddNode}>
          <Plus size={16} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[200px]">
            <DropdownMenuItem onClick={openFilePicker}>
              <Upload size={16} className="mr-2" />
              Import
            </DropdownMenuItem>
            <SelectSeparator />
            <DropdownMenuItem onClick={handleClear} className="text-destructive">
              <X size={16} className="mr-2" />
              Clear flow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Panel>
  );
};

export default DiagramOptions;
