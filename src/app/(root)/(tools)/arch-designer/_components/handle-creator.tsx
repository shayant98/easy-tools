import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import cuid2 from "@paralleldrive/cuid2";
import {
	PanelBottomDashed,
	PanelLeftDashed,
	PanelRightDashed,
	PanelTopDashed,
	Plus,
	Trash2,
} from "lucide-react";
import {
	type HandleType,
	type Node,
	Position,
	useReactFlow,
	useUpdateNodeInternals,
} from "reactflow";
import type { NodeData } from "./custom-node";
import { useDiagramContext } from "./diagram-context";

const MAX_HANDLES = 4;

const HandleCreator = ({ node }: { node: Node<NodeData> }) => {
	const { setNodes } = useReactFlow();
	const { setSelectedNode } = useDiagramContext();
	const updateNodeInternals = useUpdateNodeInternals();

	const handleHandleTypeChange = (type: HandleType, index: number) => {
		if (!node) {
			return;
		}

		const updatedHandles = node.data.handles?.map((handle, i) => {
			if (i === index) {
				return {
					...handle,
					type,
				};
			}

			return handle;
		});

		const updatedNode: Node<NodeData> = {
			...node,
			data: {
				...node.data,
				handles: updatedHandles,
			},
		};
		setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
		updateNodeInternals(node.id);
		setSelectedNode(updatedNode);
	};

	const handleHandlePositionChange = (position: Position, id: string) => {
		const updatedHandles = node.data.handles?.map((handle) => {
			if (handle.id === id) {
				return {
					...handle,
					location: position,
				};
			}

			return handle;
		});

		const updatedNode: Node<NodeData> = {
			...node,
			data: {
				...node.data,
				handles: updatedHandles,
			},
		};

		setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
		updateNodeInternals(node.id);
		setSelectedNode(updatedNode);
	};

	const addHandle = () => {
		console.log(node);

		if (!node) {
			return;
		}

		const updatedNode: Node = {
			...node,
			data: {
				...node.data,
				handles: [
					...node.data.handles,
					{
						type: "source",
						location: Position.Top,
						id: cuid2.createId(),
					},
				],
			},
		};

		setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
		setSelectedNode(updatedNode);
		updateNodeInternals(node.id);
	};

	const removeHandle = (id: string) => {
		if (!node) {
			return;
		}

		const updatedHandles = node.data.handles?.filter(
			(handle) => handle.id !== id,
		);

		const updatedNode = {
			...node,
			data: {
				...node.data,
				handles: updatedHandles,
			},
		};

		setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
		updateNodeInternals(node.id);
		setSelectedNode(updatedNode);
	};

	return (
		<div className="grid gap-5">
			{node.data.handles?.map((handle, index) => (
				<div className="flex gap-4" key={`edit-handle-${handle.id}`}>
					<Select
						defaultValue={handle.type}
						onValueChange={(e: HandleType) => {
							handleHandleTypeChange(e, index);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="source">Source</SelectItem>
							<SelectItem value="target">Target</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex justify-evenly">
						<Toggle
							pressed={handle.location === Position.Top}
							onPressedChange={(v) => {
								if (v === false) return;
								handleHandlePositionChange(Position.Top, handle.id);
							}}
						>
							<PanelTopDashed />
						</Toggle>
						<Toggle
							pressed={handle.location === Position.Left}
							onPressedChange={(v) => {
								console.log(v);

								if (v === false) return;
								handleHandlePositionChange(Position.Left, handle.id);
							}}
						>
							<PanelLeftDashed />
						</Toggle>
						<Toggle
							pressed={handle.location === Position.Bottom}
							onPressedChange={(v) => {
								if (v === false) return;
								handleHandlePositionChange(Position.Bottom, handle.id);
							}}
						>
							<PanelBottomDashed />
						</Toggle>
						<Toggle
							pressed={handle.location === Position.Right}
							onPressedChange={(v) => {
								console.log(v);

								if (v === false) return;
								handleHandlePositionChange(Position.Right, handle.id);
							}}
						>
							<PanelRightDashed />
						</Toggle>
						<Button
							size={"icon"}
							variant={"destructive"}
							onClick={() => removeHandle(handle.id)}
						>
							<Trash2 size={16} />
						</Button>
					</div>
				</div>
			))}
			<Button
				disabled={node.data.handles.length >= MAX_HANDLES}
				variant={"secondary"}
				onClick={addHandle}
			>
				<Plus size={16} className="mr-2" />
				<span>Add Handle</span>
			</Button>
		</div>
	);
};

export default HandleCreator;
