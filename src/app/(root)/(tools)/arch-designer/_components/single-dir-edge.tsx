"use client";

import { Button } from "@components/ui/button";
import { X } from "lucide-react";
import { type EdgeProps, useReactFlow, BaseEdge, getBezierPath, EdgeLabelRenderer } from "reactflow";

const SingleDirEdge = ({ id, style, sourceX, sourcePosition, sourceY, targetX, targetPosition, targetY, markerEnd }: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeButtonClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        // markerEnd={markerEnd}
        style={{
          ...style,
          width: "30px",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            // everything inside EdgeLabelRenderer has no pointer events by default
            pointerEvents: "all",
          }}
        >
          <Button className="w-4 h-4 px-0.5 py-0 rounded-full" variant={"outline"} onClick={onEdgeButtonClick}>
            <X className="w-2 h-2" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default SingleDirEdge;
