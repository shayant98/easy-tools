import { useCallback } from "react";
import { Background, ReactFlow, useReactFlow, type OnConnectStart, type OnConnectEnd, MiniMap, Controls, Position } from "reactflow";
import cuid2 from "@paralleldrive/cuid2";
import DiagramTitle from "./diagram-title";
import DiagramOptions from "./diagram-options";
import Container from "@components/Container/Container";
import { useDiagramContext } from "./diagram-context";
import { Globe } from "lucide-react";
import EdgeOptions from "./edge-options";
import NodeOptions from "./node-options";
import NodeContextMenu from "./node-context-menu";
import { ContextMenu, ContextMenuTrigger } from "@components/ui/context-menu";

const Designer = () => {
  const {
    connectingNodeId,
    nodes,
    edges,
    setNodes,
    onEdgeUpdate,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setShowNodeOptions,
    setShowEdgeOptions,
    setSelectedEdge,
    setSelectedNode,
    selectedEdge,
    nodeTypes,
    onConnect,
    setRfInstance,
    edgeTypes,
    restoreFlow,
    onDelete,
  } = useDiagramContext();
  const { screenToFlowPosition } = useReactFlow();

  const onConnectStart: OnConnectStart = useCallback(
    (_, { nodeId }) => {
      connectingNodeId.current = nodeId;
    },
    [connectingNodeId]
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = (event.target as Element).classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = cuid2.createId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: (event as MouseEvent).clientX,
            y: (event as MouseEvent).clientY,
          }),
          type: "customNode",
          data: {
            service: 1,
            label: `Untitled node`,
            handles: [
              { location: Position.Top, type: "source", id: cuid2.createId() },
              { location: Position.Bottom, type: "target", id: cuid2.createId() },
            ],
          },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current ?? "", target: id, type: "singleDirectionEdge" }));
      }
    },
    [connectingNodeId, screenToFlowPosition, setEdges, setNodes]
  );

  return (
    <Container>
      <ContextMenu modal>
        <ContextMenuTrigger asChild>
          <ReactFlow
            onInit={async (state) => {
              restoreFlow();

              setRfInstance(state);
            }}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onNodeDoubleClick={(e, node) => {
              setSelectedNode(node);
              setShowNodeOptions(true);
            }}
            // onEdgeDoubleClick={(e, edge) => {
            //   setSelectedEdge(edge.id);
            //   setShowEdgeOptions(true);
            // }}
            onConnect={onConnect}
            onNodesDelete={onDelete}
            fitView
          >
            <Background />
            <NodeContextMenu />
            <MiniMap className="shadow-lg rounded p-2" />
            <DiagramTitle />
            <DiagramOptions />
            <Controls className="bg-secondary shadow-lg p-2 rounded" />
          </ReactFlow>
        </ContextMenuTrigger>
        <EdgeOptions id={selectedEdge} />
        <NodeOptions />
      </ContextMenu>
    </Container>
  );
};

export default Designer;
