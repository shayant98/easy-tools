import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/Tabs";
import { useDockerCompose } from "./DockerComposeContext";
import { MinusCircle, PlusCircle, XCircle } from "lucide-react";

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
          <TabsList className="justify-start flex-wrap gap-2 flex grow">
            {/* Loop over services and create TabsTrigger with name */}
            {services.map((service, i) => (
              <TabsTrigger className="items-center flex gap-2" key={i} value={service.id}>
                {service.name}
                <XCircle className="w-4 h-4" onClick={() => removeService(service.name)} />
              </TabsTrigger>
            ))}
          </TabsList>
          <Button onClick={addService} variant={"default"} className="ml-3 bg-green-400">
            <PlusCircle className="w-4 h-4" />
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
                <div className="flex  items-center gap-4 mb-2 justify-between">
                  <Label>Volumes</Label>
                  <Button onClick={() => addVolumeToService(service.name)} variant={"default"} className="bg-green-400">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {service.volumes.map((volume, i) => (
                    <div key={`volume-${volume.id}-${service.id}`} className="flex gap-2">
                      <Input placeholder="internal" value={volume.internal} onChange={(e) => updateVolumeOfService(e, service.name, i, "internal")} />
                      <Input placeholder="external" value={volume.external} onChange={(e) => updateVolumeOfService(e, service.name, i, "external")} />
                      <Button onClick={() => removeVolumeFromService(service.name, i)} variant={"default"} className="dark:bg-red-400">
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="flex  items-center gap-4 mb-2 justify-between">
                  <Label>Ports</Label>
                  <Button onClick={() => addPortToService(service.name)} variant={"default"} className="bg-green-400">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2 ">
                  {service.ports.map((port, i) => (
                    <div key={`port-${port.id}-${service.id}`} className="flex gap-2">
                      <Input placeholder="internal" value={port.internal} onChange={(e) => updatePortOfService(e, service.name, i, "internal")} />
                      <Input placeholder="external" value={port.external} onChange={(e) => updatePortOfService(e, service.name, i, "external")} />
                      <Button onClick={() => removePortFromService(service.name, i)} variant={"default"} className="dark:bg-red-400">
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="flex  items-center gap-4 mb-2 justify-between">
                  <Label>Environment</Label>
                  <Button onClick={() => addEnvToService(service.name)} variant={"default"} className="bg-green-400">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {service.env.map((env, i) => (
                    <div key={`env-${env.id}-${service.id}`} className="flex gap-2">
                      <Input placeholder="Label" value={env.label} onChange={(e) => updateEnvOfService(e, service.name, i, "label")} />
                      <Input placeholder="Value" value={env.value} onChange={(e) => updateEnvOfService(e, service.name, i, "label")} />
                      <Button onClick={() => removeEnvFromService(service.name, i)} variant={"default"} className="dark:bg-red-400">
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="flex  items-center gap-4 mb-2 justify-between">
                  <Label>Label</Label>
                  <Button onClick={() => addLabelToService(service.name)} variant={"default"} className="bg-green-400">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {service.labels.map((label, i) => (
                    <div key={`label-${label.id}-${service.id}`} className="flex gap-2">
                      <Input placeholder="Label" value={label.label} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                      <Input placeholder="Value" value={label.value} onChange={(e) => updateLabelOfService(e, service.name, i, "label")} />
                      <Button onClick={() => removeLabelFromService(service.name, i)} variant={"default"} className="dark:bg-red-400">
                        <MinusCircle className="w-4 h-4" />
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
