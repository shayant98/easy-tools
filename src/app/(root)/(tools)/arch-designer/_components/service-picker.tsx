import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { services } from "@/data/arch-services";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SiFirebase } from "react-icons/si";
import { type Node, useReactFlow } from "reactflow";
import type { NodeData } from "./custom-node";
import { useDiagramContext } from "./diagram-context";

const ServicePicker = ({ node }: { node: Node<NodeData> }) => {
  const { setNodes } = useReactFlow<NodeData>();
  const { setSelectedNode } = useDiagramContext();
  const [filteredServices, setfilteredServices] = useState(services);

  const [search, setsearch] = useState("");

  useEffect(() => {
    if (search === "") {
      setfilteredServices(services);
      return;
    }

    const filtered = services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()));

    setfilteredServices(filtered);

    return () => {
      setfilteredServices([]);
    };
  }, [search]);

  const setService = (serviceId: number) => {
    if (!node) {
      return;
    }

    const updatedNode = { ...node, data: { ...node.data, service: serviceId } };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  };

  return (
    <div className="rounded-lg border border-secondary p-2">
      <Input placeholder="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
      <ScrollArea className="mt-2 h-72 px-2 ">
        {filteredServices.map((service) => (
          <button
            onClick={() => setService(service.id)}
            type="button"
            key={service.id}
            className="group mb-2 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-muted p-4 transition duration-200 hover:bg-secondary/80"
          >
            <div className=" flex justify-between">
              <div className="flex gap-2">
                <div className=" ">{service.icon !== undefined ? <service.icon className="h-4 w-4 " /> : <SiFirebase className="h-4 w-4 " />}</div>
                <p className="font-bold text-sm">{service.name}</p>
              </div>
              <CheckCircleIcon className={cn("hidden h-4 w-4", { block: node?.data.service === service.id })} />
            </div>
            <div className="mt-1">
              {service.tags.map((tag) => (
                <Badge variant={"outline"} key={`${service.name}-${tag}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ServicePicker;
