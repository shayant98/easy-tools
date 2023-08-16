"use client";

import { Toggle } from "@components/ui/Toggle";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { CircleIcon, FileCheck, MinusIcon, PlusIcon, PointerIcon, Square, SquareIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const Draw = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [isSelected, setisSelected] = useState<"pointer" | "rectangle">("pointer");
  const [isPanning, setisPanning] = useState(false);
  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };

  const onDeleteAll = () => {
    editor?.deleteAll();
  };

  const onStrokeChange = (e: any) => {
    selectedObjects!.forEach((obj) => {
      return (obj.stroke = e.target.value);
    });
  };

  const removeShape = useCallback(
    (e: any) => {
      if (e.key == "Backspace") {
        editor?.deleteSelected();
      }
    },
    [editor]
  );

  useEffect(() => {
    document.addEventListener("keydown", removeShape);

    return () => {
      document.removeEventListener("keydown", removeShape);
    };
  }, [removeShape]);

  return (
    <div className="h-full">
      {/* <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button> */}
      <div className="relative">
        <div className="absolute inset-x-1/2 mt-3 p-1 flex gap-2 z-10 w-min rounded  bg-gray-400 ">
          <div className="p-2 cursor-pointer hover:bg-gray-200 rounded-full w-min" onClick={onAddRectangle}>
            <SquareIcon />
          </div>
          <div className="p-2 cursor-pointer hover:bg-gray-200 rounded-full w-min" onClick={onAddCircle}>
            <CircleIcon />
          </div>
          <div className="p-2 cursor-pointer hover:bg-gray-200 rounded-full w-min" onClick={onDeleteAll}>
            <Trash2Icon />
          </div>
        </div>
        {selectedObjects != null && selectedObjects.length > 0 && (
          <div className="absolute inset-y-1/2 ml-3 p-1 flex gap-2 z-10 w-min h-min rounded  bg-gray-400 ">
            <input type="range" onChange={onStrokeChange} />
          </div>
        )}
        <div className="absolute right-5 mt-3 p-1  gap-2 z-10 w-min rounded  bg-gray-400 ">
          <div
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-full w-min"
            onClick={() => {
              const currentZoom = editor?.canvas.getZoom();
              console.log(currentZoom);

              let zoom = currentZoom + 0.2;

              if (currentZoom > 10) zoom = 10;

              editor?.canvas.setZoom(zoom);
            }}
          >
            <PlusIcon />
          </div>
          <div
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-full w-min"
            onClick={() => {
              const currentZoom = editor?.canvas.getZoom();
              console.log(currentZoom);

              let zoom = currentZoom - 0.2;

              if (currentZoom < 1) zoom = 1;

              editor?.canvas.setZoom(zoom);
            }}
          >
            <MinusIcon />
          </div>
        </div>
        <FabricJSCanvas className="w-full h-screen bg-white" onReady={onReady} />
      </div>
    </div>
  );
};

export default Draw;
