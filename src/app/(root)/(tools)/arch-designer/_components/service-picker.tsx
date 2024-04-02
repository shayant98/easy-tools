import { Input } from "@components/ui/Input";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn } from "@utils/utils";
import { CheckCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SiAzuredevops } from "react-icons/si";
import { useReactFlow, type Node } from "reactflow";
import { type NodeData } from "./custom-node";
import { services } from "@data/arch-services";
import { Badge } from "@components/ui/badge";
import { useDiagramContext } from "./diagram-context";

const ServicePicker = ({ node }: { node: Node<NodeData> }) => {
  const { setNodes } = useReactFlow<NodeData>();
  const { setSelectedNode } = useDiagramContext();
  const [filteredServices, setfilteredServices] = useState(services);

  const [search, setsearch] = useState("");

  useEffect(() => {
    if (search == "") {
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

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        service: serviceId,
      },
    };

    setNodes((nodes) => nodes.map((n) => (n.id === node.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  };

  return (
    <div className="border rounded border-secondary p-2">
      <Input placeholder="Search" icon={Search} value={search} onChange={(e) => setsearch(e.target.value)} />
      <ScrollArea className="h-72 mt-2 px-2 ">
        {filteredServices.map((service) => (
          <div
            onClick={() => setService(service.id)}
            key={service.id}
            className="w-full mb-2 border rounded-lg p-4 cursor-pointer bg-muted justify-between items-center gap-2 hover:bg-secondary/80 transition duration-200 group"
          >
            <div className=" flex justify-between">
              <div className="flex gap-2">
                <div className=" ">{service.icon != undefined ? <service.icon className="w-4 h-4 " /> : <SiAzuredevops className="w-4 h-4 " />}</div>
                <p className="text-sm font-bold">{service.name}</p>
              </div>
              <CheckCircleIcon
                className={cn("w-4 h-4 hidden", {
                  block: node?.data.service == service.id,
                })}
              />
            </div>
            <div className="mt-1">
              {service.tags.map((tag) => (
                <Badge variant={"outline"} key={`${service.name}-${tag}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ServicePicker;
