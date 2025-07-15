import Container from "@/components/Container/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash, XCircle } from "lucide-react";
import { useDockerCompose } from "./docker-compose-context";

const Form = () => {
  const {
    services,
    addService,
    removeService,
    handleNameOfServiceChange,
    getValueOfService,
    addVolumeToService,
    updateVolumeOfService,
    removeVolumeFromService,
    addPortToService,
    updatePortOfService,
    removePortFromService,
    addEnvToService,
    updateEnvOfService,
    removeEnvFromService,
    addLabelToService,
    removeLabelFromService,
    updateLabelOfService,
  } = useDockerCompose();
  return (
    <Container>
      <Tabs defaultValue={"0"}>
        <div className="flex ">
          <TabsList className="flex grow flex-wrap justify-start gap-2">
            {/* Loop over services and create TabsTrigger with name */}
            {services.map((service, i) => (
              <TabsTrigger className="flex items-center gap-2" key={i} value={service.id}>
                {service.name}
                <XCircle className=" h-4 w-4" onClick={() => removeService(service.name)} />
              </TabsTrigger>
            ))}
          </TabsList>
          <Button onClick={() => addService({})} variant={"default"} size={"icon"} className="ml-3 ">
            <PlusCircle className=" h-4 w-4" />
          </Button>
        </div>
        {/* Loop over services and create TabsContent with name, for inputs use Input component */}
        {services.map((service, i) => (
          <TabsContent className="border-0 p-0" key={i} value={service.id}>
            <div className="flex flex-col space-y-4 ">
              <div className="flex gap-2">
                <div className="grow">
                  <Label className="">Service</Label>
                  <Input placeholder="Name" value={getValueOfService(service.name, "name")} onChange={(e) => handleNameOfServiceChange(e, service.name, "name")} />
                </div>
                <div className="grow">
                  <Label>Image</Label>
                  <Input placeholder="Image" value={getValueOfService(service.image, "image")} onChange={(e) => handleNameOfServiceChange(e, service.image, "image")} />
                </div>
                <div className="grow">
                  <Label>Container name</Label>
                  <Input
                    placeholder="Container name"
                    value={getValueOfService(service.container_name, "container_name")}
                    onChange={(e) => handleNameOfServiceChange(e, service.container_name, "container_name")}
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Label>Volumes</Label>
                  <Button onClick={() => addVolumeToService(service.name)} size={"icon"} variant={"default"}>
                    <PlusCircle className=" h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-10">
                  {service.volumes.map((volume, i) => (
                    <div key={`volume-${volume.id}-${service.id}`} className="flex gap-2">
                      <div className="flex grow gap-2">
                        <Input placeholder="internal" value={volume.internal} onChange={(e) => updateVolumeOfService(e, service.name, i, "internal")} />
                        <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary p-4">
                          <span className="text-secondary-foreground">:</span>
                        </div>
                        <Input placeholder="external" value={volume.external} onChange={(e) => updateVolumeOfService(e, service.name, i, "external")} />
                      </div>
                      <Button onClick={() => removeVolumeFromService(service.name, i)} variant={"destructive"} size={"icon"}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Label>Ports</Label>
                  <Button onClick={() => addPortToService(service.name)} size={"icon"} variant={"default"}>
                    <PlusCircle className=" h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-10 ">
                  {service.ports.map((port, i) => (
                    <div key={`port-${port.id}-${service.id}`} className="flex gap-2">
                      <div className="flex grow gap-2">
                        <Input placeholder="internal" value={port.internal} onChange={(e) => updatePortOfService(e, service.name, i, "internal")} />
                        <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary p-4">
                          <span className="text-secondary-foreground">:</span>
                        </div>
                        <Input placeholder="external" value={port.external} onChange={(e) => updatePortOfService(e, service.name, i, "external")} />
                      </div>
                      <Button onClick={() => removePortFromService(service.name, i)} variant={"destructive"} size={"icon"}>
                        <Trash className=" h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Label>Environment</Label>
                  <Button onClick={() => addEnvToService(service.name)} size={"icon"} variant={"default"}>
                    <PlusCircle className=" h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-10">
                  {service.env.map((env, i) => (
                    <div key={`env-${env.id}-${service.id}`} className="flex gap-2">
                      <div className="flex grow gap-2">
                        <Input placeholder="Label" value={env.label} onChange={(e) => updateEnvOfService(e, service.name, i, "label")} />
                        <Input placeholder="Value" value={env.value} onChange={(e) => updateEnvOfService(e, service.name, i, "value")} />
                      </div>
                      <Button onClick={() => removeEnvFromService(service.name, i)} variant={"destructive"} size={"icon"}>
                        <Trash className=" h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Label>Label</Label>
                  <Button onClick={() => addLabelToService(service.name)} variant={"default"} size={"icon"}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-10">
                  {service.labels.map((label, i) => (
                    <div key={`label-${label.id}-${service.id}`} className="flex gap-2">
                      <div className="flex grow gap-2">
                        <Input placeholder="Label" value={label.label} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                        <Input placeholder="Value" value={label.value} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                      </div>
                      <Button onClick={() => removeLabelFromService(service.name, i)} variant={"destructive"} size={"icon"}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
};

export default Form;
