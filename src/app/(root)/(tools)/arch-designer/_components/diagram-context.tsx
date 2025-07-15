import type React from "react";
import {
	type Dispatch,
	type MouseEvent,
	type MutableRefObject,
	type SetStateAction,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	type Connection,
	type Edge,
	type EdgeProps,
	type Node,
	type NodeProps,
	type OnConnect,
	type OnEdgeUpdateFunc,
	type OnEdgesChange,
	type OnNodesChange,
	type ReactFlowInstance,
	type ReactFlowJsonObject,
	ReactFlowProvider,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	updateEdge,
} from "reactflow";
import { toast } from "sonner";
import CustomNode, { type NodeData } from "./custom-node";
import CustomParentNode, { type NodeParentData } from "./custom-parent-node";
import SingleDirEdge from "./single-dir-edge";

// Define the shape of your context value
interface DiagramContextValue {
	nodes: Node[];
	edges: Edge[];
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	setNodes: Dispatch<SetStateAction<Node[]>>;
	setEdges: Dispatch<SetStateAction<Edge[]>>;
	connectingNodeId: MutableRefObject<string | null>;
	onNodesChange: OnNodesChange;
	showNodeOptions: boolean;
	setShowNodeOptions: Dispatch<SetStateAction<boolean>>;
	showEdgeOptions: boolean;
	setShowEdgeOptions: React.Dispatch<React.SetStateAction<boolean>>;
	selectedEdge: string;
	setSelectedEdge: React.Dispatch<React.SetStateAction<string>>;
	selectedNode: Node<NodeData | NodeParentData> | null;
	setSelectedNode: React.Dispatch<
		React.SetStateAction<Node<NodeData | NodeParentData> | null>
	>;
	onEdgesChange: OnEdgesChange;
	onEdgeUpdate: OnEdgeUpdateFunc;
	nodeTypes: {
		customNode: (props: NodeProps<NodeData>) => React.JSX.Element;
		archParentNode: (props: NodeProps<NodeParentData>) => React.JSX.Element;
	};
	edgeTypes: {
		singleDirectionEdge: (props: EdgeProps) => React.JSX.Element;
	};
	onConnect: OnConnect;
	setRfInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
	restoreFlow: () => void;
	onDelete: (node: Node[]) => void;
}

// Create the context
const DiagramContext = createContext<DiagramContextValue | undefined>(
	undefined,
);

// Create a custom hook to access the context value
export const useDiagramContext = () => {
	const context = useContext(DiagramContext);
	if (!context) {
		throw new Error(
			"useDiagramContext must be used within a DiagramContextProvider",
		);
	}
	return context;
};

// Create the context provider component
interface DiagramContextProviderProps {
	children: React.ReactNode;
	// Add any additional props for the provider here
}

export type NodeContextMenu = {
	id: string;
	top: number | boolean;
	left: number | boolean;
	right: number | boolean;
	bottom: number | boolean;
};

const FLOW_KEY = "DIAGRAM_STATE";

export const DiagramContextProvider: React.FC<DiagramContextProviderProps> = ({
	children,
}) => {
	const connectingNodeId = useRef<string | null>(null);
	const [rfInstance, setRfInstance] =
		useState<ReactFlowInstance<NodeData> | null>(null);

	const [nodes, setNodes] = useState<Node<NodeData | NodeParentData>[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [showNodeOptions, setShowNodeOptions] = useState(false);
	const [showEdgeOptions, setShowEdgeOptions] = useState(false);
	const [selectedEdge, setSelectedEdge] = useState("");
	const [selectedNode, setSelectedNode] = useState<Node<
		NodeData | NodeParentData
	> | null>(null);
	const [title, setTitle] = useState("Untitled Diagram");
	const [history, setHistory] = useState<ReactFlowJsonObject[]>([]);

	/**
	 * Restores the flow from local storage.
	 * If a flow is found, it updates the nodes and edges state with the restored flow.
	 */
	const restoreFlow = useCallback(() => {
		try {
			const flow = JSON.parse(
				localStorage.getItem(FLOW_KEY) ?? "",
			) as ReactFlowJsonObject | null;
			if (!flow) {
				toast.dismiss();
				return;
			}
			toast.dismiss();

			setNodes(flow.nodes || []);
			setEdges(flow.edges || []);
		} catch (error) {
			return;
		}
	}, []);

	/**
	 * Saves the current state of the diagram.
	 * If `rfInstance` is not available, the function returns early.
	 * The function converts the `rfInstance` to an object representation of the diagram.
	 * The converted diagram is then saved to the local storage using the key `FLOW_KEY`.
	 * Additionally, the converted diagram is added to the `history` state array.
	 *
	 */
	const saveDiagramState = () => {
		console.log("Saving diagram state");

		if (!rfInstance) {
			return;
		}
		const flow = rfInstance.toObject();

		console.log("Flow", flow);

		// save most current to LS
		localStorage.setItem(FLOW_KEY, JSON.stringify(flow));

		setHistory((prev) => [...prev, flow]);
	};

	const onNodesChange: OnNodesChange = (changes) => {
		setNodes((nds) => applyNodeChanges(changes, nds));
		saveDiagramState();
	};
	const onEdgesChange: OnEdgesChange = (changes) => {
		setEdges((eds) => applyEdgeChanges(changes, eds));
		saveDiagramState();
	};

	const nodeTypes = useMemo(
		() => ({ customNode: CustomNode, archParentNode: CustomParentNode }),
		[],
	);
	const edgeTypes = useMemo(() => ({ singleDirectionEdge: SingleDirEdge }), []);

	const onDelete = (nodes: Node[]) => {
		console.log("Deleting nodes", nodes);

		saveDiagramState();
	};

	const onEdgeUpdate = useCallback(
		(oldEdge: Edge, newConnection: Connection) =>
			setEdges((els) => updateEdge(oldEdge, newConnection, els)),
		[],
	);

	const onConnect: OnConnect = useCallback((newEdge) => {
		connectingNodeId.current = null;
		setEdges((eds) =>
			addEdge({ ...newEdge, type: "singleDirectionEdge" }, eds),
		);
	}, []);

	return (
		<DiagramContext.Provider
			value={{
				showNodeOptions,
				setShowNodeOptions,
				showEdgeOptions,
				setShowEdgeOptions,
				setSelectedEdge,
				selectedEdge,
				setSelectedNode,
				selectedNode,
				nodes,
				connectingNodeId,
				edges,
				setNodes,
				setEdges,
				onNodesChange,
				onEdgesChange,
				onEdgeUpdate,
				nodeTypes,
				edgeTypes,
				onConnect,
				title,
				setTitle,
				setRfInstance,
				restoreFlow,
				onDelete: onDelete,
			}}
		>
			<ReactFlowProvider>{children}</ReactFlowProvider>
		</DiagramContext.Provider>
	);
};
