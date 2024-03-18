import cuid2 from "@paralleldrive/cuid2";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlowProvider,
  type Node,
  type Edge,
  type OnEdgesChange,
  type OnNodesChange,
  applyNodeChanges,
  type OnConnect,
  applyEdgeChanges,
  addEdge,
  type NodeProps,
  type ReactFlowJsonObject,
  Position,
} from "reactflow";
import CustomNode, { type NodeData } from "./custom-node";

// Define the shape of your context value
interface DiagramContextValue {
  nodes: Node[];
  edges: Edge[];
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  connectingNodeId: React.MutableRefObject<string | null>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  nodeTypes: {
    customNode: (props: NodeProps<NodeData>) => React.JSX.Element;
  };
  onConnect: OnConnect;
}

// Create the context
const DiagramContext = createContext<DiagramContextValue | undefined>(undefined);

// Create a custom hook to access the context value
export const useDiagramContext = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagramContext must be used within a DiagramContextProvider");
  }
  return context;
};

// Create the context provider component
interface DiagramContextProviderProps {
  children: React.ReactNode;
  // Add any additional props for the provider here
}

const initialNodes: Node<NodeData>[] = [
  {
    id: cuid2.createId(),
    type: "customNode",
    position: { x: 250, y: 5 },
    data: {
      label: "Node 1",
      handles: [
        { location: Position.Top, type: "source", id: cuid2.createId() },
        { location: Position.Bottom, type: "target", id: cuid2.createId() },
      ],
    },
  },
];

export const DiagramContextProvider: React.FC<DiagramContextProviderProps> = ({ children }) => {
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [title, setTitle] = useState("Untitled Diagram");

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const onConnect: OnConnect = useCallback((newEdge) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge({ ...newEdge, type: "smoothstep" }, eds));
  }, []);

  return (
    <DiagramContext.Provider
      value={{
        nodes,
        connectingNodeId,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        nodeTypes,
        onConnect,
        title,
        setTitle,
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </DiagramContext.Provider>
  );
};
