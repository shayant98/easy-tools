import { getNodesBounds, type Node, useReactFlow } from "reactflow";
import { type NodeData } from "./custom-node";
import { ContextMenuContent, ContextMenuItem, ContextMenuShortcut } from "@components/ui/context-menu";
import cuid2 from "@paralleldrive/cuid2";
import { type NodeParentData } from "./custom-parent-node";
import { toast } from "sonner";
import { useHotkeys } from "react-hotkeys-hook";

const NodeContextMenu = () => {
  const { getNodes, setNodes, getNode } = useReactFlow<NodeData | NodeParentData>();

  const nodes = getNodes();
  const selectedNodes = getNodes().filter((node) => node.selected);

  useHotkeys("mod+g", () => groupNodes(), [selectedNodes, nodes]);

  const groupNodes = () => {
    const hasGroupedNodes = selectedNodes.filter((node) => node.parentNode != undefined);
    const hasParents = selectedNodes.filter((node) => node.type == "archParentNode");

    if (selectedNodes.length < 2) {
      toast.error("Please select some nodes");
      return;
    }

    if (hasGroupedNodes.length > 0) {
      toast.error("Can't group already grouped nodes");
      return;
    }

    if (hasParents.length > 0) {
      toast.error("Grouping using parents is unsupported");
      return;
    }

    const bounds = getNodesBounds(selectedNodes);

    const numberOfGroups = nodes.filter((node) => node.type == "archParentNode");

    const parentNode: Node<NodeParentData> = {
      id: cuid2.createId(),
      type: "archParentNode",
      position: bounds,
      data: {
        label: `Group ${numberOfGroups.length + 1}`,
        labelPosition: "topRight",
        showLabel: true,
      },
      style: {
        height: bounds.height + 10,
        width: bounds.width + 10,
      },
    };

    const updatedNodes = getNodes().map((node) => {
      const hasNode = selectedNodes.filter((selectedNode) => node.id == selectedNode.id);
      if (hasNode.length == 0) return node;
      node.parentNode = parentNode.id;
      node.extent = "parent";
      node.position = {
        x: (node.positionAbsolute?.x ?? 0) - (parentNode.position?.x ?? 0) + 5,
        y: (node.positionAbsolute?.y ?? 0) - (parentNode.position?.y ?? 0) + 5,
      };

      return node;
    });

    const parentHasChildren = updatedNodes.filter((node) => node.parentNode == parentNode.id);

    if (parentHasChildren.length == 0) {
      toast.error("No children to group");
      return;
    }

    setNodes([parentNode, ...updatedNodes]);
  };

  const removeFromParent = (nodeId: string) => {
    const currentNode = getNode(nodeId);
    const childrenOfParent = nodes.filter((node) => node.parentNode == currentNode?.parentNode);
    let updatedNodesList = nodes.map((node) => {
      if (node.id != nodeId) return node;

      node.parentNode = undefined;
      node.extent = undefined;

      node.position = {
        x: node.positionAbsolute?.x ?? 0,
        y: node.positionAbsolute?.y ?? 0,
      };

      toast.success(`\'${node.data.label}\' removed from parent`);
      return node;
    });

    console.log(childrenOfParent);

    if (childrenOfParent.length == 1) {
      updatedNodesList = updatedNodesList.filter((node) => node.id != currentNode?.parentNode);
      toast.info(`Parent node removed`);
    }

    setNodes(updatedNodesList);
  };

  const deleteNodes = () => {
    console.log("deleting nodes" + selectedNodes.length);

    const updatedNodes = nodes.filter((node) => selectedNodes.filter((selectedNode) => selectedNode.id != node.id));
    console.log(updatedNodes, selectedNodes);

    setNodes(updatedNodes);
    toast.success(`${selectedNodes.length} nodes deleted`);
  };

  if (selectedNodes.length > 1)
    return (
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={groupNodes}>
          Group {selectedNodes.length} nodes
          <ContextMenuShortcut>⌘G</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={deleteNodes} inset>
          Delete {selectedNodes.length} nodes
        </ContextMenuItem>
      </ContextMenuContent>
    );

  if (selectedNodes.length == 1)
    return (
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={deleteNodes}>
          Delete Node
        </ContextMenuItem>
        <ContextMenuItem inset>Duplicate Node</ContextMenuItem>
        {selectedNodes[0]?.parentNode != undefined && (
          <ContextMenuItem onClick={() => removeFromParent(selectedNodes[0]?.id ?? "")} inset>
            Extract from parent
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    );

  if (selectedNodes.length == 0)
    return (
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>Add Node</ContextMenuItem>
        <ContextMenuItem inset>Clear flow</ContextMenuItem>
      </ContextMenuContent>
    );
};

export default NodeContextMenu;
