"use client";

import { useCanvas } from "@components/Canvas/CanvasContext";
import { Button } from "@components/ui/Button";
import * as fabric from "fabric";
import { useCallback, useEffect, useRef } from "react";
const Draw = () => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const [canvasRef, setCanvasElRef] = useCanvas((canvas) => {
    // canvas.setDimensions({});
    canvas.setDimensions({
      width: canvasParentRef.current?.clientWidth,
      height: canvasParentRef.current?.clientHeight,
    });
    const text = new fabric.Text("fabric.js sandbox", {
      originX: "center",
      top: 20,
    });
    text.set("fontFamily", "Helvetica");

    canvas.add(text);
    canvas.centerObjectH(text);
  });

  useEffect(() => {
    const deleteObj = (e: KeyboardEvent) => {
      console.log("e.key");

      if (e.key === "Delete" || e.key === "Backspace") {
        const currentActiveobject = canvasRef.current?.getActiveObject();
        console.log(currentActiveobject);

        if (currentActiveobject == undefined) return;
        canvasRef.current?.remove(currentActiveobject);
      }
    };

    document.addEventListener("keydown", deleteObj);
    return () => document.removeEventListener("keydown", deleteObj);
  }, []);

  const addCircle = useCallback(() => {
    const circle = new fabric.Circle({
      radius: 20,
      fill: "red",
      left: 100,
      top: 100,
    });
    canvasRef.current?.add(circle);
    canvasRef.current?.centerObjectH(circle);
  }, [canvasRef]);

  const addRectangle = useCallback(() => {
    const rect = new fabric.Rect({
      width: 20,
      height: 20,
      fill: "red",
      left: 100,
      top: 100,
    });
    canvasRef.current?.add(rect);
    canvasRef.current?.centerObjectH(rect);
  }, [canvasRef]);
  return (
    <div ref={canvasParentRef} className=" h-screen w-screen absolute z-50 ">
      <canvas className="absolute top-0 bottom-0" ref={setCanvasElRef} />
    </div>
  );
};

export default Draw;
